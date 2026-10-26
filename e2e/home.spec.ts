import { test, expect } from '@playwright/test'
import { gotoWithoutErrors } from './helpers'

const pages = [
    { path: '/', lang: 'fr', nav: { about: 'À propos', experience: 'Expérience', education: 'Formation', projects: 'Projets', contact: 'Contact' } },
    { path: '/en', lang: 'en', nav: { about: 'About', experience: 'Experience', education: 'Education', projects: 'Projects', contact: 'Contact' } },
] as const

for (const { path, lang, nav } of pages) {
    test.describe(`page ${path}`, () => {
        test('se charge sans erreur, dans la bonne langue', async ({ page }) => {
            const { response, errors } = await gotoWithoutErrors(page, path)
            expect(response?.status()).toBe(200)
            await expect(page.locator('html')).toHaveAttribute('lang', lang)
            await expect(page.getByRole('heading', { level: 1, name: 'Paul Ragueneau' })).toBeVisible()
            expect(errors).toEqual([])
        })

        test('affiche toutes les sections et leur lien de navigation', async ({ page }) => {
            await gotoWithoutErrors(page, path)
            const navigation = page.getByRole('navigation').first()
            for (const [id, label] of Object.entries(nav)) {
                await expect(page.locator(`section#${id}`)).toBeAttached()
                await expect(navigation.locator(`li a[href="#${id}"]`)).toHaveText(new RegExp(`${label}$`))
            }
        })

        test('ne déborde pas horizontalement', async ({ page }) => {
            await gotoWithoutErrors(page, path)
            const overflow = await page.evaluate(
                () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
            )
            expect(overflow).toBeLessThanOrEqual(0)
        })
    })
}

test('le voile noir se retire au chargement, après l’allumage', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).not.toHaveAttribute('data-neon-power', { timeout: 10_000 })
    const veil = await page.evaluate(() => getComputedStyle(document.documentElement, '::after').content)
    expect(veil).toBe('none')
})

test.describe('mouvements réduits', () => {
    test.use({ reducedMotion: 'reduce' })

    test('n’assombrit jamais la page', async ({ page }) => {
        await page.goto('/')
        await expect(page.locator('html')).not.toHaveAttribute('data-neon-power')
        await expect(page.locator('.neon-ignite, .neon-boot')).toHaveCount(0)
    })
})

test('une langue inconnue renvoie la page 404', async ({ page }) => {
    const response = await page.goto('/de')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Page introuvable')
})
