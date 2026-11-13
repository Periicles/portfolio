// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { site } from '@/content/site'
import { locales, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import Navigation from './Navigation'

const active = vi.hoisted(() => ({ section: '' }))
vi.mock('@/hooks/useActiveSection', () => ({ useActiveSection: () => active.section }))

function labels(locale: Locale) {
    const dict = getDictionary(locale)
    return { role: dict.meta.role, nav: dict.nav, theme: dict.theme, language: dict.language, cv: dict.cv }
}

const sectionIds = ['about', 'experience', 'education', 'projects', 'contact'] as const

beforeEach(() => {
    active.section = ''
})

describe.each(locales)('Navigation (%s)', (locale) => {
    const t = labels(locale)

    it('liste toutes les sections, dans la barre large comme dans la barre mobile', () => {
        render(<Navigation t={t} />)

        const navs = screen.getAllByRole('navigation', { name: t.nav.ariaLabel })
        expect(navs).toHaveLength(2)
        for (const nav of navs) {
            const links = within(nav).getAllByRole('link')
            expect(links.map((link) => link.getAttribute('href'))).toEqual(sectionIds.map((id) => `#${id}`))
            expect(links.map((link) => link.textContent)).toEqual(sectionIds.map((id) => t.nav.items[id]))
        }
    })

    it('ne marque aucune section tant que la lecture n’a pas commencé', () => {
        const { container } = render(<Navigation t={t} />)
        expect(container.querySelectorAll('[aria-current]')).toHaveLength(0)
    })

    it('marque la section en cours, et elle seule, dans les deux barres', () => {
        active.section = 'projects'
        const { container } = render(<Navigation t={t} />)

        const current = [...container.querySelectorAll('[aria-current]')]
        expect(current).toHaveLength(2)
        for (const link of current) {
            expect(link.getAttribute('href')).toBe('#projects')
            expect(link.getAttribute('aria-current')).toBe('location')
        }
    })

    it('ramène en haut de page par le logo, dont le nom commence par le texte visible', () => {
        render(<Navigation t={t} />)

        const logo = screen.getByRole('link', { name: new RegExp(`^pr\\.\\s*— ${site.name}, ${t.nav.homeSuffix}$`) })
        expect(logo.getAttribute('href')).toBe('#about')
    })

    it('ouvre les réseaux dans un nouvel onglet, sans exposer la page d’origine', () => {
        render(<Navigation t={t} />)

        for (const [name, href] of [
            ['GitHub', site.socials.github],
            ['LinkedIn', site.socials.linkedin],
        ]) {
            const link = screen.getByRole('link', { name })
            expect(link.getAttribute('href')).toBe(href)
            expect(link.getAttribute('target')).toBe('_blank')
            expect(link.getAttribute('rel')).toBe('noopener noreferrer')
        }
    })

    it('regroupe thème, langue et CV', () => {
        render(<Navigation t={t} />)

        expect(screen.getByRole('button').getAttribute('title')).toBe(t.theme.toggle)
        expect(screen.getByRole('link', { name: new RegExp(t.language.label) }).getAttribute('href')).toBeTruthy()
        expect(screen.getByRole('link', { name: `${t.cv.label} (PDF)` }).getAttribute('href')).toBe(t.cv.href)
    })
})
