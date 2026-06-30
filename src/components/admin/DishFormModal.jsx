import { useState } from 'react'
import Modal from '../ui/Modal'

const ALERGENOS = [
  'Gluten', 'Lácteos', 'Huevos', 'Pescado', 'Mariscos',
  'Frutos secos', 'Soja', 'Apio', 'Mostaza', 'Sésamo',
  'Sulfitos', 'Altramuces', 'Moluscos',
]

export default function DishFormModal({ dish, categories, onSave, onClose }) {
  const [name, setName] = useState(dish?.name ?? '')
  const [categoryId, setCategoryId] = useState(dish?.category_id ?? categories[0]?.id ?? '')
  const [price, setPrice] = useState(dish?.price ?? '')
  const [description, setDescription] = useState(dish?.description ?? '')
  const [imageUrl, setImageUrl] = useState(dish?.image_url ?? '')
  const [badge, setBadge] = useState(dish?.badge ?? '')
  const [isAvailable, setIsAvailable] = useState(dish?.is_available ?? true)
  const [alergenos, setAlergenos] = useState(dish?.alergenos ?? [])
  const [loading, setLoading] = useState(false)

  function toggleAlergeno(alergeno) {
    setAlergenos(prev =>
      prev.includes(alergeno)
        ? prev.filter(a => a !== alergeno)
        : [...prev, alergeno]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await onSave({
      id: dish?.id,
      name,
      category_id: categoryId,
      price: Number(price),
      description,
      image_url: imageUrl || null,
      badge: badge || null,
      is_available: isAvailable,
      alergenos: alergenos.length > 0 ? alergenos : null,
    })
    setLoading(false)
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
        <h2 className="font-montserrat font-bold text-headline-md text-primary-container">
          {dish ? 'Editar Plato' : 'Nuevo Plato'}
        </h2>
        <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-[2.4rem]">close</span>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-[#1a1a1a]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-label-md text-on-surface-variant">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Nombre del plato"
              className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-md text-on-surface-variant">Precio (€)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
              placeholder="12.90"
              className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-on-surface-variant">Categoría</label>
          <select
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            required
            className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
          >
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-on-surface-variant">Descripción</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            placeholder="Descripción del plato..."
            className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none resize-none"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-label-md text-on-surface-variant">URL Imagen</label>
            <input
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label-md text-on-surface-variant">Badge</label>
            <input
              type="text"
              value={badge}
              onChange={e => setBadge(e.target.value)}
              placeholder="Best Seller, Nuevo, Picante..."
              className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
            />
          </div>
        </div>
        {imageUrl && (
          <div className="flex gap-4 items-start">
            <span className="text-label-md text-on-surface-variant mt-1">Vista previa:</span>
            <img src={imageUrl} alt="preview" className="w-24 h-24 object-cover rounded-lg border border-outline-variant/30" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-label-md text-on-surface-variant">Alérgenos</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALERGENOS.map(alergeno => (
              <label key={alergeno} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={alergenos.includes(alergeno)}
                  onChange={() => toggleAlergeno(alergeno)}
                  className="w-4 h-4 accent-primary-container shrink-0"
                />
                <span className="text-body-md text-on-surface">{alergeno}</span>
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={e => setIsAvailable(e.target.checked)}
            className="w-5 h-5 accent-primary-container"
          />
          <span className="text-body-md text-on-surface">Disponible en carta</span>
        </label>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-label-md border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-label-md font-semibold bg-primary-container text-on-surface hover:opacity-90 transition-opacity disabled:opacity-60 hover:shadow-glow-active"
          >
            {loading ? 'Guardando...' : dish ? 'Guardar cambios' : 'Crear plato'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
