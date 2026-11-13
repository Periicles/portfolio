'use client'

import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import CvDownload from './CvDownload'
import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'
import { site } from '@/content/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import type { Dictionary } from '@/i18n/dictionaries'

const sectionIds = ['about', 'experience', 'education', 'projects', 'contact'] as const

export type NavigationLabels = {
    role: string
    nav: Dictionary['nav']
    theme: Dictionary['theme']
    language: Dictionary['language']
    cv: Dictionary['cv']
}

function NavLinks({
    items,
    activeSection,
    className,
}: {
    items: { href: string; label: string }[]
    activeSection: string
    className: string
}) {
    return (
        <ul className={className}>
            {items.map((item) => {
                const active = activeSection === item.href.slice(1)
                return (
                    <li key={item.href} className="shrink-0">
                        <a
                            href={item.href}
                            aria-current={active ? 'location' : undefined}
                            className={`inline-block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                                active ? 'bg-capsule-bg text-capsule-fg font-semibold' : 'text-muted hover:text-ink'
                            }`}
                        >
                            {item.label}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}

export default function Navigation({ t }: { t: NavigationLabels }) {
    const navItems = sectionIds.map((id) => ({ href: `#${id}`, label: t.nav.items[id] }))
    const activeSection = useActiveSection(sectionIds)

    return (
        <header className="sticky top-0 z-50 border-b border-hairline bg-paper/75 backdrop-blur-md">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-8">
                {/* Le nom accessible commence par le texte visible « pr. » (WCAG 2.5.3) : le complément
                    n'est lu que par les lecteurs d'écran. */}
                <a href="#about" className="flex items-baseline gap-3 text-ink">
                    <span className="font-display text-2xl font-bold leading-none tracking-[-0.06em]">
                        pr<span className="text-accent">.</span>
                    </span>
                    <span className="sr-only">{` — ${site.name}, ${t.nav.homeSuffix}`}</span>
                    <span aria-hidden className="hidden font-mono text-xs text-muted lg:inline">
                        {t.role}
                    </span>
                </a>

                <nav aria-label={t.nav.ariaLabel} className="hidden md:block">
                    <NavLinks
                        items={navItems}
                        activeSection={activeSection}
                        className="flex items-center gap-1 rounded-full border border-hairline bg-surface/60 p-1"
                    />
                </nav>

                <div className="flex items-center gap-2">
                    <a
                        href={site.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-pill hidden sm:inline-flex"
                        aria-label="GitHub"
                    >
                        <GitHubIcon />
                    </a>
                    <a
                        href={site.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-pill hidden sm:inline-flex"
                        aria-label="LinkedIn"
                    >
                        <LinkedInIcon />
                    </a>
                    <ThemeToggle t={t.theme} />
                    <LanguageSwitcher t={t.language} />
                    <CvDownload {...t.cv} />
                </div>
            </div>

            <nav aria-label={t.nav.ariaLabel} className="md:hidden">
                <NavLinks
                    items={navItems}
                    activeSection={activeSection}
                    className="flex gap-1 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                />
            </nav>
        </header>
    )
}
