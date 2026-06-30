import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20 py-12 mt-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-montserrat font-bold text-[2rem] text-on-surface">
              <span className="material-symbols-outlined filled text-primary-container text-[2.8rem]">local_fire_department</span>
              Smash <span className="text-primary-container ml-1">Bros</span>
            </Link>
            <p className="text-label-md text-on-surface-variant mt-2">Urban Luxury Street Food</p>
          </div>
          <nav className="flex gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-label-md text-secondary-container uppercase tracking-wider">Navegar</span>
              {[
                { to: '/', label: 'Inicio' },
                { to: '/menu', label: 'Menú' },
                { to: '/reservar', label: 'Reservar' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="text-body-md text-on-surface-variant hover:text-primary-container transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <div className="border-t border-outline-variant/20 mt-8 pt-8">
          <p className="text-label-md text-secondary-container/70 text-center">
            © {new Date().getFullYear()} Smash Bros Burger — Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
