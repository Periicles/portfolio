// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ContactState } from '@/actions/contact'
import { getDictionary } from '@/i18n/dictionaries'
import ContactForm from './ContactForm'

const { sendContactMessage } = vi.hoisted(() => ({
    sendContactMessage: vi.fn<(prev: ContactState, data: FormData) => Promise<ContactState>>(),
}))
vi.mock('@/actions/contact', () => ({ sendContactMessage }))

const t = getDictionary('fr').form

async function fillAndSend() {
    const user = userEvent.setup()
    await user.type(screen.getByLabelText(t.name), 'Jeanne Test')
    await user.type(screen.getByLabelText(t.email), 'jeanne@example.com')
    await user.type(screen.getByLabelText(t.message), 'Bonjour, ceci est un message de test.')
    await user.click(screen.getByRole('button', { name: t.submit }))
}

beforeEach(() => {
    sendContactMessage.mockReset()
})

describe('ContactForm', () => {
    it('impose au navigateur les mêmes limites que le serveur', () => {
        render(<ContactForm locale="fr" t={t} />)

        const name = screen.getByLabelText(t.name)
        expect(name.hasAttribute('required')).toBe(true)
        expect(name.getAttribute('minlength')).toBe('2')
        expect(name.getAttribute('maxlength')).toBe('100')
        expect(screen.getByLabelText(t.email).getAttribute('type')).toBe('email')
        expect(screen.getByLabelText(t.message).getAttribute('maxlength')).toBe('5000')
    })

    it('cache le piège à robots aux visiteurs et au clavier', () => {
        const { container } = render(<ContactForm locale="fr" t={t} />)

        const honeypot = container.querySelector<HTMLInputElement>('#company')
        expect(honeypot?.tabIndex).toBe(-1)
        expect(honeypot?.closest('[aria-hidden]')).not.toBeNull()
    })

    it('garde une zone d’annonce vide et invisible avant tout envoi', () => {
        const { container } = render(<ContactForm locale="fr" t={t} />)

        const status = container.querySelector('[aria-live="polite"]')
        expect(status?.className).toBe('sr-only')
        expect(status?.textContent).toBe('')
    })

    it('transmet la langue et les champs, puis annonce la réussite', async () => {
        sendContactMessage.mockResolvedValue({ status: 'success', message: 'Message envoyé.' })
        render(<ContactForm locale="en" t={t} />)

        await fillAndSend()

        const status = await screen.findByText('Message envoyé.')
        expect(status.className).toContain('text-accent-strong')
        const data = sendContactMessage.mock.calls[0][1]
        expect(Object.fromEntries(data)).toMatchObject({
            locale: 'en',
            name: 'Jeanne Test',
            email: 'jeanne@example.com',
            message: 'Bonjour, ceci est un message de test.',
            company: '',
        })
    })

    it('annonce un échec en rouge', async () => {
        sendContactMessage.mockResolvedValue({ status: 'error', message: 'Échec de l’envoi.' })
        render(<ContactForm locale="fr" t={t} />)

        await fillAndSend()

        expect((await screen.findByText('Échec de l’envoi.')).className).toContain('text-red-700')
    })

    it('bloque un second envoi tant que le premier est en cours', async () => {
        let finish: (state: ContactState) => void = () => {}
        sendContactMessage.mockImplementation(() => new Promise((resolve) => (finish = resolve)))
        render(<ContactForm locale="fr" t={t} />)

        await fillAndSend()

        const pending = await screen.findByRole('button', { name: t.sending })
        expect(pending.hasAttribute('disabled')).toBe(true)

        finish({ status: 'success', message: 'Envoyé.' })
        expect(await screen.findByRole('button', { name: t.submit })).toBeTruthy()
    })
})
