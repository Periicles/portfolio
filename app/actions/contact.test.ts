import { describe, it, expect, vi, beforeEach } from 'vitest'
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

vi.mock('next/headers', () => ({
    headers: vi.fn(async () => ({ get: () => '203.0.113.5' })),
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
})
