import Modal from './Modal'

export default function ConfirmDialog({ message, onConfirm, onCancel, confirmLabel = 'Confirmar', danger = false }) {
  return (
    <Modal onClose={onCancel}>
      <div className="p-8 flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <span className={`material-symbols-outlined text-[3.2rem] ${danger ? 'text-error' : 'text-primary-container'}`}>
            {danger ? 'warning' : 'help'}
          </span>
          <p className="text-body-lg text-on-surface font-inter">{message}</p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl text-label-md border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-label-md font-semibold transition-colors ${danger
              ? 'bg-error-container text-on-error-container hover:opacity-90'
              : 'bg-primary-container text-on-surface hover:opacity-90'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
