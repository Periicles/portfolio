import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { site } from '@/content/site'
import { getDictionary } from '@/i18n/dictionaries'
import OpengraphImage, { generateImageMetadata } from './opengraph-image'

vi.mock('next/og', () => ({
    ImageResponse: class {
        constructor(
            readonly element: ReactElement,
            readonly options: { width: number; height: number },
        ) {}
    },
}))

const params = (lang: string) => ({ params: Promise.resolve({ lang }) })

describe('image Open Graph', () => {
    it.each(['fr', 'en'] as const)('porte un texte alternatif traduit (%s)', async (lang) => {
        expect(await generateImageMetadata(params(lang))).toEqual([
            {
                id: 'default',
                alt: getDictionary(lang).meta.title,
                size: { width: 1200, height: 630 },
                contentType: 'image/png',
            },
        ])
    })

    it('se rabat sur le français pour une langue inconnue', async () => {
        const [meta] = await generateImageMetadata(params('de'))
        expect(meta.alt).toBe(getDictionary('fr').meta.title)
    })

    it('compose une carte 1200 × 630 avec nom, rôle, technologies et statut', async () => {
        const t = getDictionary('en').meta
        const image = (await OpengraphImage(params('en'))) as unknown as {
            element: ReactElement
            options: { width: number; height: number; fonts: { name: string; weight: number; data: Buffer }[] }
        }

        expect(image.options).toMatchObject({ width: 1200, height: 630 })
        const markup = renderToStaticMarkup(image.element)
        // Prénom et nom sont sur deux lignes de l'affiche, donc dans deux éléments.
        for (const text of [site.domain, ...site.name.split(' '), t.role, t.ogTagline, t.ogBadge]) {
            expect(markup).toContain(text)
        }
    })

    it('embarque les polices du site, faute de quoi le moteur retomberait sur la sienne', async () => {
        const image = (await OpengraphImage(params('fr'))) as unknown as {
            options: { fonts: { name: string; weight: number; data: Buffer }[] }
        }

        expect(image.options.fonts.map(({ name, weight }) => [name, weight])).toEqual([
            ['Inter', 500],
            ['Space Grotesk', 700],
            ['JetBrains Mono', 400],
        ])
        for (const font of image.options.fonts) expect(font.data.byteLength).toBeGreaterThan(10_000)
    })
})
