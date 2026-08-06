import { useEffect, useRef, useState } from 'react'

const steps = [
  { title: 'Discover', desc: 'We dive into your vision and requirements.' },
  { title: 'Design', desc: 'Crafting the perfect architecture and UI.' },
  { title: 'Develop', desc: 'Agile development with weekly demos.' },
  { title: 'Deliver', desc: 'Rigorous testing and seamless launch.' },
]

export default function ProcessSection() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let removeScrollListener: (() => void) | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const handleScroll = () => {
              const scrollY = window.scrollY
              const sectionTop = sectionRef.current!.offsetTop
              const sectionHeight = sectionRef.current!.offsetHeight
              const progress = Math.max(0, Math.min((scrollY - sectionTop + 200) / (sectionHeight - 400), 1))
              setActive(Math.min(steps.length - 1, Math.floor(progress * steps.length)))
            }
            window.addEventListener('scroll', handleScroll)
            handleScroll()
            removeScrollListener = () => window.removeEventListener('scroll', handleScroll)
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      observer.disconnect()
      removeScrollListener?.()
    }
  }, [])

  return (
    <section id="process" className="py-20 bg-[#070812]">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our <span className="accent-text">Process</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
          A battle‑tested workflow refined over hundreds of projects.
        </p>

        <div ref={sectionRef} className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-white/10 -translate-x-1/2 rounded" />
          <div
            className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-violet-400 via-cyan-300 to-rose-300 -translate-x-1/2 rounded transition-all duration-500"
            style={{ height: `${(active / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, i) => (
            <div
              key={step.title}
              className={`relative flex items-center mb-16 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className="w-1/2 p-6">
                <div className={`glass-card p-6 transition-all duration-500 ${i <= active ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-10'}`}>
                  <span className="text-sm text-cyan-300">Step {i + 1}</span>
                  <h3 className="text-xl font-semibold mt-2">{step.title}</h3>
                  <p className="text-gray-400 mt-2">{step.desc}</p>
                </div>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 bg-[#070812]"
                style={{ borderColor: i <= active ? '#67e8f9' : '#334155' }}>
                <div className={`w-3 h-3 rounded-full transition-all ${i <= active ? 'bg-cyan-300 shadow-[0_0_12px_#67e8f9]' : 'bg-gray-600'}`} />
              </div>
              <div className="w-1/2" /> {/* empty half for layout */}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
