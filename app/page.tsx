import Hero from '@/components/Hero'
import TechnicalExpertise from '@/components/TechnicalExpertise'
import FeaturedProjects from '@/components/FeaturedProjects'
import Capabilities from '@/components/Capabilities'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white overflow-x-hidden">
      <Hero />
      <TechnicalExpertise />
      <FeaturedProjects />
      <Capabilities />
      <CallToAction />
    </main>
  )
}
