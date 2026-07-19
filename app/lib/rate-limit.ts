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

export function __resetRateLimit(): void {
    store.clear()
    globalHit = null
}
