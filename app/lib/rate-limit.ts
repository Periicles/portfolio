import { checkRateLimit as checkFirewallRateLimit } from '@vercel/firewall'

type Hit = { count: number; resetAt: number }

const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 3
const MAX_GLOBAL_HITS = 20

const store = new Map<string, Hit>()
let globalHit: Hit | null = null

export function checkRateLimit(key: string, now: number = Date.now()): boolean {
    const hit = store.get(key)
    if (!hit || now > hit.resetAt) {
        store.set(key, { count: 1, resetAt: now + WINDOW_MS })
        return true
    }
    if (hit.count >= MAX_HITS) {
        return false
    }
    hit.count += 1
    return true
}

/**
 * Plafond global d'envois par fenêtre, toutes IP confondues. Défense
 * anti-abus non contournable par spoofing d'IP : borne le coût même si la
 * limite par IP est esquivée.
 */
export function checkGlobalRateLimit(now: number = Date.now()): boolean {
    if (!globalHit || now > globalHit.resetAt) {
        globalHit = { count: 1, resetAt: now + WINDOW_MS }
        return true
    }
    if (globalHit.count >= MAX_GLOBAL_HITS) {
        return false
    }
    globalHit.count += 1
    return true
}

/** Identifiant de la règle de limitation définie dans le pare-feu Vercel. */
export const CONTACT_RATE_LIMIT_ID = 'contact-form'

const FIREWALL_TIMEOUT_MS = 1500

/**
 * Limite par IP partagée entre toutes les instances de fonction, via une
 * règle du pare-feu Vercel (`@vercel/firewall`). Les compteurs en mémoire
 * ci-dessus sont propres à chaque instance : sur Vercel, des envois répartis
 * sur plusieurs instances leur échappent.
 *
 * Renvoie `true` si l'envoi est autorisé. Hors Vercel (dev, tests), il n'y a
 * pas de pare-feu à interroger. Tant que la règle n'existe pas dans le
 * tableau de bord, le SDK répond « non configuré » et laisse passer.
 */
export async function checkSharedRateLimit(headers: Headers): Promise<boolean> {
    if (process.env.VERCEL !== '1') return true
    try {
        const { rateLimited } = await checkFirewallRateLimit(CONTACT_RATE_LIMIT_ID, {
            headers,
            timeout: FIREWALL_TIMEOUT_MS,
        })
        return !rateLimited
    } catch {
        // En cas de panne ou de délai dépassé, on laisse passer plutôt que de
        // perdre un vrai message : les limites en mémoire restent actives.
        return true
    }
}

export function __resetRateLimit(): void {
    store.clear()
    globalHit = null
}
