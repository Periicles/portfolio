// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getDictionary } from '@/i18n/dictionaries'
import CvDownload from './CvDownload'
import LanguageSwitcher from './LanguageSwitcher'
import SectionEyebrow from './SectionEyebrow'
import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'

describe('CvDownload', () => {
    it.each(['fr', 'en'] as const)('télécharge le CV %s sous un nom lisible', (locale) => {
        const cv = getDictionary(locale).cv
        render(<CvDownload {...cv} />)

        const link = screen.getByRole('link', { name: `${cv.label} (PDF)` })
        expect(link.getAttribute('href')).toBe(cv.href)
        expect(link.getAttribute('download')).toBe(cv.fileName)
    })
})

describe('LanguageSwitcher', () => {
    it('mène à la version anglaise, annoncée dans la langue cible', () => {
        render(<LanguageSwitcher t={getDictionary('fr').language} />)

        // Le nom accessible commence par le texte visible (WCAG 2.5.3). jsdom
        // rogne l'espace en tête du complément, d'où le `\s*`.
        const link = screen.getByRole('link', { name: /^EN\s*— Read this page in English$/ })
        expect(link.getAttribute('href')).toBe('/en')
        expect(link.getAttribute('hreflang')).toBe('en')
        expect(link.getAttribute('lang')).toBe('en')
    })

    it('ramène à la version française, servie à la racine', () => {
        render(<LanguageSwitcher t={getDictionary('en').language} />)

        const link = screen.getByRole('link', { name: /^FR\s*— Lire cette page en français$/ })
        expect(link.getAttribute('href')).toBe('/')
        expect(link.getAttribute('hreflang')).toBe('fr')
    })
})

describe('SectionEyebrow', () => {
    it('numérote la section sur deux chiffres, à l’écart des lecteurs d’écran', () => {
        const { container } = render(<SectionEyebrow index={4}>Projets</SectionEyebrow>)

        const eyebrow = container.querySelector('p')
        expect(eyebrow?.textContent).toBe('04 — Projets')
        expect(eyebrow?.getAttribute('aria-hidden')).toBe('true')
    })
})

describe('icônes de réseaux', () => {
    it.each([
        ['GitHub', GitHubIcon],
        ['LinkedIn', LinkedInIcon],
    ])('%s reste décorative et accepte une taille personnalisée', (_, Icon) => {
        const { container } = render(<Icon className="h-8 w-8" />)

        const svg = container.querySelector('svg')
        expect(svg?.getAttribute('aria-hidden')).toBe('true')
        expect(svg?.getAttribute('class')).toBe('h-8 w-8')
    })

    it.each([GitHubIcon, LinkedInIcon])('prend une taille par défaut', (Icon) => {
        const { container } = render(<Icon />)
        expect(container.querySelector('svg')?.getAttribute('class')).toBe('w-5 h-5')
    })
})
