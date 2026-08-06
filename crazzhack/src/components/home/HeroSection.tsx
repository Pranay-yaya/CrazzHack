import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animationId: number
    let particles: {x:number, y:number, vx:number, vy:number, size:number, color:string}[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const colors = ['#a78bfa', '#67e8f9', '#fda4af']
    for (let i=0; i<80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        color: colors[i % colors.length]
      })
    }

    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      particles.forEach(p => {
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2)
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      })
      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#090a18]">
      <div className="absolute -top-40 -left-36 w-[34rem] h-[34rem] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-16rem] right-[-10rem] w-[38rem] h-[38rem] rounded-full bg-cyan-500/15 blur-[130px]" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-45" />
      <div className="relative z-10 text-center px-4">
        {/* Main heading: short and bold */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="text-white">We </span>
          <span className="accent-text glow-text">Hack</span>
          <span className="text-white"> the Problem</span>
        </h1>

        {/* Slogan as a sub‑headline */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 font-light">
          Wherever there’s a digital problem, CrazzHack has their digital solution.
        </p>

        <a href="#contact" className="neon-btn text-lg">Start a Project</a>
      </div>
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#070812] to-transparent" />
    </section>
  )
}
