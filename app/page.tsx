import Navigation from '@/components/Navigation'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  // Calculée au rendu serveur (build) : le pied de page suit chaque redéploiement.
  const year = new Date().getFullYear()

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-paper text-ink">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-ink focus:rounded focus:font-semibold focus:shadow-lg"
      >
        Aller au contenu principal
      </a>
      <Navigation year={year} />
      <main id="main" className="flex-1 md:ml-64">
        <div className="max-w-4xl mx-auto px-6 md:px-8 pt-12 md:pt-16 pb-24 md:pb-32">
          <About />
          <Experience />
          <Education />
          <Projects />
          <Contact />
          <div aria-hidden className="h-24" />
        </div>
      </main>
    </div>
  )
}
