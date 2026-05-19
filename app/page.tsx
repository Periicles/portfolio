import Navigation from '@/components/Navigation'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      <Navigation />
      <main className="flex-1 md:ml-64">
        <div className="max-w-4xl mx-auto px-6 md:px-8 pb-24 md:pb-32">
          <About />
          <Experience />
          <Projects />
          <Contact />
          <div aria-hidden className="h-24" />
        </div>
      </main>
    </div>
  )
}
