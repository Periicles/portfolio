'use client'

import { useEffect, useRef, useState } from 'react'
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

export default function Navigation({ year, t }: { year: number; t: NavigationLabels }) {
    const navItems = sectionIds.map((id) => ({ href: `#${id}`, label: t.nav.items[id] }))
    const activeSection = useActiveSection(sectionIds)
    const itemRefs = useRef<Array<HTMLLIElement | null>>([])
    const [indicatorOffset, setIndicatorOffset] = useState(0)
    const [indicatorHeight, setIndicatorHeight] = useState(0)

    useEffect(() => {
        const index = sectionIds.findIndex((id) => id === activeSection)
        const activeItem = itemRefs.current[index]
        if (activeItem) {
            setIndicatorOffset(activeItem.offsetTop)
            setIndicatorHeight(activeItem.offsetHeight)
        }
    }, [activeSection])

    return (
        <nav
            aria-label={t.nav.ariaLabel}
            className="sticky top-0 md:fixed left-0 md:top-0 h-auto md:h-screen w-full md:w-64 p-4 md:p-8 flex flex-col md:justify-between bg-paper border-b md:border-b-0 md:border-r border-hairline z-50"
        >
            <div className="flex flex-col gap-6 md:gap-0">
                <div className="flex items-center justify-between md:block">
                    <div className="mb-0 md:mb-16">
                        {/* Le nom accessible commence par le texte visible « pr. » (WCAG 2.5.3) : le complément
                            n'est lu que par les lecteurs d'écran. */}
                        <a
                            href="#about"
                            className="inline-block text-3xl md:text-4xl font-extrabold tracking-[-0.05em] leading-none text-ink"
                        >
                            pr<span className="text-accent">.</span>
                            <span className="sr-only">{` — ${site.name}, ${t.nav.homeSuffix}`}</span>
                        </a>
                        <h1 className="mt-3 text-base md:text-lg font-bold text-ink">{site.name}</h1>
                        <p className="text-xs md:text-sm text-muted font-mono">{t.role}</p>
                    </div>

                    <div className="flex items-center gap-3 md:hidden">
                        <CvDownload compact {...t.cv} />
                        <a
                            href={site.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-ink transition-colors"
                            aria-label="GitHub"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href={site.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted hover:text-ink transition-colors"
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon />
                        </a>
                        <ThemeToggle t={t.theme} />
                        <LanguageSwitcher t={t.language} />
                    </div>
                </div>

                <div className="relative">
                    <span
                        aria-hidden
                        className="absolute left-0 top-0 w-1 rounded-full bg-accent transition-transform duration-300 ease-out hidden md:block"
                        style={{
                            height: indicatorHeight ? `${indicatorHeight}px` : undefined,
                            transform: `translateY(${indicatorOffset}px)`,
                            opacity: indicatorHeight ? 1 : 0,
                        }}
                    />
                    <ul className="flex gap-4 overflow-x-auto md:overflow-visible md:block md:space-y-4 md:pl-3">
                        {navItems.map((item, index) => (
                            <li
                                key={item.href}
                                ref={(element) => {
                                    itemRefs.current[index] = element
                                }}
                                className="shrink-0"
                            >
                                <a
                                    href={item.href}
                                    className={`block py-1 md:py-2 text-xs md:text-sm transition-colors ${activeSection === item.href.slice(1)
                                        ? 'text-ink font-semibold'
                                        : 'text-muted hover:text-ink'
                                        }`}
                                >
                                    <span className="font-mono text-accent-strong">0{index + 1}.</span> {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="hidden md:block space-y-4">
                <CvDownload {...t.cv} />

                {/* Mêmes cases de 40 px que les boutons thème et langue : les icônes
                    tombent pile au-dessus d'eux. */}
                <div className="flex gap-2">
                    <a
                        href={site.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label="GitHub"
                    >
                        <GitHubIcon />
                    </a>
                    <a
                        href={site.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-lg text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label="LinkedIn"
                    >
                        <LinkedInIcon />
                    </a>
                </div>

                <div className="flex gap-2">
                    <ThemeToggle t={t.theme} />
                    <LanguageSwitcher t={t.language} />
                </div>

                <p className="text-xs text-muted font-mono">© {year} {site.name}</p>
            </div>
        </nav>
    )
}
