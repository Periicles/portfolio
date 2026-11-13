import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Sans `globals: true`, Testing Library ne démonte pas seul les rendus.
afterEach(() => {
    cleanup()
})

// jsdom n'implémente ni matchMedia ni IntersectionObserver : des versions
// inertes suffisent aux composants qui les utilisent (next/link, thème…).
if (typeof window !== 'undefined') {
    window.matchMedia ??= (query: string) =>
        ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => {},
            removeListener: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
        }) as MediaQueryList

    window.IntersectionObserver ??= class {
        readonly root = null
        readonly rootMargin = ''
        readonly thresholds = []
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
            return []
        }
    } as unknown as typeof IntersectionObserver
}
