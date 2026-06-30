import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import HomePage from './pages/public/HomePage'
import MenuPage from './pages/public/MenuPage'
import ReservationPage from './pages/public/ReservationPage'
import ContactPage from './pages/public/ContactPage'
import AuthPage from './pages/auth/AuthPage'
import AdminReservationsPage from './pages/admin/AdminReservationsPage'
import AdminMenuPage from './pages/admin/AdminMenuPage'
import AdminLayout from './components/layout/AdminLayout'
import NotFoundPage from './pages/errors/NotFoundPage'
import UnauthorizedPage from './pages/errors/UnauthorizedPage'
import LoadingSpinner from './components/ui/LoadingSpinner'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/acceso" replace />
  return children
}

function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/acceso" replace />
  if (!isAdmin) return <Navigate to="/no-autorizado" replace />
  return children
}

function GuestRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/reservar" element={
            <ProtectedRoute><ReservationPage /></ProtectedRoute>
          } />
          <Route path="/acceso" element={
            <GuestRoute><AuthPage /></GuestRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute><AdminLayout /></AdminRoute>
          }>
            <Route index element={<Navigate to="/admin/reservas" replace />} />
            <Route path="reservas" element={<AdminReservationsPage />} />
            <Route path="menu" element={<AdminMenuPage />} />
          </Route>
          <Route path="/no-autorizado" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
