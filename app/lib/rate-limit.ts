type Hit = { count: number; resetAt: number }

const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 3

const store = new Map<string, Hit>()

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

export function __resetRateLimit(): void {
    store.clear()
}
