import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { headers } from 'next/headers'
import { __resetRateLimit, checkGlobalRateLimit } from '@/lib/rate-limit'

type SendOptions = {
    from: string
    to: string
    replyTo: string
    subject: string
    text: string
}
type SendResult = { data: { id: string } | null; error: { message: string } | null }

const send = vi.fn<(opts: SendOptions) => Promise<SendResult>>(async () => ({
    data: { id: 'msg_1' },
    error: null,
}))

vi.mock('resend', () => ({
    Resend: vi.fn(function () {
        return { emails: { send } }
    }),
}))

const defaultHeaders = async () => ({ get: () => '203.0.113.5' })

const firewall = vi.hoisted(() => ({
    checkRateLimit: vi.fn(async () => ({ rateLimited: false })),
}))
vi.mock('@vercel/firewall', () => firewall)

vi.mock('next/headers', () => ({
    headers: vi.fn(),
}))

import { sendContactMessage, type ContactState } from './contact'

const idle: ContactState = { status: 'idle', message: '' }

function fd(fields: Record<string, string>): FormData {
    const f = new FormData()
    for (const [k, v] of Object.entries(fields)) f.set(k, v)
    return f
}

const validFields = {
    name: 'Jean Dupont',
    email: 'jean@example.com',
    message: 'Bonjour, je vous contacte au sujet de votre profil.',
}

beforeEach(() => {
    __resetRateLimit()
    send.mockClear()
    process.env.RESEND_API_KEY = 'test-key'
    vi.mocked(headers).mockImplementation(
        defaultHeaders as unknown as typeof headers,
    )
})

