'use client'

import { useEffect, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'
import { site } from '@/content/site'
import { useActiveSection } from '@/hooks/useActiveSection'

const navItems = [
    { href: '#about', label: 'À propos' },
    { href: '#experience', label: 'Expérience' },
    { href: '#projects', label: 'Projets' },
    { href: '#contact', label: 'Contact' },
] as const

const sectionIds = navItems.map((item) => item.href.slice(1))

export default function Navigation() {
    const activeSection = useActiveSection(sectionIds)
    const itemRefs = useRef<Array<HTMLLIElement | null>>([])
    const [indicatorOffset, setIndicatorOffset] = useState(0)
    const [indicatorHeight, setIndicatorHeight] = useState(0)

    useEffect(() => {
        const index = navItems.findIndex((item) => item.href.slice(1) === activeSection)
        const activeItem = itemRefs.current[index]
        if (activeItem) {
            setIndicatorOffset(activeItem.offsetTop)
            setIndicatorHeight(activeItem.offsetHeight)
        }
    }, [activeSection])

    return (
        <nav
            aria-label="Navigation principale"
            className="sticky top-0 md:fixed left-0 md:top-0 h-auto md:h-screen w-full md:w-64 p-4 md:p-8 flex flex-col md:justify-between bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700 z-50"
        >
            <div className="flex flex-col gap-6 md:gap-0">
                <div className="flex items-center justify-between md:block">
                    <div className="mb-0 md:mb-16">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1 md:mb-2">Paul Ragueneau</h1>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-mono">Développeur Web Fullstack</p>
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <a
                            href={site.socials.github}
                            className="text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400 transition-colors"
                            aria-label="GitHub"
                        >
                            <GitHubIcon />
                        </a>
                        <a
                            href={site.socials.linkedin}
                            className="text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon />
                        </a>
                        <ThemeToggle />
                    </div>
                </div>

                <div className="relative">
                    <span
                        aria-hidden
                        className="absolute left-0 top-0 w-1 rounded-full bg-teal-500 transition-transform duration-300 ease-out hidden md:block"
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
                                        ? 'text-teal-500 dark:text-teal-400 font-semibold'
                                        : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100'
                                        }`}
                                >
                                    <span className="font-mono text-teal-500 dark:text-teal-400">0{index + 1}.</span> {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="hidden md:block space-y-4">
                <div className="flex space-x-4">
                    <a
                        href={site.socials.github}
                        className="text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400 transition-colors"
                        aria-label="GitHub"
                    >
                        <GitHubIcon />
                    </a>
                    <a
                        href={site.socials.linkedin}
                        className="text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400 transition-colors"
                        aria-label="LinkedIn"
                    >
                        <LinkedInIcon />
                    </a>
                </div>

                <ThemeToggle />

                <p className="text-xs text-gray-500 dark:text-slate-500 font-mono">© 2026 Paul Ragueneau</p>
            </div>
        </nav>
    )
}
