import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { to: '/admin/reservas', label: 'Reservas', icon: 'calendar_month' },
  { to: '/admin/menu', label: 'Gestión Menú', icon: 'restaurant_menu' },
]

export default function AdminSidebar() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface-container fixed top-0 left-0 h-full z-40 border-r border-outline-variant/20">
      <div className="p-6 border-b border-outline-variant/20">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined filled text-primary-container text-[2.8rem]">local_fire_department</span>
          <span className="font-montserrat font-bold text-headline-md text-secondary-container uppercase tracking-wider">Admin</span>
        </NavLink>
      </div>
      <nav className="flex-1 py-6 px-3 flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-label-md transition-all ${
                isActive
                  ? 'bg-primary-container text-on-surface font-bold'
                  : 'text-on-surface-variant hover:bg-surface-variant'
              }`
            }
          >
            <span className="material-symbols-outlined text-[2rem]">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-outline-variant/20 flex flex-col gap-2">
        <NavLink
          to="/"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[2rem]">arrow_back</span>
          Volver al inicio
        </NavLink>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-label-md text-on-surface-variant hover:text-error transition-colors"
        >
          <span className="material-symbols-outlined text-[2rem]">logout</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
