const STEPS = [
  { label: 'Fecha y comensales', icon: 'calendar_month' },
  { label: 'Horario', icon: 'schedule' },
  { label: 'Confirmación', icon: 'check_circle' },
]

export default function ReservationStepper({ currentStep }) {
  return (
    <div className="relative flex justify-between items-center mb-12">
      <div className="absolute left-0 right-0 top-5 h-0.5 bg-surface-container-highest" />
      {STEPS.map((step, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isDone = stepNum < currentStep
        return (
          <div key={step.label} className="relative flex flex-col items-center gap-2 z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isActive
                ? 'bg-primary-container shadow-glow-active'
                : isDone
                  ? 'bg-primary-container/60'
                  : 'bg-surface-container-highest border border-outline-variant/30'
            }`}>
              <span className={`material-symbols-outlined text-[1.8rem] ${isActive || isDone ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                {isDone ? 'check' : step.icon}
              </span>
            </div>
            <span className={`hidden md:block text-label-md transition-colors ${isActive ? 'text-primary-container' : 'text-on-surface-variant'}`}>
              {step.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
