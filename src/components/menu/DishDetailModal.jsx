import { useEffect } from 'react'

const ALERGENO_ICONO = {
  'Gluten':        { emoji: '🌾', label: 'Gluten (cereales)' },
  'Lácteos':       { emoji: '🥛', label: 'Lácteos' },
  'Huevos':        { emoji: '🥚', label: 'Huevos' },
  'Pescado':       { emoji: '🐟', label: 'Pescado' },
  'Mariscos':      { emoji: '🦐', label: 'Mariscos (crustáceos)' },
  'Frutos secos':  { emoji: '🥜', label: 'Frutos secos' },
  'Soja':          { emoji: '🫘', label: 'Soja' },
  'Apio':          { emoji: '🥬', label: 'Apio' },
  'Mostaza':       { emoji: '🌿', label: 'Mostaza' },
  'Sésamo':        { emoji: '🌰', label: 'Sésamo' },
  'Sulfitos':      { emoji: '🍷', label: 'Sulfitos / Dióxido de azufre' },
  'Altramuces':    { emoji: '🌻', label: 'Altramuces' },
  'Moluscos':      { emoji: '🦑', label: 'Moluscos' },
}

export default function DishDetailModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <article className="relative w-full max-w-lg bg-surface-container rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 z-10 bg-surface-container-high text-on-surface-variant rounded-full p-1 hover:text-on-surface hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[2.4rem]">close</span>
        </button>

        <div className="relative h-72 shrink-0 overflow-hidden bg-surface-container-lowest">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-[8rem] text-outline-variant">lunch_dining</span>
            </div>
          )}
          {item.badge && (
            <span className="absolute top-4 left-4 bg-primary-container text-on-surface text-label-md px-3 py-1 rounded-full">
              {item.badge}
            </span>
          )}
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="flex justify-between items-start gap-4 mb-4">
            <h2 className="font-montserrat font-black text-headline-md text-on-surface leading-tight">
              {item.name}
            </h2>
            <span className="font-montserrat font-bold text-price-display text-secondary-container whitespace-nowrap shrink-0">
              {Number(item.price).toFixed(2)}€
            </span>
          </div>

          {item.description ? (
            <p className="text-body-lg text-on-surface-variant leading-relaxed">
              {item.description}
            </p>
          ) : (
            <p className="text-body-lg text-outline-variant italic">Sin descripción disponible.</p>
          )}

          <div className="mt-6 pt-5 border-t border-outline-variant/30">
            <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-3">Alérgenos</p>
            {item.alergenos && item.alergenos.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {item.alergenos.map(alergeno => {
                  const info = ALERGENO_ICONO[alergeno]
                  return (
                    <li
                      key={alergeno}
                      title={info?.label ?? alergeno}
                      className="flex items-center gap-1.5 bg-primary-container/20 border border-primary-container/40 text-on-surface text-label-md px-3 py-1.5 rounded-full"
                    >
                      <span className="text-[1.6rem] leading-none" aria-hidden="true">{info?.emoji ?? '⚠️'}</span>
                      <span>{alergeno}</span>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="text-body-md text-outline-variant italic">Sin alérgenos declarados.</p>
            )}
          </div>
        </div>

        <div className="px-8 pb-8 shrink-0">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 border border-outline-variant text-on-surface-variant text-label-md font-semibold py-3 rounded-xl hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[1.8rem]">arrow_back</span>
            Volver al menú
          </button>
        </div>

      </article>
    </div>
  )
}
