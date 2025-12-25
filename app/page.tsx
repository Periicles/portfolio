import Navigation from '@/components/Navigation'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">
      <Navigation />
      <main className="flex-1 ml-64">
        <div className="max-w-4xl mx-auto px-8 py-16">
          <About />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </main>
    </div>
  )
}
