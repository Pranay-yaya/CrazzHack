import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import ProofOfWorkUpload from '@/components/dashboard/ProofOfWorkUpload'

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])
  useEffect(() => {
    supabase.from('tasks').select('*').then(({ data }) => setTasks(data || []))
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      {tasks.map(task => (
        <div key={task.id} className="bg-gray-800 p-4 rounded mb-2 flex justify-between">
          <div>
            <p className="font-semibold">{task.title}</p>
            <p className="text-sm text-gray-400">{task.description}</p>
            <span className="text-xs bg-yellow-600 px-2 py-1 rounded">{task.status}</span>
          </div>
          <ProofOfWorkUpload taskId={task.id} />
        </div>
      ))}
    </div>
  )
}