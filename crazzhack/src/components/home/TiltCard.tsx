import { useRef, useState, ReactNode } from 'react'

interface Props { children: ReactNode }

export default function TiltCard({ children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({})

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    const rotateX = (y - 0.5) * 15
    const rotateY = (x - 0.5) * -15
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.1s ease',
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0)',
      transition: 'transform 0.5s ease',
    })
  }

  return (
    <div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="rounded-2xl"
    >
      {children}
    </div>
  )
}