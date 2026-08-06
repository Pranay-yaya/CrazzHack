import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { LayoutDashboard, Inbox, Briefcase, CheckSquare, MessageSquare, FileText, Share2, LogOut } from 'lucide-react'

const adminLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/inquiries', label: 'Inquiries', icon: Inbox },
  { to: '/dashboard/projects', label: 'Projects', icon: Briefcase },
  { to: '/dashboard/tasks', label: 'Tasks', icon: CheckSquare },
  { to: '/dashboard/chat-inbox', label: 'Chat Inbox', icon: MessageSquare },
  { to: '/dashboard/invoices', label: 'Invoices', icon: FileText },
  { to: '/dashboard/social-campaigns', label: 'Social', icon: Share2 },
]

const teamLinks = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/tasks', label: 'My Tasks', icon: CheckSquare },
  { to: '/dashboard/chat-inbox', label: 'Chat Inbox', icon: MessageSquare },
]

export default function Sidebar() {
  const location = useLocation()
  const { signOut, role } = useAuth()
  const links = role === 'admin' ? adminLinks : teamLinks

  return (
    <aside className="w-64 bg-[#0a0b1b]/80 backdrop-blur-lg border-r border-violet-200/10 p-4 flex flex-col h-screen">
      {/* Clickable logo – goes to public home */}
      <Link to="/" className="text-2xl font-bold text-cyan-300 font-['Space_Grotesk'] mb-8 hover:opacity-80 transition">
        Crazz<span className="text-white">Hack</span>
        <span className="text-xs text-gray-400 ml-2">({role})</span>
      </Link>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.to
          const Icon = link.icon
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-300/10 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.25)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          )
        })}
      </nav>
      <button
        onClick={signOut}
        className="mt-4 flex items-center gap-2 px-4 py-2 w-full text-red-400 hover:bg-red-500/10 rounded-lg transition"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </aside>
  )
}
