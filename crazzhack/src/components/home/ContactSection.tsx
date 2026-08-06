import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Send } from 'lucide-react'

export default function ContactSection() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', description: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [focused, setFocused] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError('')
    const { error } = await supabase.from('inquiries').insert(form)
    if (error) {
      setSubmitError('We could not send your inquiry. Please try again in a moment.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section id="contact" className="py-20 text-center">
        <div className="glass-card p-12 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 flex items-center justify-center mx-auto mb-4">
            <Send className="text-slate-950" />
          </div>
          <h2 className="text-3xl font-bold text-cyan-300">Message Sent!</h2>
          <p className="text-gray-400 mt-4">We'll get back to you within 24 hours.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 bg-[#090a18]">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Get in <span className="accent-text">Touch</span>
        </h2>
        <p className="text-gray-400 text-center mb-12">Tell us about your project. We’re all ears.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {['full_name', 'email', 'phone'].map((field) => (
            <div key={field} className="relative">
              <input
                required={field !== 'phone'}
                type={field === 'email' ? 'email' : 'text'}
                className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white outline-none peer focus:border-cyan-300 transition-colors"
                placeholder=" "
                value={form[field as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                onFocus={() => setFocused(field)}
                onBlur={() => setFocused(null)}
              />
              <label className={`absolute left-0 -top-5 text-sm text-gray-400 transition-all peer-focus:text-cyan-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 ${
                form[field as keyof typeof form] ? 'top-[-1.25rem] text-sm' : ''
              }`}>
                {field === 'full_name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Phone (optional)'}
              </label>
              <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-300 transition-all duration-300 ${focused === field || form[field as keyof typeof form] ? 'w-full' : 'w-0'}`} />
            </div>
          ))}

          <div className="relative">
            <textarea
              required
              rows={4}
              className="w-full bg-transparent border-b-2 border-white/20 py-3 text-white outline-none peer focus:border-cyan-300 transition-colors resize-none"
              placeholder=" "
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              onFocus={() => setFocused('description')}
              onBlur={() => setFocused(null)}
            />
            <label className={`absolute left-0 -top-5 text-sm text-gray-400 transition-all peer-focus:text-cyan-300 ${
              form.description ? 'top-[-1.25rem] text-sm' : ''
            }`}>
              Project Description
            </label>
          </div>

          <button type="submit" className="neon-btn w-full text-lg flex items-center justify-center gap-2">
            Send Inquiry <Send size={18} />
          </button>
          {submitError && <p role="alert" className="text-sm text-rose-300 text-center">{submitError}</p>}
        </form>
      </div>
    </section>
  )
}
