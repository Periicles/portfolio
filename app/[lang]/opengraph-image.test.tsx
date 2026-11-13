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
            options: { width: number; height: number }
        }

        expect(image.options).toEqual({ width: 1200, height: 630 })
        const markup = renderToStaticMarkup(image.element)
        for (const text of [site.domain, site.name, t.role, t.ogTagline, t.ogBadge]) expect(markup).toContain(text)
    })
})
