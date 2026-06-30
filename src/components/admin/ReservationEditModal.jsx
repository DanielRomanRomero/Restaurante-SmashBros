import { useState } from 'react'
import Modal from '../ui/Modal'

const TIME_SLOTS = ['13:00','13:30','14:00','14:30','15:00','15:30','20:00','20:30','21:00','21:30','22:00','22:30']

export default function ReservationEditModal({ reservation, onSave, onClose }) {
  const [date, setDate] = useState(reservation.date)
  const [timeSlot, setTimeSlot] = useState(reservation.time_slot?.substring(0, 5))
  const [guests, setGuests] = useState(reservation.guests)
  const [status, setStatus] = useState(reservation.status)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await onSave(reservation.id, { date, time_slot: timeSlot + ':00', guests: Number(guests), status })
    setLoading(false)
    onClose()
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
        <h2 className="font-montserrat font-bold text-headline-md text-primary-container">Editar Reserva</h2>
        <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-[2.4rem]">close</span>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-[#1a1a1a]">
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-on-surface-variant">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-on-surface-variant">Horario</label>
          <select
            value={timeSlot}
            onChange={e => setTimeSlot(e.target.value)}
            className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
          >
            {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-on-surface-variant">Comensales</label>
          <input
            type="number"
            min="1"
            max="20"
            value={guests}
            onChange={e => setGuests(e.target.value)}
            required
            className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-label-md text-on-surface-variant">Estado</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="bg-surface border border-outline-variant/50 rounded-lg px-3 py-2.5 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
          >
            <option value="confirmada">Confirmada</option>
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
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
            {loading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
