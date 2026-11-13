// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { site } from '@/content/site'
import { locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import Home from './page'

vi.mock('next/navigation', () => ({
    notFound: () => {
        throw new Error('NEXT_NOT_FOUND')
    },
}))
vi.mock('@/actions/contact', () => ({ sendContactMessage: vi.fn() }))

describe('page d’accueil', () => {
    it.each(locales)('assemble navigation, sections et pied de page (%s)', async (lang) => {
        const t = getDictionary(lang)
        const { container } = render(await Home({ params: Promise.resolve({ lang }) }))

        expect(screen.getByRole('link', { name: t.skipLink }).getAttribute('href')).toBe('#about')
        expect(screen.getByRole('banner')).toBeTruthy()
        expect(screen.getByRole('main').id).toBe('main')
        expect([...container.querySelectorAll('main > section')].map((section) => section.id)).toEqual([
            'about',
            'experience',
            'education',
            'projects',
            'contact',
        ])
        expect(screen.getByRole('contentinfo').textContent).toContain(`© ${new Date().getFullYear()} ${site.name}`)
        expect(container.querySelector('.atmosphere')?.getAttribute('aria-hidden')).toBe('true')
    })

    it('renvoie une 404 pour une langue inconnue', async () => {
        await expect(Home({ params: Promise.resolve({ lang: 'de' }) })).rejects.toThrow('NEXT_NOT_FOUND')
    })
})
