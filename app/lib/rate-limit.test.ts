import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

const firewall = vi.hoisted(() => ({
    checkRateLimit: vi.fn<() => Promise<{ rateLimited: boolean; error?: 'not-found' | 'blocked' }>>(),
}))
vi.mock('@vercel/firewall', () => firewall)

import {
    checkRateLimit,
    checkGlobalRateLimit,
    checkSharedRateLimit,
    CONTACT_RATE_LIMIT_ID,
    __resetRateLimit,
} from './rate-limit'

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

describe('checkGlobalRateLimit', () => {
    it('autorise jusqu’au plafond global sur la fenêtre', () => {
        for (let i = 0; i < 20; i++) {
            expect(checkGlobalRateLimit(i)).toBe(true)
        }
    })

    it('bloque au-delà du plafond, quelle que soit l’IP (non contournable par spoofing)', () => {
        for (let i = 0; i < 20; i++) {
            checkGlobalRateLimit(i)
        }
        expect(checkGlobalRateLimit(21)).toBe(false)
    })

    it('réautorise après expiration de la fenêtre', () => {
        for (let i = 0; i < 20; i++) {
            checkGlobalRateLimit(i)
        }
        expect(checkGlobalRateLimit(WINDOW + 1)).toBe(true)
    })
})

describe('checkSharedRateLimit', () => {
    const headers = new Headers({ 'x-real-ip': '203.0.113.7' })

    beforeEach(() => {
        firewall.checkRateLimit.mockReset()
        vi.stubEnv('VERCEL', '1')
    })

    afterEach(() => {
        vi.unstubAllEnvs()
    })

    it('n’interroge pas le pare-feu hors de Vercel', async () => {
        vi.stubEnv('VERCEL', '')
        expect(await checkSharedRateLimit(headers)).toBe(true)
        expect(firewall.checkRateLimit).not.toHaveBeenCalled()
    })

    it('interroge la règle du formulaire de contact avec les en-têtes de la requête', async () => {
        firewall.checkRateLimit.mockResolvedValue({ rateLimited: false })
        expect(await checkSharedRateLimit(headers)).toBe(true)
        expect(firewall.checkRateLimit).toHaveBeenCalledWith(
            CONTACT_RATE_LIMIT_ID,
            expect.objectContaining({ headers, timeout: expect.any(Number) }),
        )
    })

    it('bloque quand le pare-feu signale la limite atteinte', async () => {
        firewall.checkRateLimit.mockResolvedValue({ rateLimited: true })
        expect(await checkSharedRateLimit(headers)).toBe(false)
    })

    it('bloque quand le pare-feu refuse la requête', async () => {
        firewall.checkRateLimit.mockResolvedValue({ rateLimited: true, error: 'blocked' })
        expect(await checkSharedRateLimit(headers)).toBe(false)
    })

    it('laisse passer tant que la règle n’est pas configurée', async () => {
        firewall.checkRateLimit.mockResolvedValue({ rateLimited: false, error: 'not-found' })
        expect(await checkSharedRateLimit(headers)).toBe(true)
    })

    it('laisse passer si le pare-feu est en panne ou trop lent', async () => {
        firewall.checkRateLimit.mockRejectedValue(new DOMException('timeout', 'TimeoutError'))
        expect(await checkSharedRateLimit(headers)).toBe(true)
    })
})
