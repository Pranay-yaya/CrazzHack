import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([])

  useEffect(() => {
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }).then(({ data }) => setInquiries(data || []))
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('inquiries').update({ status }).eq('id', id)
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Inquiries</h2>
      <div className="glass-card overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-white/10">
              <th className="p-4">Name</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Description</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inq) => (
              <tr key={inq.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-4 font-medium">{inq.full_name}</td>
                <td className="p-4 text-gray-400">{inq.email}<br/>{inq.phone}</td>
                <td className="p-4 text-gray-400 max-w-xs truncate">{inq.description}</td>
                <td className="p-4">
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm text-white"
                  >
                    {['New Lead','Contacted','In Negotiation','Project Active','Closed'].map(s => (
                      <option key={s} className="bg-black">{s}</option>
                    ))}
                  </select>
                </td>
                <td className="p-4 text-gray-400">{new Date(inq.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}