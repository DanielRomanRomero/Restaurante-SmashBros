const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DAYS_ES = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

export default function ReservationSidebar({ guests, date, timeSlot, onConfirm, confirming, error, step, onNextStep }) {
  const dateObj = date ? new Date(date + 'T12:00:00') : null
  const formattedDate = dateObj
    ? `${DAYS_ES[dateObj.getDay()]}, ${dateObj.getDate()} ${MONTHS_ES[dateObj.getMonth()]} ${dateObj.getFullYear()}`
    : null

  const isReady = guests && date && timeSlot

  return (
    <aside className="bg-surface-container rounded-xl p-6 sticky top-24">
      <h3 className="font-montserrat font-bold text-headline-md text-on-surface border-b border-outline-variant/30 pb-4 mb-6">
        Tu Reserva
      </h3>
      <div className="flex flex-col gap-5">
        <SummaryItem icon="group" label="Comensales" value={guests ? `${guests} persona${guests > 1 ? 's' : ''}` : '—'} />
        <SummaryItem icon="calendar_month" label="Fecha" value={formattedDate ?? '—'} />
        <SummaryItem icon="schedule" label="Hora" value={timeSlot ?? '—'} />
      </div>
      {isReady && (
        <div className="mt-6 bg-surface/50 p-4 rounded-xl border border-outline-variant/20 text-label-md text-on-surface-variant">
          <span className="material-symbols-outlined text-[1.6rem] text-secondary-container mr-1 align-middle">info</span>
          Puedes cancelar tu reserva con 2 horas de antelación.
        </div>
      )}
      {error && (
        <div className="mt-4 flex items-center gap-2 text-error bg-error/10 border border-error/30 rounded-xl px-4 py-3">
          <span className="material-symbols-outlined text-[1.8rem]">error</span>
          <p className="text-label-md">{error}</p>
        </div>
      )}
      {step === 3 ? (
        <button
          onClick={onConfirm}
          disabled={!isReady || confirming}
          className="mt-6 w-full bg-primary-container text-on-surface font-montserrat font-bold text-label-md py-4 rounded-xl transition-all hover:shadow-glow-active disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {confirming ? 'Confirmando...' : 'Confirmar Reserva'}
        </button>
      ) : (
        <button
          onClick={onNextStep}
          disabled={!isReady}
          className="mt-6 w-full bg-primary-container text-on-surface font-montserrat font-bold text-label-md py-4 rounded-xl transition-all hover:shadow-glow-active disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Siguiente
          <span className="material-symbols-outlined text-[1.8rem]">arrow_forward</span>
        </button>
      )}
    </aside>
  )
}

function SummaryItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-[1.8rem] text-primary-container">{icon}</span>
      </div>
      <div>
        <p className="text-label-md text-on-surface-variant uppercase tracking-wider">{label}</p>
        <p className="font-montserrat font-bold text-headline-md text-on-surface">{value}</p>
      </div>
    </div>
  )
}
