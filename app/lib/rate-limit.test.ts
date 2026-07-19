import { describe, it, expect, beforeEach } from 'vitest'
import { checkRateLimit, __resetRateLimit } from './rate-limit'

const WINDOW = 10 * 60 * 1000

beforeEach(() => {
    __resetRateLimit()
})

describe('checkRateLimit', () => {
    it('autorise les 3 premières requêtes d’une même clé', () => {
        expect(checkRateLimit('ip-a', 0)).toBe(true)
        expect(checkRateLimit('ip-a', 1)).toBe(true)
        expect(checkRateLimit('ip-a', 2)).toBe(true)
    })

    it('bloque la 4e requête dans la fenêtre', () => {
        checkRateLimit('ip-a', 0)
        checkRateLimit('ip-a', 1)
        checkRateLimit('ip-a', 2)
        expect(checkRateLimit('ip-a', 3)).toBe(false)
    })

    it('réautorise après expiration de la fenêtre', () => {
        checkRateLimit('ip-a', 0)
        checkRateLimit('ip-a', 1)
        checkRateLimit('ip-a', 2)
        expect(checkRateLimit('ip-a', WINDOW + 1)).toBe(true)
    })

    it('isole les clés entre elles', () => {
        checkRateLimit('ip-a', 0)
        checkRateLimit('ip-a', 0)
        checkRateLimit('ip-a', 0)
        expect(checkRateLimit('ip-b', 0)).toBe(true)
    })
})
