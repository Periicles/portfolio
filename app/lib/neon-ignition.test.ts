// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { igniteNeon, neonPowerOffScript } from './neon-ignition'

const VISIBLE_RECT = { width: 100, height: 20, top: 10, bottom: 30, left: 0, right: 100, x: 0, y: 10 } as DOMRect
const OFFSCREEN_RECT = { ...VISIBLE_RECT, top: 5000, bottom: 5020, y: 5000 } as DOMRect

function preferReducedMotion(reduce: boolean) {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: reduce && query.includes('reduce'), media: query }))
}

function booted(selector: string) {
    return document.querySelector(selector)?.classList.contains('neon-boot')
}

beforeEach(() => {
    document.body.innerHTML = `
        <nav>
            <ul><li id="item"><a id="item-link" href="#about">À propos</a></li></ul>
            <button id="toggle" type="button">Thème</button>
        </nav>
        <main>
            <h2 id="title">Titre</h2>
            <p id="text">Texte <a id="inline-link" href="#">lien</a></p>
            <p id="far">Tout en bas</p>
        </main>`
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        return this.id === 'far' ? OFFSCREEN_RECT : VISIBLE_RECT
    })
    vi.spyOn(Math, 'random').mockReturnValue(0.9)
    preferReducedMotion(false)
})

afterEach(() => {
    // Purge l'état du module (minuteur de nettoyage, voile) entre deux tests.
    vi.useFakeTimers()
    vi.runAllTimers()
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
    document.documentElement.removeAttribute('data-neon-power')
})

describe('igniteNeon', () => {
    it('ne fait rien si l’utilisateur limite les animations', () => {
        preferReducedMotion(true)
        igniteNeon()

        expect(document.querySelector('.neon-ignite')).toBeNull()
        expect(document.querySelectorAll('.neon-boot')).toHaveLength(0)
    })

    it('pose un voile de coupure de courant, ignoré des lecteurs d’écran', () => {
        igniteNeon()

        const veil = document.querySelector('.neon-ignite')
        expect(veil).not.toBeNull()
        expect(veil?.getAttribute('aria-hidden')).toBe('true')
    })

    it('retire le voile à la fin de son animation', () => {
        igniteNeon()
        document.querySelector('.neon-ignite')?.dispatchEvent(new Event('animationend'))

        expect(document.querySelector('.neon-ignite')).toBeNull()
    })

    it('rallume seulement le bloc le plus externe quand des blocs sont imbriqués', () => {
        igniteNeon()

        expect(booted('#item')).toBe(true)
        expect(booted('#item-link')).toBe(false)
        expect(booted('#text')).toBe(true)
        expect(booted('#inline-link')).toBe(false)
        expect(booted('#title')).toBe(true)
    })

    it('laisse allumé le bouton qui a déclenché l’allumage', () => {
        igniteNeon(document.getElementById('toggle'))

        expect(booted('#toggle')).toBe(false)
        expect(booted('#title')).toBe(true)
    })

    it('ignore les blocs hors de l’écran', () => {
        igniteNeon()
        expect(booted('#far')).toBe(false)
    })

    it('étale les rallumages dans le temps et rate parfois l’amorce', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.1)
        igniteNeon()

        const title = document.getElementById('title')
        expect(title?.style.getPropertyValue('--boot-delay')).toBe('460ms')
        expect(title?.classList.contains('neon-boot-hard')).toBe(true)
    })

    it('n’ajoute pas d’amorce ratée au-delà du seuil de hasard', () => {
        igniteNeon()
        expect(document.getElementById('title')?.classList.contains('neon-boot-hard')).toBe(false)
    })

    it('nettoie classes, délais et voile une fois la séquence terminée', () => {
        vi.useFakeTimers()
        igniteNeon()
        vi.advanceTimersByTime(2400)

        expect(document.querySelectorAll('.neon-boot, .neon-boot-hard')).toHaveLength(0)
        expect(document.getElementById('title')?.style.getPropertyValue('--boot-delay')).toBe('')
        expect(document.querySelector('.neon-ignite')).toBeNull()
    })

    it('repart de zéro si un nouvel allumage interrompt le précédent', () => {
        igniteNeon()
        igniteNeon()

        expect(document.querySelectorAll('.neon-ignite')).toHaveLength(1)
    })
})

describe('neonPowerOffScript', () => {
    const runScript = () => new Function(neonPowerOffScript)()

    it('plonge la page dans le noir avant le premier affichage', () => {
        runScript()
        expect(document.documentElement.hasAttribute('data-neon-power')).toBe(true)
    })

    it('laisse la page allumée si l’utilisateur limite les animations', () => {
        preferReducedMotion(true)
        runScript()
        expect(document.documentElement.hasAttribute('data-neon-power')).toBe(false)
    })
})
