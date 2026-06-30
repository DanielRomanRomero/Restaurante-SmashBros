import { useState } from 'react'
import StatusBadge from '../ui/StatusBadge'
import ConfirmDialog from '../ui/ConfirmDialog'

const MONTHS_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']

export default function ReservationCard({ reservation, onCancel }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const dateObj = new Date(reservation.date + 'T12:00:00')
  const formattedDate = `${dateObj.getDate()} ${MONTHS_ES[dateObj.getMonth()]} ${dateObj.getFullYear()}`

  return (
    <>
      <div className="bg-surface-container-high rounded-xl p-5 flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div className="flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[2.4rem] text-primary-container">calendar_month</span>
          </div>
          <div>
            <p className="font-montserrat font-bold text-headline-md text-on-surface">{formattedDate}</p>
            <p className="text-body-md text-on-surface-variant">
              {reservation.time_slot?.substring(0, 5)} · {reservation.guests} persona{reservation.guests > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={reservation.status} />
          {reservation.status !== 'cancelada' && reservation.status !== 'completada' && (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-label-md text-error hover:text-on-error-container transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
      {showConfirm && (
        <ConfirmDialog
          message="¿Seguro que quieres cancelar esta reserva?"
          confirmLabel="Sí, cancelar"
          danger
          onConfirm={() => { onCancel(reservation.id); setShowConfirm(false) }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}
