import { useState } from 'react'
import ConfirmDialog from '../ui/ConfirmDialog'

export default function DishCard({ item, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <article className="group bg-[#252525] rounded-xl border border-outline-variant/20 overflow-hidden hover:border-outline-variant/40 transition-colors">
        <div className="relative h-48 overflow-hidden">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[5rem] text-outline-variant">lunch_dining</span>
            </div>
          )}
          {item.badge && (
            <span className={`absolute top-4 left-4 text-label-md px-3 py-1 rounded-full ${
              item.badge === 'Picante' || item.badge === 'Hot'
                ? 'bg-error-container text-on-error-container'
                : 'bg-secondary-container text-on-secondary'
            }`}>
              {item.badge}
            </span>
          )}
          {!item.is_available && (
            <div className="absolute inset-0 bg-surface/70 flex items-center justify-center">
              <span className="text-label-md text-on-surface-variant bg-surface px-3 py-1 rounded-full">No disponible</span>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-montserrat font-bold text-headline-md text-on-surface">{item.name}</h3>
            <span className="font-montserrat font-bold text-price-display text-secondary-container whitespace-nowrap">
              {Number(item.price).toFixed(2)}€
            </span>
          </div>
          {item.description && (
            <p className="text-body-md text-on-surface-variant line-clamp-2 mb-4">{item.description}</p>
          )}
          <div className="mt-auto border-t border-outline-variant/20 pt-4 flex gap-4">
            <button
              onClick={() => onEdit(item)}
              className="flex items-center gap-1.5 text-label-md text-on-surface-variant hover:text-secondary-container transition-colors"
            >
              <span className="material-symbols-outlined text-[1.8rem]">edit</span>
              Editar
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex items-center gap-1.5 text-label-md text-on-surface-variant hover:text-error transition-colors ml-auto"
            >
              <span className="material-symbols-outlined text-[1.8rem]">delete</span>
              Eliminar
            </button>
          </div>
        </div>
      </article>
      {showConfirm && (
        <ConfirmDialog
          message={`¿Eliminar "${item.name}"? Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={() => { onDelete(item.id); setShowConfirm(false) }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}
