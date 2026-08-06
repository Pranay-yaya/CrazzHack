import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Sidebar from '@/components/dashboard/Sidebar'
import { useAuth } from '@/context/AuthContext'

const adminOnlyPaths = [
  '/dashboard/inquiries',
  '/dashboard/projects',
  '/dashboard/invoices',
  '/dashboard/social-campaigns',
]

export default function DashboardLayout() {
  const { user, loading, role } = useAuth()
  const location = useLocation()

  if (loading) return <div className="flex items-center justify-center h-screen"><div className="text-white">Loading...</div></div>
  if (!user) return <Navigate to="/login" replace />

  // If a team member tries to access an admin-only page, redirect to dashboard
  if (role === 'team' && adminOnlyPaths.includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex h-screen bg-[#070812] text-white">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </div>
    </div>
  )
}
