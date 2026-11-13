import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { getDictionary } from '@/i18n/dictionaries'
import { neonPowerOffScript } from '@/lib/neon-ignition'
import RootLayout, { generateMetadata, generateStaticParams, viewport } from './layout'

vi.mock('next/font/google', () => {
    const font = (name: string) => () => ({ variable: `font-${name}`, className: name })
    return { Inter: font('inter'), JetBrains_Mono: font('mono'), Space_Grotesk: font('display') }
})
vi.mock('@vercel/analytics/next', () => ({ Analytics: () => null }))
vi.mock('@vercel/speed-insights/next', () => ({ SpeedInsights: () => null }))
vi.mock('next/navigation', () => ({
    notFound: () => {
        throw new Error('NEXT_NOT_FOUND')
    },
}))

const params = (lang: string) => ({ params: Promise.resolve({ lang }) })

describe('layout racine', () => {
    it('prérend une page par langue connue', () => {
        expect(generateStaticParams()).toEqual([{ lang: 'fr' }, { lang: 'en' }])
    })

    it('déclare les couleurs du navigateur sur le fond crème et charbon', () => {
        expect(viewport.themeColor).toEqual([
            { media: '(prefers-color-scheme: light)', color: '#f1ece2' },
            { media: '(prefers-color-scheme: dark)', color: '#121110' },
        ])
    })

    it.each([
        ['fr', '/', 'fr_FR', ['en_US']],
        ['en', '/en', 'en_US', ['fr_FR']],
    ] as const)('décrit la page %s, son URL canonique et ses traductions', async (lang, canonical, ogLocale, alternate) => {
        const t = getDictionary(lang).meta
        const metadata = await generateMetadata(params(lang))

        expect(metadata.title).toEqual({ default: t.title, template: '%s — Paul Ragueneau' })
        expect(metadata.description).toBe(t.description)
        expect(metadata.alternates).toEqual({
            canonical,
            languages: { fr: '/', en: '/en', 'x-default': '/' },
        })
        expect(metadata.openGraph).toMatchObject({ locale: ogLocale, alternateLocale: alternate, url: canonical })
    })

    it('ne décrit rien pour une langue inconnue', async () => {
        expect(await generateMetadata(params('de'))).toEqual({})
    })

    it('habille la page : langue, polices, allumage néon et données structurées', async () => {
        const markup = renderToStaticMarkup(await RootLayout({ children: <p>contenu</p>, ...params('en') }))

        expect(markup).toContain('<html lang="en"')
        expect(markup).toMatch(/<body class="font-inter font-mono font-display antialiased"/)
        expect(markup).toContain(neonPowerOffScript)
        expect(markup).toContain('type="application/ld+json"')
        expect(markup).toContain('<p>contenu</p>')
    })

    it('renvoie une 404 pour une langue inconnue', async () => {
        await expect(RootLayout({ children: null, ...params('de') })).rejects.toThrow('NEXT_NOT_FOUND')
    })
})
