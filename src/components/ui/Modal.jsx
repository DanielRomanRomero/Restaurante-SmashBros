import { useEffect } from 'react'

export default function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl bg-surface-container rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
