import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 150, label: 'Projects Delivered', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
  { value: 12, label: 'Years Experience', suffix: '+' },
  { value: 3, label: 'Global Offices', suffix: '' },
]

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0
        const step = (timestamp: number) => {
          if (!start) start = timestamp
          const progress = Math.min((timestamp - start) / duration, 1)
          setCount(Math.floor(progress * end))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        observer.disconnect()
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return { count, ref }
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-[#070812]">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {stats.map((stat) => {
          const { count, ref } = useCountUp(stat.value)
          return (
            <div key={stat.label} ref={ref} className="text-center glass-card p-6">
              <p className="text-4xl font-bold text-cyan-300 mb-1">
                {count}{stat.suffix}
              </p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
