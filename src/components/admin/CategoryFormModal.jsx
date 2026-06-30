import { useState } from 'react'
import Modal from '../ui/Modal'

export default function CategoryFormModal({ category, onSave, onClose }) {
  const [name, setName] = useState(category?.name ?? '')
  const [slug, setSlug] = useState(category?.slug ?? '')
  const [loading, setLoading] = useState(false)

  function handleNameChange(val) {
    setName(val)
    if (!category) setSlug(val.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await onSave({ id: category?.id, name, slug })
    setLoading(false)
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
        <h2 className="font-montserrat font-bold text-headline-md text-primary-container">
          {category ? 'Editar Categoría' : 'Nueva Categoría'}
        </h2>
        <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-[2.4rem]">close</span>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-[#1a1a1a]">
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-on-surface-variant">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={e => handleNameChange(e.target.value)}
            required
            placeholder="Entrantes"
            className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-on-surface-variant">Slug (identificador único)</label>
          <input
            type="text"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            required
            placeholder="entrantes"
            className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl text-label-md border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors">
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl text-label-md font-semibold bg-primary-container text-on-surface hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? 'Guardando...' : category ? 'Guardar' : 'Crear categoría'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
