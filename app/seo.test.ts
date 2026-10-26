import { describe, it, expect } from 'vitest'
import sitemap from './sitemap'
import robots from './robots'

describe('sitemap', () => {
    const entries = sitemap()

    it('liste une URL absolue par langue, le français à la racine', () => {
        expect(entries.map((e) => e.url)).toEqual([
            'https://www.paulragueneau.com/',
            'https://www.paulragueneau.com/en',
        ])
    })

    it('relie chaque page à toutes ses versions linguistiques (hreflang)', () => {
        for (const entry of entries) {
            expect(entry.alternates?.languages).toEqual({
                fr: 'https://www.paulragueneau.com/',
                en: 'https://www.paulragueneau.com/en',
            })
        }
    })
})

describe('robots', () => {
    const config = robots()

    it('autorise l’exploration de tout le site', () => {
        expect(config.rules).toEqual({ userAgent: '*', allow: '/' })
    })

    it('pointe vers le sitemap du domaine de production', () => {
        expect(config.sitemap).toBe('https://www.paulragueneau.com/sitemap.xml')
        expect(config.host).toBe('https://www.paulragueneau.com')
    })
})
