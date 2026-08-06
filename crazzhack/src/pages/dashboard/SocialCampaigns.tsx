import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

export default function SocialCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [form, setForm] = useState({
    client_name: '', platform: 'Instagram', target_account: '', daily_quota: 10,
    start_date: new Date().toISOString().split('T')[0]
  })
  const { user } = useAuth()

  const fetchCampaigns = async () => {
    const { data } = await supabase.from('social_campaigns').select('*')
    if (data) setCampaigns(data)
  }

  useEffect(() => { fetchCampaigns() }, [])

  const createCampaign = async () => {
    if (!form.client_name || !form.target_account) return
    await supabase.from('social_campaigns').insert({ ...form, created_by: user!.id })
    setForm({ ...form, client_name: '', target_account: '' })
    fetchCampaigns()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Social Media Campaigns</h2>
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-white font-semibold mb-4">New Campaign</h3>
        <div className="grid grid-cols-2 gap-4">
          <input className="bg-gray-700 p-2 rounded text-white" placeholder="Client name" value={form.client_name} onChange={e => setForm({...form, client_name: e.target.value})} />
          <select className="bg-gray-700 p-2 rounded text-white" value={form.platform} onChange={e => setForm({...form, platform: e.target.value})}>
            <option>Instagram</option><option>Facebook</option><option>Twitter</option><option>LinkedIn</option><option>TikTok</option>
          </select>
          <input className="bg-gray-700 p-2 rounded text-white" placeholder="Target account" value={form.target_account} onChange={e => setForm({...form, target_account: e.target.value})} />
          <input type="number" className="bg-gray-700 p-2 rounded text-white" placeholder="Daily quota" value={form.daily_quota} onChange={e => setForm({...form, daily_quota: parseInt(e.target.value)})} />
          <input type="date" className="bg-gray-700 p-2 rounded text-white" value={form.start_date} onChange={e => setForm({...form, start_date: e.target.value})} />
        </div>
        <button onClick={createCampaign} className="mt-4 px-4 py-2 bg-green-600 rounded text-white">Create Campaign</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {campaigns.map(camp => (
          <div key={camp.id} className="bg-gray-800 p-4 rounded">
            <h4 className="text-white font-semibold">{camp.client_name}</h4>
            <p className="text-gray-400 text-sm">{camp.platform} · @{camp.target_account}</p>
            <p className="text-gray-300">Daily quota: {camp.daily_quota}</p>
            <p className="text-gray-500 text-xs">Started: {camp.start_date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}