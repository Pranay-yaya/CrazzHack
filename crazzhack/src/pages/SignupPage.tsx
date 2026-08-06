import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useNavigate, Link } from 'react-router-dom'
import { UserPlus, ArrowLeft, Smartphone } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signup = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (!error) navigate('/dashboard')
    else alert(error.message)
  }

  return (
    <div className="auth-shell min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="auth-orb auth-orb--one" />
      <div className="auth-orb auth-orb--two" />
      {/* Back button – top left corner */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-slate-400 hover:text-cyan-200 transition group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to site</span>
      </Link>

      <form onSubmit={signup} className="auth-card relative z-10 p-8 w-96 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create <span className="accent-text">Account</span></h2>
          <p className="text-slate-400 mt-2">Join the team</p>
        </div>
        <div>
          <input
            type="email"
            required
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            required
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="theme-button w-full flex items-center justify-center gap-2">
          Sign Up <UserPlus size={18} />
        </button>
        <Link to="/verify-phone" className="flex items-center justify-center gap-2 text-sm text-cyan-300 hover:text-cyan-100 transition">
          <Smartphone size={16} /> Sign up with a phone code
        </Link>
        <p className="text-center text-slate-400 text-sm">
          Already have an account? <Link to="/login" className="text-cyan-300 hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  )
}
