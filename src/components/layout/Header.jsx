import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Header() {
  const { user, profile, isAdmin, signOut } = useAuth()
  console.log('Header:', { user: user?.email, profile, isAdmin })
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/menu', label: 'Menú' },
    { to: '/reservar', label: 'Reservar' },
    { to: '/contacto', label: 'Contacto' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
      <div className="max-w-[1200px] mx-auto px-4 md:px-16 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-on-surface font-montserrat font-bold text-[2rem]">
          <span className="material-symbols-outlined filled text-primary-container text-[2.8rem]">local_fire_department</span>
          <span>Smash <span className="text-primary-container">Bros</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-inter text-label-md transition-colors ${isActive
                  ? 'text-primary-container border-b-2 border-primary-container pb-0.5'
                  : 'text-on-surface-variant hover:text-on-surface'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin/reservas"
                  className="flex items-center gap-1.5 text-label-md text-secondary-container border border-secondary-container rounded-xl px-4 py-2 hover:bg-secondary-container/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-[1.8rem]">dashboard</span>
                  Panel Admin
                </Link>
              )}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-label-md text-on-surface-variant">
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-surface font-bold text-[1.4rem]">
                    {(profile?.full_name || user?.user_metadata?.full_name || user?.email || '?')[0].toUpperCase()}
                  </div>
                  <span>{profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-label-md text-on-surface-variant hover:text-error transition-colors"
                >
                  <span className="material-symbols-outlined text-[1.8rem]">logout</span>
                  Salir
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/acceso"
              className="bg-primary-container text-on-surface font-label-md font-semibold px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform"
            >
              Entrar
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-on-surface"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          <span className="material-symbols-outlined text-[2.8rem]">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-container border-t border-outline-variant/30 px-4 py-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `text-body-md font-inter py-2 ${isActive ? 'text-primary-container' : 'text-on-surface-variant'}`
              }
            >
              {label}
            </NavLink>
          ))}
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin/reservas"
                  onClick={() => setMobileOpen(false)}
                  className="text-body-md text-secondary-container"
                >
                  Panel Admin
                </Link>
              )}
              <span className="text-body-md text-on-surface-variant">{profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0]}</span>
              <button onClick={handleSignOut} className="text-left text-body-md text-error">
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/acceso"
              onClick={() => setMobileOpen(false)}
              className="text-body-md text-primary-container"
            >
              Entrar
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
