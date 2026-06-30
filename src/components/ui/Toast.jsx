import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: 'border-secondary-container text-secondary-container bg-secondary-container/10',
    error: 'border-error text-error bg-error/10',
    info: 'border-primary-container text-primary-container bg-primary-container/10',
  }

  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-sm shadow-lg max-w-sm ${colors[type]}`}>
      <span className="material-symbols-outlined text-[2rem]">
        {type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
      </span>
      <p className="text-body-md font-inter">{message}</p>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">
        <span className="material-symbols-outlined text-[1.8rem]">close</span>
      </button>
    </div>
  )
}
