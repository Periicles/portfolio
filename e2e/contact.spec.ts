import { test, expect } from '@playwright/test'
import { waitForNeonBoot } from './helpers'

const MOCK_RESEND = 'http://localhost:3101'

test('le formulaire de contact envoie le message via Resend', async ({ page, request }, testInfo) => {
    // Adresse et IP uniques par exécution : les tests tournent en parallèle sur
    // le même serveur, et la limite de 3 envois par IP bloquerait les reprises.
    const run = `${testInfo.project.name}-${testInfo.repeatEachIndex}-${testInfo.retry}`
    const email = `visiteur+${run}@example.com`
    await page.setExtraHTTPHeaders({ 'x-forwarded-for': `e2e-${run}` })

    await page.goto('/')
    await waitForNeonBoot(page)
    const form = page.locator('section#contact form')
    await form.getByLabel('Nom').fill('Jeanne Test')
    await form.getByLabel('Email').fill(email)
    await form.getByLabel('Message').fill('Bonjour, ceci est un message de test de bout en bout.')
    await form.getByRole('button', { name: 'Envoyer le message' }).click()

    await expect(form.getByText('Merci, votre message a bien été envoyé.')).toBeVisible()

    const emails: Array<Record<string, unknown>> = await (await request.get(`${MOCK_RESEND}/__emails`)).json()
    const sent = emails.find((e) => e.reply_to === email || e.replyTo === email)
    expect(sent).toBeDefined()
    expect(sent?.from).toBe('Jeanne Test (via portfolio) <contact@paulragueneau.com>')
    expect(String(sent?.text)).toContain('ceci est un message de test')
})

test('le navigateur bloque l’envoi d’un formulaire incomplet', async ({ page }) => {
    await page.goto('/')
    await waitForNeonBoot(page)
    const form = page.locator('section#contact form')
    // Toute soumission passerait par un POST vers l'action serveur.
    const posts: string[] = []
    page.on('request', (req) => {
        if (req.method() === 'POST') posts.push(req.url())
    })

    await form.getByLabel('Email').fill('pas-un-email')
    await form.getByRole('button', { name: 'Envoyer le message' }).click()

    expect(await form.getByLabel('Nom').evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false)
    expect(await form.getByLabel('Email').evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false)
    await page.waitForTimeout(500)
    expect(posts).toEqual([])
})
