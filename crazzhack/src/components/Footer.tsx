import { Github, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#060711] border-t border-violet-200/10 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <Link to="/" className="text-2xl font-bold text-cyan-300 font-['Space_Grotesk']">
            Crazz<span className="text-white">Hack</span>
          </Link>
          <p className="text-gray-500 text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-cyan-300 transition"><Github size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-cyan-300 transition"><Linkedin size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-cyan-300 transition"><Twitter size={20} /></a>
        </div>
      </div>
    </footer>
  )
}
