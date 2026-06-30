const statusConfig = {
  confirmada: {
    label: 'Confirmada',
    classes: 'bg-secondary-container/20 text-secondary-container border border-secondary-container/30',
  },
  pendiente: {
    label: 'Pendiente',
    classes: 'bg-primary-container/20 text-primary-container border border-primary-container/30',
  },
  cancelada: {
    label: 'Cancelada',
    classes: 'bg-error/10 text-error border border-error/30',
  },
  completada: {
    label: 'Completada',
    classes: 'bg-outline-variant/20 text-on-surface-variant border border-outline-variant/40',
  },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status] ?? statusConfig.pendiente
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-label-md ${config.classes}`}>
      {config.label}
    </span>
  )
}
