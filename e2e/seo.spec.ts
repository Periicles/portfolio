import { test, expect } from '@playwright/test'

const SITE = 'https://www.paulragueneau.com'

const pages = [
    { path: '/', canonical: `${SITE}`, ogLocale: 'fr_FR', jobTitle: 'Développeur Web Fullstack' },
    { path: '/en', canonical: `${SITE}/en`, ogLocale: 'en_US', jobTitle: 'Full-Stack Web Developer' },
] as const

for (const { path, canonical, ogLocale, jobTitle } of pages) {
    test.describe(`balises SEO de ${path}`, () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(path)
        })

        test('déclarent l’URL canonique et toutes les versions linguistiques', async ({ page }) => {
            const href = (selector: string) => page.locator(selector).getAttribute('href')
            // Next écrit l'URL racine sans barre finale : on compare sans elle.
            expect((await href('link[rel="canonical"]'))?.replace(/\/$/, '')).toBe(canonical)
            expect(await href('link[rel="alternate"][hreflang="fr"]')).toMatch(new RegExp(`^${SITE}/?$`))
            expect(await href('link[rel="alternate"][hreflang="en"]')).toBe(`${SITE}/en`)
            expect(await href('link[rel="alternate"][hreflang="x-default"]')).toMatch(new RegExp(`^${SITE}/?$`))
        })

        test('ont un titre, une description et des balises Open Graph', async ({ page }) => {
            await expect(page).toHaveTitle(/Paul Ragueneau/)
            const content = (selector: string) => page.locator(selector).getAttribute('content')
            expect(await content('meta[name="description"]')).toBeTruthy()
            expect(await content('meta[property="og:locale"]')).toBe(ogLocale)
            expect(await content('meta[property="og:image"]')).toMatch(/^https?:\/\//)
            await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0)
        })

        test('embarquent des données structurées JSON-LD valides', async ({ page }) => {
            const raw = await page.locator('script[type="application/ld+json"]').first().textContent()
            const data = JSON.parse(raw ?? '')
            const nodes: Array<Record<string, unknown>> = data['@graph'] ?? [data]
            const person = nodes.find((node) => node['@type'] === 'Person')
            expect(person?.name).toBe('Paul Ragueneau')
            expect(person?.jobTitle).toBe(jobTitle)
        })
    })
}

test('sert le sitemap et le robots.txt', async ({ request }) => {
    const sitemap = await request.get('/sitemap.xml')
    expect(sitemap.status()).toBe(200)
    const xml = await sitemap.text()
    expect(xml).toContain(`<loc>${SITE}/</loc>`)
    expect(xml).toContain(`<loc>${SITE}/en</loc>`)

    const robots = await request.get('/robots.txt')
    expect(robots.status()).toBe(200)
    expect(await robots.text()).toContain(`Sitemap: ${SITE}/sitemap.xml`)
})
