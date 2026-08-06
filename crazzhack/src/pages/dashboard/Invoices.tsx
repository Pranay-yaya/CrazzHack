import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

export default function Invoices() {
  const [invoices, setInvoices] = useState<any[]>([])
  const [form, setForm] = useState({ client_name: '', amount: '', notes: '', inquiry_id: '', project_id: '' })
  const { user } = useAuth()

  const fetchInvoices = async () => {
    const { data } = await supabase.from('invoices').select('*').order('created_at', { ascending: false })
    if (data) setInvoices(data)
  }

  useEffect(() => { fetchInvoices() }, [])

  const createInvoice = async () => {
    if (!form.client_name || !form.amount) return
    await supabase.from('invoices').insert({
      client_name: form.client_name,
      amount: parseFloat(form.amount),
      notes: form.notes,
      inquiry_id: form.inquiry_id || null,
      project_id: form.project_id || null,
      created_by: user!.id,
    })
    setForm({ client_name: '', amount: '', notes: '', inquiry_id: '', project_id: '' })
    fetchInvoices()
  }

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('invoices').update({ status }).eq('id', id)
    fetchInvoices()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Invoices</h2>
      <div className="bg-gray-800 p-4 rounded-lg mb-8">
        <h3 className="text-white font-semibold mb-4">New Invoice Note</h3>
        <div className="grid grid-cols-2 gap-4">
          <input className="bg-gray-700 p-2 rounded text-white" placeholder="Client name" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} />
          <input type="number" className="bg-gray-700 p-2 rounded text-white" placeholder="Amount" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
        </div>
        <textarea className="bg-gray-700 p-2 rounded text-white w-full mt-2" placeholder="Notes" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
        <button onClick={createInvoice} className="mt-2 px-4 py-2 bg-green-600 rounded text-white">Save Invoice Note</button>
      </div>
      <div className="space-y-2">
        {invoices.map(inv => (
          <div key={inv.id} className="flex justify-between items-center bg-gray-800 p-4 rounded">
            <div>
              <p className="text-white font-medium">{inv.client_name}</p>
              <p className="text-gray-400 text-sm">${inv.amount} · {inv.notes}</p>
            </div>
            <select value={inv.status} onChange={e => updateStatus(inv.id, e.target.value)} className="bg-gray-700 text-white rounded px-2 py-1">
              <option>Pending</option>
              <option>Paid</option>
              <option>Overdue</option>
              <option>Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}