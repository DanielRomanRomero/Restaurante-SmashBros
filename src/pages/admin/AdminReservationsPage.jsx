import { useState, useMemo } from 'react'
import ReservationRow from '../../components/admin/ReservationRow'
import ReservationEditModal from '../../components/admin/ReservationEditModal'
import Toast from '../../components/ui/Toast'
import { useAllReservations } from '../../hooks/useReservations'

export default function AdminReservationsPage() {
  const { reservations, loading, updateReservation, deleteReservation } = useAllReservations()
  const [editingReservation, setEditingReservation] = useState(null)
  const [search, setSearch] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [toast, setToast] = useState(null)

  const today = new Date().toISOString().split('T')[0]

  const filtered = useMemo(() => {
    return reservations.filter(r => {
      const nameMatch = !search || (r.name ?? '').toLowerCase().includes(search.toLowerCase())
      const dateMatch = !filterDate || r.date === filterDate
      const statusMatch = !filterStatus || r.status === filterStatus
      return nameMatch && dateMatch && statusMatch
    })
  }, [reservations, search, filterDate, filterStatus])

  const todayReservations = reservations.filter(r => r.date === today)
  const pendingCount = reservations.filter(r => r.status === 'confirmada' || r.status === 'pendiente').filter(r => r.date >= today).length
  const cancelledCount = reservations.filter(r => r.status === 'cancelada').length

  async function handleSave(id, updates) {
    const { error } = await updateReservation(id, updates)
    if (error) setToast({ message: 'Error al actualizar la reserva', type: 'error' })
    else setToast({ message: 'Reserva actualizada correctamente', type: 'success' })
  }

  async function handleDelete(id) {
    const { error } = await deleteReservation(id)
    if (error) setToast({ message: 'Error al eliminar la reserva', type: 'error' })
    else setToast({ message: 'Reserva eliminada', type: 'info' })
  }

  return (
    <div className="p-6 md:p-10 min-h-screen">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {editingReservation && (
        <ReservationEditModal
          reservation={editingReservation}
          onSave={handleSave}
          onClose={() => setEditingReservation(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="font-montserrat font-black text-headline-lg text-on-surface uppercase">Reservas</h1>
          <p className="text-body-md text-on-surface-variant mt-1">Gestiona todas las reservas del restaurante</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Hoy" value={todayReservations.length} icon="today" borderColor="border-secondary-container" />
        <StatCard label="Activas" value={pendingCount} icon="check_circle" borderColor="border-primary-container" />
        <StatCard label="Canceladas" value={cancelledCount} icon="cancel" borderColor="border-outline-variant" />
      </div>

      {/* Filters + Table */}
      <div className="bg-card rounded-xl border border-outline-variant/20 overflow-hidden">
        {/* Filters bar */}
        <div className="flex flex-col lg:flex-row gap-4 p-4 border-b border-outline-variant/20">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-[2rem]">search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nombre..."
              className="w-full bg-surface border-b-2 border-outline-variant/40 focus:border-primary-container pl-10 pr-4 py-2.5 text-body-md text-on-surface outline-none transition-colors"
            />
          </div>
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            className="bg-surface border-b-2 border-outline-variant/40 focus:border-primary-container px-3 py-2.5 text-body-md text-on-surface outline-none transition-colors"
          />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-surface border-b-2 border-outline-variant/40 focus:border-primary-container px-3 py-2.5 text-body-md text-on-surface outline-none transition-colors"
          >
            <option value="">Todos los estados</option>
            <option value="confirmada">Confirmada</option>
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-16 text-center text-on-surface-variant text-body-md">Cargando reservas...</div>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-surface-container/50">
                <tr>
                  {['Cliente', 'Fecha', 'Hora', 'Comensales', 'Estado', 'Acciones'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-label-md text-on-surface-variant uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-on-surface-variant text-body-md">
                      No se encontraron reservas.
                    </td>
                  </tr>
                ) : (
                  filtered.map(r => (
                    <ReservationRow
                      key={r.id}
                      reservation={r}
                      onEdit={setEditingReservation}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-4 flex justify-between items-center border-t border-outline-variant/20">
          <p className="text-label-md text-on-surface-variant">
            {filtered.length} reserva{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, borderColor }) {
  return (
    <div className={`bg-card rounded-xl p-6 border-t-2 ${borderColor}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-label-md text-on-surface-variant uppercase tracking-wider">{label}</span>
        <span className="material-symbols-outlined text-on-surface-variant text-[2.4rem]">{icon}</span>
      </div>
      <p className="font-montserrat font-black text-headline-xl text-on-surface">{value}</p>
    </div>
  )
}
