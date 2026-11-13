import { describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import GlobalNotFound, { metadata } from './global-not-found'

vi.mock('next/font/google', () => ({ Inter: () => ({ variable: 'font-inter' }) }))

describe('page 404 globale', () => {
    it('reste hors des moteurs de recherche', () => {
        expect(metadata.robots).toEqual({ index: false })
    })

    it('explique l’erreur dans les deux langues et ramène à chaque accueil', () => {
        const markup = renderToStaticMarkup(<GlobalNotFound />)

        expect(markup).toContain('<html lang="fr"')
        expect(markup).toContain('Page introuvable')
        expect(markup).toContain('<span class="block text-muted text-xl md:text-2xl font-semibold mt-2" lang="en">Page not found</span>')
        expect(markup).toMatch(/<a [^>]*href="\/"[^>]*>Retour à l(&#x27;|')accueil<\/a>/)
        expect(markup).toMatch(/<a [^>]*href="\/en"[^>]*lang="en"|<a [^>]*lang="en"[^>]*href="\/en"/)
    })
})
