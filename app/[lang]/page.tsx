import Navigation from '@/components/Navigation'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import { notFound } from 'next/navigation'
import { site } from '@/content/site'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  // Calculée au rendu serveur (build) : le pied de page suit chaque redéploiement.
  const year = new Date().getFullYear()
  const t = getDictionary(lang)

  return (
    <div className="relative min-h-screen text-ink">
      {/* Pas de fond sur ce conteneur : il masquerait l'atmosphère, posée sous le contenu. */}
      <div aria-hidden className="atmosphere" />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-ink focus:rounded focus:font-semibold focus:shadow-lg"
      >
        {t.skipLink}
      </a>

      <Navigation t={{ role: t.meta.role, nav: t.nav, theme: t.theme, language: t.language, cv: t.cv }} />

      <main id="main" className="mx-auto max-w-5xl px-4 pt-10 pb-16 md:px-8 md:pt-20 md:pb-24">
        <About locale={lang} />
        <Experience locale={lang} />
        <Education locale={lang} />
        <Projects locale={lang} />
        <Contact locale={lang} />
      </main>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-8 md:px-8">
          <span aria-hidden className="font-display text-2xl font-bold tracking-[-0.06em]">
            pr<span className="text-accent">.</span>
          </span>
          <p className="font-mono text-xs text-muted">© {year} {site.name}</p>
        </div>
      </footer>
    </div>
  )
}
