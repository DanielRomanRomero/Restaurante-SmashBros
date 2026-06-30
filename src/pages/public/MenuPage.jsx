import { useState } from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import MenuSection from '../../components/menu/MenuSection'
import CategoryChip from '../../components/ui/CategoryChip'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import { useMenuCategories } from '../../hooks/useMenuCategories'
import { useMenuItems } from '../../hooks/useMenuItems'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(null)
  const { categories } = useMenuCategories()
  const { items, loading } = useMenuItems()

  const filteredItems = activeCategory
    ? items.filter(item => item.category_id === activeCategory)
    : items

  const groupedItems = categories.reduce((acc, cat) => {
    acc[cat.id] = { name: cat.name, items: filteredItems.filter(i => i.category_id === cat.id) }
    return acc
  }, {})

  if (loading) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {/* Header section */}
      <section className="bg-surface-container-lowest py-16 text-center">
        <p className="text-label-md text-secondary-container uppercase tracking-widest mb-2">Lo mejor de la ciudad</p>
        <h1 className="font-montserrat font-black text-headline-lg text-on-surface uppercase">El Menú</h1>
        <p className="text-body-lg text-on-surface-variant mt-3 max-w-lg mx-auto">
          Cada plato, una experiencia. Elaborado con ingredientes frescos y mucha pasión.
        </p>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-16 py-12">
        {/* Category filters */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 mb-12">
          <CategoryChip
            label="Todos"
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map(cat => (
            <CategoryChip
              key={cat.id}
              label={cat.name}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>

        {/* Menu sections */}
        {activeCategory
          ? <MenuSection
              category={categories.find(c => c.id === activeCategory)?.name ?? ''}
              items={filteredItems}
            />
          : Object.values(groupedItems).map(({ name, items }) => (
              <MenuSection key={name} category={name} items={items} />
            ))
        }

        {filteredItems.length === 0 && (
          <p className="text-center text-body-lg text-on-surface-variant py-24">
            No hay platos disponibles en esta categoría.
          </p>
        )}
      </div>

      <Footer />
    </div>
  )
}
