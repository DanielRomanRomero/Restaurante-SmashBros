import { Link } from 'react-router-dom'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-4">
      <span className="material-symbols-outlined text-[10rem] text-error mb-4">lock</span>
      <h1 className="font-montserrat font-black text-headline-lg text-on-surface mb-2">Acceso no autorizado</h1>
      <p className="text-body-lg text-on-surface-variant mb-8">No tienes permisos para acceder a esta sección.</p>
      <Link to="/" className="bg-primary-container text-on-surface font-semibold text-label-md px-8 py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-glow-active transition-all">
        Volver al inicio
      </Link>
    </div>
  )
}
