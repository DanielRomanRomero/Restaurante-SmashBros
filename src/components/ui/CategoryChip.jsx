export default function CategoryChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap px-5 py-2.5 rounded-full text-label-md transition-all ${
        active
          ? 'bg-secondary-container text-on-secondary font-semibold'
          : 'border border-outline-variant text-on-surface-variant hover:border-primary-container hover:text-on-surface'
      }`}
    >
      {label}
    </button>
  )
}
