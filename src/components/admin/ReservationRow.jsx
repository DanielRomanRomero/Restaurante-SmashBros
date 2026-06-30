import { useState } from 'react'
import StatusBadge from '../ui/StatusBadge'
import ConfirmDialog from '../ui/ConfirmDialog'

export default function ReservationRow({ reservation, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <tr className="border-b border-outline-variant/10 hover:bg-surface-container/30 transition-colors">
        <td className="px-4 py-4 text-body-md text-on-surface">
          {reservation.name || 'Sin nombre'}
        </td>
        <td className="px-4 py-4 text-body-md text-on-surface-variant">{reservation.date}</td>
        <td className="px-4 py-4 text-body-md text-on-surface-variant">
          {reservation.time_slot?.substring(0, 5)}
        </td>
        <td className="px-4 py-4 text-body-md text-on-surface-variant">{reservation.guests}</td>
        <td className="px-4 py-4">
          <StatusBadge status={reservation.status} />
        </td>
        <td className="px-4 py-4">
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(reservation)}
              className="text-secondary-container hover:opacity-70 transition-opacity"
              title="Editar"
            >
              <span className="material-symbols-outlined text-[2rem]">edit</span>
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              className="text-error hover:opacity-70 transition-opacity"
              title="Eliminar"
            >
              <span className="material-symbols-outlined text-[2rem]">delete</span>
            </button>
          </div>
        </td>
      </tr>
      {showConfirm && (
        <ConfirmDialog
          message={`¿Eliminar la reserva de ${reservation.name || 'este cliente'} el ${reservation.date}?`}
          confirmLabel="Eliminar"
          danger
          onConfirm={() => { onDelete(reservation.id); setShowConfirm(false) }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}
