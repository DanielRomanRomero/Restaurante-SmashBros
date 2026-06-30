import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-4">
      <span className="material-symbols-outlined text-[10rem] text-primary-container mb-4">search_off</span>
      <h1 className="font-montserrat font-black text-headline-lg text-on-surface mb-2">404 — Página no encontrada</h1>
      <p className="text-body-lg text-on-surface-variant mb-8">Esta página no existe o ha sido movida.</p>
      <Link to="/" className="bg-primary-container text-on-surface font-semibold text-label-md px-8 py-4 rounded-xl hover:-translate-y-0.5 hover:shadow-glow-active transition-all">
        Volver al inicio
      </Link>
    </div>
  )
}
