// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useActiveSection } from './useActiveSection'

const sectionIds = ['about', 'experience', 'projects'] as const

let notify: IntersectionObserverCallback | undefined
let observerOptions: IntersectionObserverInit | undefined
const observed: string[] = []
const disconnect = vi.fn()

class FakeIntersectionObserver {
    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        notify = callback
        observerOptions = options
    }
    observe(element: Element) {
        observed.push(element.id)
    }
    disconnect = disconnect
}

function cross(states: Record<string, boolean>) {
    const entries = Object.entries(states).map(
        ([id, isIntersecting]) => ({ target: document.getElementById(id), isIntersecting }) as unknown as IntersectionObserverEntry,
    )
    act(() => notify?.(entries, {} as IntersectionObserver))
}

beforeEach(() => {
    document.body.innerHTML = sectionIds.map((id) => `<section id="${id}"></section>`).join('')
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
    notify = undefined
    observerOptions = undefined
    observed.length = 0
    disconnect.mockClear()
})

afterEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
})

describe('useActiveSection', () => {
    it('observe chaque section avec une ligne de lecture fine, à 40 % de l’écran', () => {
        renderHook(() => useActiveSection(sectionIds))

        expect(observed).toEqual(['about', 'experience', 'projects'])
        expect(observerOptions).toMatchObject({ rootMargin: '-40% 0px -59% 0px', threshold: 0 })
    })

    it('ne désigne aucune section tant qu’aucune ne croise la ligne', () => {
        const { result } = renderHook(() => useActiveSection(sectionIds))
        expect(result.current).toBe('')
    })

    it('désigne la section qui croise la ligne, quelle que soit sa hauteur', () => {
        const { result } = renderHook(() => useActiveSection(sectionIds))

        cross({ about: true })
        expect(result.current).toBe('about')

        cross({ about: false, experience: true })
        expect(result.current).toBe('experience')
    })

    it('retient la première section dans l’ordre du document si deux croisent la ligne', () => {
        const { result } = renderHook(() => useActiveSection(sectionIds))

        cross({ projects: true, experience: true })
        expect(result.current).toBe('experience')
    })

    it('garde la dernière section active quand plus aucune ne croise la ligne', () => {
        const { result } = renderHook(() => useActiveSection(sectionIds))

        cross({ projects: true })
        cross({ projects: false })
        expect(result.current).toBe('projects')
    })

    it('n’observe rien si aucune section n’existe dans la page', () => {
        document.body.innerHTML = ''
        const { result } = renderHook(() => useActiveSection(sectionIds))

        expect(notify).toBeUndefined()
        expect(result.current).toBe('')
    })

    it('se désabonne au démontage', () => {
        const { unmount } = renderHook(() => useActiveSection(sectionIds))
        unmount()
        expect(disconnect).toHaveBeenCalledOnce()
    })
})
