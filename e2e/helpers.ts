import { expect, type Page } from '@playwright/test'

/**
 * Attend la fin de l'allumage néon : le voile noir du chargement est retiré
 * et plus aucun bloc n'est en cours de rallumage. Sans ça, une page peut
 * sembler vide ou des contrastes être mesurés en pleine animation.
 */
export async function waitForNeonBoot(page: Page) {
    await expect(page.locator('html')).not.toHaveAttribute('data-neon-power', { timeout: 10_000 })
    await expect(page.locator('.neon-ignite, .neon-boot')).toHaveCount(0, { timeout: 10_000 })
}

// Scripts Vercel Analytics et Speed Insights : servis par la plateforme
// Vercel uniquement, ils sont absents (404) avec `next start` en local.
const VERCEL_ONLY = '/_vercel/'

/** Ouvre une page et relève toute erreur JavaScript ou console. */
export async function gotoWithoutErrors(page: Page, path: string) {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
        if (message.type() !== 'error') return
        if (message.text().includes(VERCEL_ONLY) || message.location().url.includes(VERCEL_ONLY)) return
        errors.push(message.text())
    })
    const response = await page.goto(path)
    await waitForNeonBoot(page)
    return { response, errors }
}
