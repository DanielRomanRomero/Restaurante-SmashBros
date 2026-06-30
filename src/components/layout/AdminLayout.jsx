import { Outlet } from 'react-router-dom'
import AdminSidebar from '../admin/AdminSidebar'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />
      <main className="flex-1 md:ml-64 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
