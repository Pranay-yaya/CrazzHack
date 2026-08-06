import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { UploadCloud } from 'lucide-react'

interface Props {
  taskId?: string
  socialTaskId?: string
  onUploadComplete?: () => void
}

export default function ProofOfWorkUpload({ taskId, socialTaskId, onUploadComplete }: Props) {
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0]
    if (!file) return
    const entityId = taskId || socialTaskId
    if (!entityId) return

    setUploading(true)
    const fileName = `${Date.now()}_${file.name}`
    const filePath = `${entityId}/${fileName}`

    const { error } = await supabase.storage.from('proof-of-work').upload(filePath, file, { upsert: false })
    if (error) { alert('Upload failed: ' + error.message); setUploading(false); return }

    const record: any = {
      uploaded_by: (await supabase.auth.getUser()).data.user?.id,
      file_name: file.name,
      storage_path: filePath,
    }
    if (taskId) record.task_id = taskId
    if (socialTaskId) record.social_task_id = socialTaskId
    await supabase.from('proof_of_work').insert(record)

    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
    onUploadComplete?.()
  }

  return (
    <div className="flex items-center gap-3 mt-3">
      <input type="file" ref={fileRef} accept="image/*,.pdf,.doc,.docx" className="text-sm text-gray-300 file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:bg-[#00ff88]/10 file:text-[#00ff88] hover:file:bg-[#00ff88]/20" />
      <button onClick={handleUpload} disabled={uploading} className="flex items-center gap-2 px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88] rounded-lg text-[#00ff88] hover:bg-[#00ff88]/20 transition disabled:opacity-50">
        <UploadCloud size={16} />
        {uploading ? 'Uploading...' : 'Upload Proof'}
      </button>
    </div>
  )
}