import { useState, useMemo } from 'react'
import DishCard from '../../components/admin/DishCard'
import DishFormModal from '../../components/admin/DishFormModal'
import CategoryFormModal from '../../components/admin/CategoryFormModal'
import ConfirmDialog from '../../components/ui/ConfirmDialog'
import CategoryChip from '../../components/ui/CategoryChip'
import Toast from '../../components/ui/Toast'
import { useMenuCategories } from '../../hooks/useMenuCategories'
import { useAllMenuItems } from '../../hooks/useMenuItems'
import { supabase } from '../../lib/supabaseClient'

export default function AdminMenuPage() {
  const { categories, refetch: refetchCats } = useMenuCategories()
  const { items, refetch: refetchItems } = useAllMenuItems()

  const [filterCategory, setFilterCategory] = useState(null)
  const [search, setSearch] = useState('')
  const [dishModal, setDishModal] = useState(null) // null | 'new' | item
  const [catModal, setCatModal] = useState(null)   // null | 'new' | category
  const [deletingCat, setDeletingCat] = useState(null)
  const [toast, setToast] = useState(null)

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const categoryMatch = !filterCategory || item.category_id === filterCategory
      const searchMatch = !search || item.name.toLowerCase().includes(search.toLowerCase())
      return categoryMatch && searchMatch
    })
  }, [items, filterCategory, search])

  const groupedItems = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat.id] = { ...cat, items: filteredItems.filter(i => i.category_id === cat.id) }
      return acc
    }, {})
  }, [categories, filteredItems])

  async function saveDish(data) {
    let error
    if (data.id) {
      const { id, ...updates } = data
      ;({ error } = await supabase.from('menu_items').update(updates).eq('id', id))
    } else {
      ;({ error } = await supabase.from('menu_items').insert(data))
    }
    if (error) setToast({ message: 'Error al guardar el plato', type: 'error' })
    else { setToast({ message: 'Plato guardado correctamente', type: 'success' }); refetchItems() }
  }

  async function deleteDish(id) {
    const { error } = await supabase.from('menu_items').delete().eq('id', id)
    if (error) setToast({ message: 'Error al eliminar el plato', type: 'error' })
    else { setToast({ message: 'Plato eliminado', type: 'info' }); refetchItems() }
  }

  async function saveCategory(data) {
    let error
    if (data.id) {
      const { id, ...updates } = data
      ;({ error } = await supabase.from('menu_categories').update(updates).eq('id', id))
    } else {
      ;({ error } = await supabase.from('menu_categories').insert(data))
    }
    if (error) setToast({ message: 'Error al guardar la categoría', type: 'error' })
    else { setToast({ message: 'Categoría guardada', type: 'success' }); refetchCats() }
  }

  async function deleteCategory(id) {
    const { error } = await supabase.from('menu_categories').delete().eq('id', id)
    if (error) setToast({ message: 'No se puede eliminar: tiene platos asignados', type: 'error' })
    else { setToast({ message: 'Categoría eliminada', type: 'info' }); refetchCats() }
    setDeletingCat(null)
  }

  return (
    <div className="p-6 md:p-10 min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {dishModal !== null && (
        <DishFormModal
          dish={dishModal === 'new' ? null : dishModal}
          categories={categories}
          onSave={saveDish}
          onClose={() => setDishModal(null)}
        />
      )}
      {catModal !== null && (
        <CategoryFormModal
          category={catModal === 'new' ? null : catModal}
          onSave={saveCategory}
          onClose={() => setCatModal(null)}
        />
      )}
      {deletingCat && (
        <ConfirmDialog
          message={`¿Eliminar la categoría "${deletingCat.name}"? Solo es posible si no tiene platos asignados.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={() => deleteCategory(deletingCat.id)}
          onCancel={() => setDeletingCat(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="font-montserrat font-black text-headline-lg text-on-surface uppercase">Gestor de Menú</h1>
          <p className="text-body-md text-on-surface-variant mt-1">Gestiona las categorías y platos de tu carta</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setCatModal('new')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-label-md border border-secondary-container text-secondary-container hover:bg-secondary-container/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[1.8rem]">add</span>
            Nueva Categoría
          </button>
          <button
            onClick={() => setDishModal('new')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-label-md bg-primary-container text-on-surface font-semibold hover:shadow-glow-active transition-all"
          >
            <span className="material-symbols-outlined text-[1.8rem]">add</span>
            Nuevo Plato
          </button>
        </div>
      </div>

      {/* Categories section */}
      <div className="bg-surface-container rounded-xl p-5 mb-8 border border-outline-variant/20">
        <h2 className="font-montserrat font-bold text-headline-md text-on-surface mb-4">Categorías</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <div key={cat.id} className="flex items-center gap-2 bg-surface rounded-xl px-4 py-2 border border-outline-variant/30">
              <span className="text-body-md text-on-surface">{cat.name}</span>
              <button onClick={() => setCatModal(cat)} className="text-on-surface-variant hover:text-secondary-container transition-colors">
                <span className="material-symbols-outlined text-[1.6rem]">edit</span>
              </button>
              <button onClick={() => setDeletingCat(cat)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined text-[1.6rem]">delete</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-surface-container rounded-xl p-4 mb-8 border border-outline-variant/20 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[2rem]">search</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar plato..."
            className="w-full bg-surface border border-outline-variant/30 rounded-xl pl-10 pr-4 py-2.5 text-body-md text-on-surface focus:ring-2 focus:ring-primary-container/50 outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <CategoryChip label="Todos" active={!filterCategory} onClick={() => setFilterCategory(null)} />
          {categories.map(cat => (
            <CategoryChip key={cat.id} label={cat.name} active={filterCategory === cat.id} onClick={() => setFilterCategory(cat.id)} />
          ))}
        </div>
      </div>

      {/* Items by category */}
      {filterCategory
        ? (
          <section>
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-outline-variant/30">
              <h2 className="font-montserrat font-bold text-headline-md text-secondary-container">
                {categories.find(c => c.id === filterCategory)?.name}
              </h2>
              <span className="bg-surface-variant text-on-surface-variant text-label-md px-3 py-1 rounded-full">
                {filteredItems.length}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <DishCard key={item.id} item={item} onEdit={i => setDishModal(i)} onDelete={deleteDish} />
              ))}
            </div>
          </section>
        )
        : Object.values(groupedItems).map(({ id, name, items: catItems }) => (
          catItems.length > 0 && (
            <section key={id} className="mb-12">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-outline-variant/30">
                <h2 className="font-montserrat font-bold text-headline-md text-secondary-container">{name}</h2>
                <span className="bg-surface-variant text-on-surface-variant text-label-md px-3 py-1 rounded-full">{catItems.length}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catItems.map(item => (
                  <DishCard key={item.id} item={item} onEdit={i => setDishModal(i)} onDelete={deleteDish} />
                ))}
              </div>
            </section>
          )
        ))
      }

      {filteredItems.length === 0 && (
        <p className="text-center text-body-lg text-on-surface-variant py-24">
          No hay platos. Crea el primero con "Nuevo Plato".
        </p>
      )}
    </div>
  )
}
