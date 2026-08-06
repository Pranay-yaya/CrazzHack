import { ShieldCheck, Users, Target } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-[#090a18]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          About <span className="accent-text">CrazzHack</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Founded by Pranay Kumar, we merge full‑stack development, AI/ML expertise, and cybersecurity discipline to deliver unbreakable digital solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: 'Security First', desc: 'Every line of code is written with a hacker’s mindset to protect your data.' },
            { icon: Users, title: 'Client Obsessed', desc: 'We treat your problems as our own. 24/7 support, lightning‑fast responses.' },
            { icon: Target, title: 'Results Driven', desc: 'No fluff. Only measurable outcomes that move your business forward.' },
          ].map((item) => (
            <div key={item.title} className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-500">
              <item.icon className="w-10 h-10 text-cyan-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Founder highlight – updated bio */}
        <div className="mt-16 flex flex-col md:flex-row items-center gap-8 glass-card p-8 rounded-2xl">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-400 via-cyan-300 to-rose-300 flex items-center justify-center text-4xl font-bold text-slate-950">
            PK
          </div>
          <div>
            <h3 className="text-2xl font-bold">Pranay Kumar</h3>
            <p className="text-gray-400 mt-2">Founder & Lead Architect</p>
            <p className="text-gray-300 mt-4 max-w-xl">
              With over a decade of experience as a <strong>Full Stack Developer</strong> and AI/ML engineer, Pranay has built scalable web applications, intelligent machine learning systems, and robust cybersecurity solutions for Fortune 500 companies and startups alike. He personally oversees every CrazzHack project, ensuring top‑tier quality from frontend to backend.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
