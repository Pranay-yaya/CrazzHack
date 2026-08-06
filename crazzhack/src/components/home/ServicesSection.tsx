import { Code2, Brain, Share2, Shield, Cloud, Palette } from 'lucide-react'
import TiltCard from './TiltCard'  // we'll create this component

const services = [
  { icon: Code2, title: 'Custom Software', desc: 'Tailor‑made solutions for your business challenges.' },
  { icon: Brain, title: 'AI / Machine Learning', desc: 'Intelligent models to automate and optimize.' },
  { icon: Share2, title: 'Social Media Mgmt', desc: 'Full‑scale campaigns and community engagement.' },
  { icon: Shield, title: 'Cybersecurity', desc: 'Protect your digital assets with expert audits.' },
  { icon: Cloud, title: 'Cloud Solutions', desc: 'Scalable, secure cloud infrastructure.' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Stunning interfaces that convert visitors.' },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[#070812]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Our <span className="accent-text">Services</span></h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          We offer a full spectrum of digital services to take your business to the next level.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc) => (
            <TiltCard key={svc.title}>
              <div className="gradient-border p-6 h-full flex flex-col items-center text-center">
                <svc.icon className="w-10 h-10 text-cyan-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{svc.title}</h3>
                <p className="text-gray-400">{svc.desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
