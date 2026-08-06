import { FormEvent, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LoaderCircle, MessageSquare, ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const normalisePhone = (value: string) => value.replace(/[\s()-]/g, '')
const isE164 = (value: string) => /^\+[1-9]\d{7,14}$/.test(value)

export default function PhoneAuthPage() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const navigate = useNavigate()
  const codeRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!sent) return
    codeRef.current?.focus()
  }, [sent])

  useEffect(() => {
    if (!cooldown) return
    const timer = window.setInterval(() => setCooldown((seconds) => Math.max(0, seconds - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [cooldown])

  const sendCode = async (event?: FormEvent) => {
    event?.preventDefault()
    const formattedPhone = normalisePhone(phone)
    setPhone(formattedPhone)
    setMessage('')

    if (!isE164(formattedPhone)) {
      setMessage('Enter your number with country code, for example +919876543210.')
      return
    }

    setBusy(true)
    const { error } = await supabase.auth.signInWithOtp({ phone: formattedPhone })
    setBusy(false)

    if (error) {
      setMessage(error.message)
      return
    }

    setSent(true)
    setCooldown(45)
    setMessage(`A six-digit code was sent to ${formattedPhone}.`)
  }

  const verifyCode = async (event: FormEvent) => {
    event.preventDefault()
    setMessage('')
    if (!/^\d{6}$/.test(code)) {
      setMessage('Enter the six-digit code from the SMS.')
      return
    }

    setBusy(true)
    const { error } = await supabase.auth.verifyOtp({ phone, token: code, type: 'sms' })
    setBusy(false)

    if (error) {
      setMessage(error.message)
      return
    }

    navigate('/dashboard')
  }

  return (
    <div className="auth-shell min-h-screen flex items-center justify-center px-5 py-16 relative overflow-hidden">
      <div className="auth-orb auth-orb--one" />
      <div className="auth-orb auth-orb--two" />
      <Link to="/" className="absolute top-6 left-6 z-10 flex items-center gap-2 text-slate-400 hover:text-cyan-200 transition group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to site</span>
      </Link>

      <main className="auth-card relative z-10 w-full max-w-md p-7 sm:p-9">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,.28)] mb-6">
          {sent ? <ShieldCheck className="text-slate-950" /> : <MessageSquare className="text-slate-950" />}
        </div>
        <p className="text-xs uppercase tracking-[.22em] text-cyan-300 mb-3">Secure sign in</p>
        <h1 className="text-3xl font-bold text-white">Verify your phone</h1>
        <p className="text-slate-400 mt-3 leading-6">{sent ? 'Enter the one-time code to continue securely.' : 'We’ll send a one-time code instead of asking for a password.'}</p>

        {!sent ? (
          <form onSubmit={sendCode} className="mt-8 space-y-5">
            <div>
              <label htmlFor="phone" className="text-sm text-slate-300">Phone number</label>
              <input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" value={phone} onChange={(event) => setPhone(event.target.value)} className="auth-input mt-2" />
              <p className="mt-2 text-xs text-slate-500">Include your country code. Standard SMS charges may apply.</p>
            </div>
            <button disabled={busy} className="theme-button w-full flex justify-center items-center gap-2">
              {busy && <LoaderCircle className="w-4 h-4 animate-spin" />}
              Send verification code
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="mt-8 space-y-5">
            <div>
              <label htmlFor="otp" className="text-sm text-slate-300">Six-digit verification code</label>
              <input ref={codeRef} id="otp" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="123456" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} className="auth-input mt-2 text-center text-xl tracking-[.45em]" />
            </div>
            <button disabled={busy} className="theme-button w-full flex justify-center items-center gap-2">
              {busy && <LoaderCircle className="w-4 h-4 animate-spin" />}
              Verify and continue
            </button>
            <button type="button" disabled={busy || cooldown > 0} onClick={() => sendCode()} className="w-full text-sm text-cyan-300 hover:text-cyan-100 disabled:text-slate-600 transition">
              {cooldown ? `Resend available in ${cooldown}s` : 'Resend code'}
            </button>
            <button type="button" onClick={() => { setSent(false); setCode(''); setMessage('') }} className="w-full text-sm text-slate-400 hover:text-white transition">Use a different number</button>
          </form>
        )}

        {message && <p role="status" className={`mt-5 text-sm ${message.startsWith('A six') ? 'text-cyan-200' : 'text-rose-300'}`}>{message}</p>}
        <p className="mt-7 text-center text-sm text-slate-400">Prefer email and password? <Link to="/login" className="text-cyan-300 hover:text-cyan-100">Log in</Link></p>
      </main>
    </div>
  )
}
