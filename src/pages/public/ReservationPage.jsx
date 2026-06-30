import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import ReservationStepper from '../../components/reservation/ReservationStepper'
import ReservationSidebar from '../../components/reservation/ReservationSidebar'
import ReservationCard from '../../components/reservation/ReservationCard'
import Toast from '../../components/ui/Toast'
import { useAuth } from '../../context/AuthContext'
import { useReservations } from '../../hooks/useReservations'
import { supabase } from '../../lib/supabaseClient'

const LUNCH_SLOTS = ['13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
const DINNER_SLOTS = ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30']
const ALL_SLOTS = [...LUNCH_SLOTS, ...DINNER_SLOTS]

const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const WEEKDAYS_ES = ['Lu','Ma','Mi','Ju','Vi','Sá','Do']

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  let startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const days = []
  for (let i = 0; i < startOffset; i++) days.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(d)
  return days
}

export default function ReservationPage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const { reservations, cancelReservation, refetch } = useReservations()

  const [step, setStep] = useState(1)
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [calYear, setCalYear] = useState(new Date().getFullYear())
  const [calMonth, setCalMonth] = useState(new Date().getMonth())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [takenSlots, setTakenSlots] = useState([])
  const [confirming, setConfirming] = useState(false)
  const [sidebarError, setSidebarError] = useState('')
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (!selectedDate) return
    supabase
      .from('reservations')
      .select('time_slot')
      .eq('date', selectedDate)
      .neq('status', 'cancelada')
      .then(({ data }) => setTakenSlots(data?.map(r => r.time_slot.substring(0, 5)) ?? []))
  }, [selectedDate])

  useEffect(() => {
    if (step === 3 && !name && profile?.full_name) {
      setName(profile.full_name)
    }
  }, [step])

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const calDays = buildCalendar(calYear, calMonth)

  function toDateString(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }

  async function handleConfirm() {
    const trimmedName = name.trim()
    if (!selectedDate || !selectedSlot || !guests || !phone || !trimmedName) {
      setSidebarError('Completa todos los campos requeridos.')
      return
    }
    setSidebarError('')

    if (takenSlots.includes(selectedSlot)) {
      setSidebarError('Esa franja ya no está disponible. Elige otra hora.')
      return
    }

    setConfirming(true)

    if (trimmedName !== (profile?.full_name?.trim() || '')) {
      await supabase.from('profiles').update({ full_name: trimmedName }).eq('id', user.id)
    }

    const { error } = await supabase.from('reservations').insert({
      user_id: user.id,
      name: trimmedName,
      date: selectedDate,
      time_slot: selectedSlot + ':00',
      guests,
      phone,
      notes: notes || null,
      status: 'confirmada',
    })

    if (error) {
      if (error.code === '23505') {
        setSidebarError('Esa franja ya no está disponible. Elige otra hora.')
      } else {
        setSidebarError('Error al confirmar la reserva. Inténtalo de nuevo.')
      }
    } else {
      setToast({ message: '¡Reserva confirmada! Te esperamos.', type: 'success' })
      refetch()
      setStep(1)
      setSelectedDate(null)
      setSelectedSlot(null)
      setGuests(2)
      setName('')
      setPhone('')
      setNotes('')
    }
    setConfirming(false)
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Hero */}
      <section className="bg-surface-container-lowest py-16 text-center">
        <p className="text-label-md text-secondary-container uppercase tracking-widest mb-2">Reserva tu experiencia</p>
        <h1 className="font-montserrat font-black text-headline-lg text-on-surface">
          Asegura tu <span className="text-primary-container">Spot</span>
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-3 max-w-lg mx-auto">
          Elige fecha, hora y número de comensales. En pocos pasos tendrás tu mesa lista.
        </p>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 md:px-16 py-12">
        {/* Mis Reservas — PRIMERO */}
        <div className="mb-16">
          <h2 className="font-montserrat font-bold text-headline-md text-on-surface mb-2">Mis Reservas</h2>
          <div className="w-16 h-0.5 bg-primary-container rounded-full mb-6" />
          {reservations.length === 0 ? (
            <p className="text-body-md text-on-surface-variant">No tienes reservas todavía.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {reservations.map(r => (
                <ReservationCard key={r.id} reservation={r} onCancel={cancelReservation} />
              ))}
            </div>
          )}
        </div>

        {/* Nueva Reserva */}
        <div className="mb-16">
          <h2 className="font-montserrat font-bold text-headline-md text-on-surface mb-6">
            {reservations.length > 0 ? 'Nueva Reserva' : 'Hacer una Reserva'}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main wizard */}
            <div className="lg:col-span-8">
              <ReservationStepper currentStep={step} />

              {/* Step 1: Date & Guests */}
              {step === 1 && (
                <div className="space-y-8">
                  {/* Guests */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-primary-container text-[2.4rem]">group</span>
                      <h2 className="font-montserrat font-bold text-headline-md text-on-surface">¿Cuántos son?</h2>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <button
                          key={n}
                          onClick={() => setGuests(n)}
                          className={`w-14 h-14 rounded-xl text-headline-md font-montserrat font-bold transition-all ${
                            guests === n
                              ? 'bg-primary-container text-on-surface shadow-glow-active'
                              : 'bg-surface border border-outline-variant/50 text-on-surface hover:border-primary-container'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Calendar */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-primary-container text-[2.4rem]">calendar_month</span>
                      <h2 className="font-montserrat font-bold text-headline-md text-on-surface">Elige una fecha</h2>
                    </div>
                    <div className="bg-surface rounded-xl border border-outline-variant/30 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
                          <span className="material-symbols-outlined text-[2rem]">chevron_left</span>
                        </button>
                        <span className="font-montserrat font-bold text-headline-md text-on-surface">
                          {MONTHS_ES[calMonth]} {calYear}
                        </span>
                        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
                          <span className="material-symbols-outlined text-[2rem]">chevron_right</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-7 mb-2">
                        {WEEKDAYS_ES.map(d => (
                          <div key={d} className="text-center text-label-md text-on-surface-variant py-1">{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {calDays.map((day, i) => {
                          if (!day) return <div key={`empty-${i}`} />
                          const dateStr = toDateString(calYear, calMonth, day)
                          const dayDate = new Date(calYear, calMonth, day)
                          const isPast = dayDate < today
                          const isSelected = dateStr === selectedDate
                          return (
                            <button
                              key={day}
                              disabled={isPast}
                              onClick={() => setSelectedDate(dateStr)}
                              className={`relative h-10 rounded-lg text-body-md transition-all ${
                                isPast
                                  ? 'opacity-30 cursor-not-allowed text-on-surface-variant'
                                  : isSelected
                                    ? 'bg-primary-container text-on-surface font-bold shadow-glow-active'
                                    : 'hover:bg-surface-variant text-on-surface'
                              }`}
                            >
                              {day}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl border border-primary-container text-primary-container text-label-md hover:bg-primary-container/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Siguiente
                    <span className="material-symbols-outlined text-[1.8rem]">arrow_forward</span>
                  </button>
                </div>
              )}

              {/* Step 2: Time Slot */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="material-symbols-outlined text-primary-container text-[2.4rem]">schedule</span>
                      <h2 className="font-montserrat font-bold text-headline-md text-on-surface">Elige tu horario</h2>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-label-md text-secondary-container uppercase tracking-widest mb-3">Comida</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {LUNCH_SLOTS.map(slot => {
                          const taken = takenSlots.includes(slot)
                          return (
                            <button
                              key={slot}
                              disabled={taken}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-3 rounded-xl text-label-md font-semibold transition-all ${
                                taken
                                  ? 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed line-through'
                                  : selectedSlot === slot
                                    ? 'bg-primary-container text-on-surface shadow-glow-active'
                                    : 'border border-outline-variant/50 text-on-surface hover:border-primary-container'
                              }`}
                            >
                              {slot}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-label-md text-secondary-container uppercase tracking-widest mb-3">Cena</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {DINNER_SLOTS.map(slot => {
                          const taken = takenSlots.includes(slot)
                          return (
                            <button
                              key={slot}
                              disabled={taken}
                              onClick={() => setSelectedSlot(slot)}
                              className={`py-3 rounded-xl text-label-md font-semibold transition-all ${
                                taken
                                  ? 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed line-through'
                                  : selectedSlot === slot
                                    ? 'bg-primary-container text-on-surface shadow-glow-active'
                                    : 'border border-outline-variant/50 text-on-surface hover:border-primary-container'
                              }`}
                            >
                              {slot}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant text-on-surface-variant text-label-md hover:bg-surface-variant transition-colors"
                    >
                      <span className="material-symbols-outlined text-[1.8rem]">arrow_back</span>
                      Atrás
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact & Notes */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-label-md text-on-surface-variant block mb-2">Nombre *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Tu nombre completo"
                      required
                      className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-label-md text-on-surface-variant block mb-2">Teléfono *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="ej: 666 123 456"
                      required
                      className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md text-on-surface focus:border-primary-container focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-label-md text-on-surface-variant block mb-2">Notas (opcional)</label>
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Alergias, preferencias de mesa, etc."
                      rows={3}
                      className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-body-md text-on-surface focus:border-primary-container focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant text-on-surface-variant text-label-md hover:bg-surface-variant transition-colors"
                    >
                      <span className="material-symbols-outlined text-[1.8rem]">arrow_back</span>
                      Atrás
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <ReservationSidebar
                guests={guests}
                date={selectedDate}
                timeSlot={selectedSlot}
                onConfirm={handleConfirm}
                confirming={confirming}
                error={sidebarError}
                step={step}
                onNextStep={() => step < 3 ? setStep(step + 1) : null}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
