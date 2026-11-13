import { test, expect } from '@playwright/test'
import { waitForNeonBoot } from './helpers'

test('le bouton de thème bascule le thème et le choix survit au rechargement', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await page.goto('/')
    await waitForNeonBoot(page)
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/\bdark\b/)

    await page.locator('button[title="Changer de thème"]:visible').click()
    await expect(html).toHaveClass(/\bdark\b/)

    await page.reload()
    await expect(html).toHaveClass(/\bdark\b/)
})

test('sans choix manuel, le thème suit la préférence de l’appareil', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' })
    await page.goto('/')
    await expect(page.locator('html')).toHaveClass(/\bdark\b/)
})

test('le sélecteur de langue mène à l’autre version et en revient', async ({ page }) => {
    await page.goto('/')
    await waitForNeonBoot(page)
    await page.getByRole('link', { name: 'Read this page in English' }).locator('visible=true').first().click()
    await expect(page).toHaveURL(/\/en$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    await waitForNeonBoot(page)
    await page.getByRole('link', { name: 'Lire cette page en français' }).locator('visible=true').first().click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr')
})

test('la navigation signale la section en cours de lecture, même plus haute que l’écran', async ({ page }) => {
    await page.goto('/')
    await waitForNeonBoot(page)
    const navigation = page.getByRole('navigation').first()

    for (const id of ['experience', 'projects', 'about']) {
        await page
            .locator(`section#${id}`)
            .evaluate((section) => window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY + 100))
        await expect(navigation.locator(`a[href="#${id}"]`)).toHaveAttribute('aria-current', 'location')
        await expect(navigation.locator('a[aria-current]')).toHaveCount(1)
    }
})

test('le CV est téléchargeable', async ({ page, request }) => {
    await page.goto('/')
    const link = page.locator('a[href$=".pdf"]').first()
    const href = await link.getAttribute('href')
    expect(href).toBeTruthy()
    const pdf = await request.get(href!)
    expect(pdf.status()).toBe(200)
    expect(pdf.headers()['content-type']).toContain('application/pdf')
})
