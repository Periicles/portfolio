import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { waitForNeonBoot } from './helpers'

// Contrôle automatique WCAG 2.1 A/AA avec axe, dans les deux langues et les
// deux thèmes : les contrastes changent d'un thème à l'autre.
for (const path of ['/', '/en']) {
    for (const colorScheme of ['light', 'dark'] as const) {
        test(`${path} en thème ${colorScheme} ne présente aucune violation axe`, async ({ page }) => {
            await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' })
            await page.goto(path)
            await waitForNeonBoot(page)

            const { violations } = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .analyze()

            expect(
                violations.map((v) => `${v.id} (${v.impact}) : ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
            ).toEqual([])
        })
    }
}
