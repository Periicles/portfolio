'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { site } from '@/content/site'
import { validateContactForm, isHoneypotFilled } from '@/lib/contact-validation'
import { checkRateLimit, checkGlobalRateLimit } from '@/lib/rate-limit'

const FROM = 'Portfolio <contact@paulragueneau.com>'
const GENERIC_ERROR =
    "L'envoi a échoué. Réessaie, ou écris-moi directement par email."
const SUCCESS = 'Merci, ton message a bien été envoyé. Je te réponds vite.'

export type ContactState = {
    status: 'idle' | 'success' | 'error'
    message: string
}

export async function sendContactMessage(
    _prev: ContactState,
    formData: FormData,
): Promise<ContactState> {
    if (isHoneypotFilled(formData.get('company'))) {
        return { status: 'success', message: SUCCESS }
    }

    const hdrs = await headers()
    const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (!checkRateLimit(ip)) {
        return {
            status: 'error',
            message: 'Trop de tentatives. Réessaie dans quelques minutes.',
        }
    }

    const result = validateContactForm({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    })
    if (!result.ok) {
        return { status: 'error', message: result.error }
    }

    // Plafond global (toutes IP confondues) : borne le coût même si la limite
    // par IP est esquivée par spoofing d'en-tête.
    if (!checkGlobalRateLimit()) {
        return {
            status: 'error',
            message: 'Trop de messages en ce moment. Réessaie dans quelques minutes.',
        }
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        return { status: 'error', message: GENERIC_ERROR }
    }

    try {
        const resend = new Resend(apiKey)
        const { name, email, message } = result.data
        const { error } = await resend.emails.send({
            from: FROM,
            to: site.email,
            replyTo: email,
            subject: `Nouveau message de ${name} — portfolio`,
            text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
        })
        if (error) {
            return { status: 'error', message: GENERIC_ERROR }
        }
        return { status: 'success', message: SUCCESS }
    } catch {
        return { status: 'error', message: GENERIC_ERROR }
    }
}
