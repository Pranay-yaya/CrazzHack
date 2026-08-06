import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#090a18]/70 backdrop-blur-xl border-b border-violet-200/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-cyan-300 font-['Space_Grotesk']">
          Crazz<span className="text-white">Hack</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {['Services','About','Process','Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="relative text-gray-300 hover:text-white transition group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-300 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <Link to="/login" className="neon-btn text-sm py-2 px-4">Team Login</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="text-white" /> : <Menu className="text-white" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#090a18]/95 backdrop-blur-lg px-6 pb-6 space-y-4">
          {['Services','About','Process','Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-300 hover:text-white">{item}</a>
          ))}
          <Link to="/login" className="neon-btn block text-center">Team Login</Link>
        </div>
      )}
    </nav>
  )
}