describe('sendContactMessage', () => {
    it('renvoie un succès sans appeler Resend quand le honeypot est rempli', async () => {
        const res = await sendContactMessage(idle, fd({ ...validFields, company: 'bot' }))
        expect(res.status).toBe('success')
        expect(send).not.toHaveBeenCalled()
    })

    it('renvoie une erreur de validation sans appeler Resend', async () => {
        const res = await sendContactMessage(idle, fd({ ...validFields, email: 'invalide' }))
        expect(res.status).toBe('error')
        expect(send).not.toHaveBeenCalled()
    })

    it('traduit les messages selon la langue transmise par le formulaire', async () => {
        const fr = await sendContactMessage(idle, fd({ ...validFields, email: 'invalide' }))
        const en = await sendContactMessage(idle, fd({ ...validFields, email: 'invalide', locale: 'en' }))
        expect(fr.message).toBe("Merci d'indiquer une adresse email valide.")
        expect(en.message).toBe('Please enter a valid email address.')
    })

    it('retombe sur le français pour une langue inconnue', async () => {
        const res = await sendContactMessage(idle, fd({ ...validFields, email: 'invalide', locale: 'de' }))
        expect(res.message).toBe("Merci d'indiquer une adresse email valide.")
    })

    it('envoie via Resend et renvoie un succès pour une saisie valide', async () => {
        const res = await sendContactMessage(idle, fd(validFields))
        expect(res.status).toBe('success')
        expect(send).toHaveBeenCalledTimes(1)
        const arg = send.mock.calls[0][0]
        expect(arg.to).toBeDefined()
        expect(arg.replyTo).toBe('jean@example.com')
    })

    it('renvoie une erreur si la clé API est absente', async () => {
        delete process.env.RESEND_API_KEY
        const res = await sendContactMessage(idle, fd(validFields))
        expect(res.status).toBe('error')
        expect(send).not.toHaveBeenCalled()
    })

    it('renvoie une erreur si Resend renvoie une erreur', async () => {
        send.mockResolvedValueOnce({ data: null, error: { message: 'boom' } })
        const res = await sendContactMessage(idle, fd(validFields))
        expect(res.status).toBe('error')
    })

    it('renvoie une erreur générique si Resend lève une exception', async () => {
        send.mockRejectedValueOnce(new Error('network down'))
        const res = await sendContactMessage(idle, fd(validFields))
        expect(res).toEqual({
            status: 'error',
            message: "L'envoi a échoué. Réessayez, ou écrivez-moi directement par email.",
        })
    })

    it('compose un expéditeur portant le nom du visiteur, sur le domaine vérifié', async () => {
        await sendContactMessage(idle, fd(validFields))
        expect(send.mock.calls[0][0].from).toBe(
            'Jean Dupont (via portfolio) <contact@paulragueneau.com>',
        )
    })

    it('neutralise une injection d’en-tête via le nom', async () => {
        await sendContactMessage(idle, fd({ ...validFields, name: 'Jean <evil@x.com>' }))
        const from = send.mock.calls[0][0].from
        expect(from).toBe('Jean evil@x.com (via portfolio) <contact@paulragueneau.com>')
        expect(from.match(/</g)).toHaveLength(1)
    })

    it('bloque une saisie valide quand le plafond global est atteint (sans appeler Resend)', async () => {
        for (let i = 0; i < 20; i++) checkGlobalRateLimit()
        const res = await sendContactMessage(idle, fd(validFields))
        expect(res.status).toBe('error')
        expect(send).not.toHaveBeenCalled()
    })

    it('bloque la 4e soumission d’une même IP sans appeler Resend', async () => {
        for (let i = 0; i < 3; i++) {
            expect((await sendContactMessage(idle, fd(validFields))).status).toBe('success')
        }
        const res = await sendContactMessage(idle, fd(validFields))
        expect(res).toEqual({
            status: 'error',
            message: 'Trop de tentatives. Réessayez dans quelques minutes.',
        })
        expect(send).toHaveBeenCalledTimes(3)
    })

    it('identifie le visiteur par la première IP de x-forwarded-for', async () => {
        const forwardedFor = (value: string) =>
            vi.mocked(headers).mockResolvedValue({
                get: (name: string) => (name === 'x-forwarded-for' ? value : null),
            } as unknown as Awaited<ReturnType<typeof headers>>)

        // Même client derrière des proxys différents : même compteur.
        forwardedFor('198.51.100.1, 10.0.0.1')
        for (let i = 0; i < 3; i++) await sendContactMessage(idle, fd(validFields))
        forwardedFor('198.51.100.1, 10.0.0.2')
        expect((await sendContactMessage(idle, fd(validFields))).status).toBe('error')

        // Autre client : compteur distinct.
        forwardedFor('198.51.100.2, 10.0.0.1')
        expect((await sendContactMessage(idle, fd(validFields))).status).toBe('success')
    })

    describe('sur Vercel', () => {
        beforeEach(() => {
            vi.stubEnv('VERCEL', '1')
            firewall.checkRateLimit.mockClear()
        })
        afterEach(() => {
            vi.unstubAllEnvs()
        })

        it('bloque l’envoi quand la limite partagée du pare-feu est atteinte', async () => {
            firewall.checkRateLimit.mockResolvedValueOnce({ rateLimited: true })
            const res = await sendContactMessage(idle, fd(validFields))
            expect(res).toEqual({
                status: 'error',
                message: 'Trop de tentatives. Réessayez dans quelques minutes.',
            })
            expect(send).not.toHaveBeenCalled()
        })

        it('ne consulte pas le pare-feu pour une saisie invalide', async () => {
            await sendContactMessage(idle, fd({ ...validFields, email: 'invalide' }))
            expect(firewall.checkRateLimit).not.toHaveBeenCalled()
        })

        it('envoie le message quand la limite partagée n’est pas atteinte', async () => {
            const res = await sendContactMessage(idle, fd(validFields))
            expect(res.status).toBe('success')
            expect(firewall.checkRateLimit).toHaveBeenCalledTimes(1)
            expect(send).toHaveBeenCalledTimes(1)
        })
    })

    describe('journalisation des échecs', () => {
        let consoleError: ReturnType<typeof vi.spyOn>

        beforeEach(() => {
            consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
        })
        afterEach(() => {
            consoleError.mockRestore()
        })

        // Aucune donnée saisie par le visiteur ne doit finir dans les logs.
        function expectNoVisitorData() {
            const logged = JSON.stringify(consoleError.mock.calls)
            for (const value of Object.values(validFields)) expect(logged).not.toContain(value)
        }

        it('journalise le code d’erreur renvoyé par Resend', async () => {
            send.mockResolvedValueOnce({
                data: null,
                error: { message: `Invalid reply_to: ${validFields.email}`, name: 'validation_error', statusCode: 422 } as never,
            })
            await sendContactMessage(idle, fd(validFields))
            expect(consoleError).toHaveBeenCalledWith(expect.any(String), {
                reason: 'resend_error',
                code: 'validation_error',
                status: 422,
            })
            expectNoVisitorData()
        })

        it('journalise une exception sans son message', async () => {
            send.mockRejectedValueOnce(new TypeError(`fetch failed for ${validFields.email}`))
            await sendContactMessage(idle, fd(validFields))
            expect(consoleError).toHaveBeenCalledWith(expect.any(String), { reason: 'exception', type: 'TypeError' })
            expectNoVisitorData()
        })

        it('journalise l’absence de clé API', async () => {
            delete process.env.RESEND_API_KEY
            await sendContactMessage(idle, fd(validFields))
            expect(consoleError).toHaveBeenCalledWith(expect.any(String), { reason: 'missing_api_key' })
        })

        it('ne journalise rien quand l’envoi réussit', async () => {
            await sendContactMessage(idle, fd(validFields))
            expect(consoleError).not.toHaveBeenCalled()
        })
    })
})
