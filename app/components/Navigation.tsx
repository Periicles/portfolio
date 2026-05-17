'use client'

import { useState, useEffect, useRef } from 'react'
import ThemeToggle from './ThemeToggle'

const navItems = [
    { href: '#about', label: 'À propos' },
    { href: '#experience', label: 'Expérience' },
    { href: '#projects', label: 'Projets' },
    { href: '#contact', label: 'Contact' }
]

export default function Navigation() {
    const [activeSection, setActiveSection] = useState('')
    const activeSectionRef = useRef('')
    const visibilityMapRef = useRef<Record<string, number>>({})
    const navListRef = useRef<HTMLUListElement | null>(null)
    const itemRefs = useRef<Array<HTMLLIElement | null>>([])
    const [indicatorOffset, setIndicatorOffset] = useState(0)
    const [indicatorHeight, setIndicatorHeight] = useState(0)

    useEffect(() => {
        const sectionElements = navItems
            .map((item) => document.getElementById(item.href.slice(1)))
            .filter((element): element is HTMLElement => Boolean(element))

        if (sectionElements.length === 0) {
            return
        }

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                visibilityMapRef.current[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0
            }

            let nextSection = ''
            let maxRatio = 0

            for (const element of sectionElements) {
                const ratio = visibilityMapRef.current[element.id] ?? 0
                if (ratio > maxRatio) {
                    maxRatio = ratio
                    nextSection = element.id
                }
            }

            if (nextSection && nextSection !== activeSectionRef.current) {
                setActiveSection(nextSection)
            }
        }, {
            root: null,
            rootMargin: '-35% 0px -35% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1],
        })

        sectionElements.forEach((element) => observer.observe(element))

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        activeSectionRef.current = activeSection
    }, [activeSection])

    useEffect(() => {
        const index = navItems.findIndex((item) => item.href.slice(1) === activeSection)
        const activeItem = itemRefs.current[index]
        if (activeItem) {
            setIndicatorOffset(activeItem.offsetTop)
            setIndicatorHeight(activeItem.offsetHeight)
        }
    }, [activeSection])

    return (
        <nav className="sticky top-0 md:fixed left-0 md:top-0 h-auto md:h-screen w-full md:w-64 p-4 md:p-8 flex flex-col md:justify-between bg-white dark:bg-slate-900 border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700 z-50">
            <div className="flex flex-col gap-6 md:gap-0">
                <div className="flex items-center justify-between md:block">
                    <div className="mb-0 md:mb-16">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-slate-100 mb-1 md:mb-2">Paul Ragueneau</h1>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-slate-400 font-mono">Développeur Web Fullstack</p>
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <a
                            href="https://github.com/Periicles"
                            className="text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400 transition-colors"
                            aria-label="GitHub"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/paul-ragueneau/"
                            className="text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
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
                    <ul ref={navListRef} className="flex gap-4 overflow-x-auto md:overflow-visible md:block md:space-y-4 md:pl-3">
                    {navItems.map((item) => (
                        <li
                            key={item.href}
                            ref={(element) => {
                                itemRefs.current[navItems.indexOf(item)] = element
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
                                <span className="font-mono text-teal-500 dark:text-teal-400">0{navItems.indexOf(item) + 1}.</span> {item.label}
                            </a>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>

            <div className="hidden md:block space-y-4">
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/Periicles"
                        className="text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400 transition-colors"
                        aria-label="GitHub"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/paul-ragueneau/"
                        className="text-gray-400 dark:text-slate-600 hover:text-gray-600 dark:hover:text-slate-400 transition-colors"
                        aria-label="LinkedIn"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                    </a>
                </div>

                <ThemeToggle />

                <p className="text-xs text-gray-500 dark:text-slate-500 font-mono">© 2026 Paul Ragueneau</p>
            </div>
        </nav>
    )
}
