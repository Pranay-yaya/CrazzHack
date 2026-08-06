import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Briefcase } from 'lucide-react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  useEffect(() => {
    supabase.from('projects').select('*').then(({ data }) => setProjects(data || []))
  }, [])

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="gradient-border p-6">
            <div className="flex items-start gap-3">
              <Briefcase className="text-[#00ff88] mt-1" />
              <div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-gray-400 text-sm mt-2">{p.description}</p>
                <span className={`inline-block mt-3 px-3 py-1 text-xs rounded-full bg-[#00ff88]/20 text-[#00ff88]`}>
                  {p.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}