import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import ServicesSection from '@/components/home/ServicesSection'
import AboutSection from '@/components/home/AboutSection'
import ProcessSection from '@/components/home/ProcessSection'
import ContactSection from '@/components/home/ContactSection'
import ScrollReveal from '@/components/ScrollReveal'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ScrollReveal><StatsSection /></ScrollReveal>
      <ScrollReveal><ServicesSection /></ScrollReveal>
      <ScrollReveal><AboutSection /></ScrollReveal>
      <ScrollReveal><ProcessSection /></ScrollReveal>
      <ScrollReveal><ContactSection /></ScrollReveal>
    </div>
  )
}
