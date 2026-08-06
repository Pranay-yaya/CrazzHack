import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Inbox, Briefcase, CheckSquare, DollarSign } from 'lucide-react'

export default function DashboardHome() {
  const [stats, setStats] = useState({ inquiries: 0, projects: 0, tasks: 0, revenue: 0 })
  const [recentInquiries, setRecentInquiries] = useState<any[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      const [{ count: inquiries }, { count: projects }, { count: tasks }, { data: invoices }] = await Promise.all([
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('tasks').select('*', { count: 'exact', head: true }),
        supabase.from('invoices').select('amount'),
      ])
      const totalRevenue = invoices?.reduce((sum, inv) => sum + inv.amount, 0) || 0
      setStats({ inquiries: inquiries || 0, projects: projects || 0, tasks: tasks || 0, revenue: totalRevenue })
    }

    const fetchRecent = async () => {
      const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5)
      setRecentInquiries(data || [])
    }

    fetchStats()
    fetchRecent()
  }, [])

  const statCards = [
    { title: 'Total Inquiries', value: stats.inquiries, icon: Inbox, color: 'text-blue-400' },
    { title: 'Active Projects', value: stats.projects, icon: Briefcase, color: 'text-purple-400' },
    { title: 'Pending Tasks', value: stats.tasks, icon: CheckSquare, color: 'text-yellow-400' },
    { title: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'text-[#00ff88]' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard <span className="text-[#00ff88]">Overview</span></h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.title} className="glass-card p-5 flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">{card.title}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>
          )
        })}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 border-b border-white/10">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3">{inq.full_name}</td>
                  <td className="py-3 text-gray-400">{inq.email}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-[#00ff88]/20 text-[#00ff88]">{inq.status}</span>
                  </td>
                  <td className="py-3 text-gray-400">{new Date(inq.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}