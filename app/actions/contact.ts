'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { site } from '@/content/site'
import { defaultLocale, isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import {
    validateContactForm,
    isHoneypotFilled,
    sanitizeDisplayName,
} from '@/lib/contact-validation'
import { checkRateLimit, checkGlobalRateLimit } from '@/lib/rate-limit'

const FROM_ADDRESS = `contact@${site.domain}`

// Le nom affiché reprend celui du visiteur pour identifier l'expéditeur d'un
// coup d'œil en boîte de réception. Le suffixe « via portfolio » rend la
// provenance explicite et coupe court à toute tentative d'usurpation.
function buildFrom(name: string): string {
    return `${sanitizeDisplayName(name)} (via portfolio) <${FROM_ADDRESS}>`
}
export type ContactState = {
    status: 'idle' | 'success' | 'error'
    message: string
}

export async function sendContactMessage(
    _prev: ContactState,
    formData: FormData,
): Promise<ContactState> {
    const localeField = formData.get('locale')
    const t = getDictionary(isLocale(localeField) ? localeField : defaultLocale).messages

    if (isHoneypotFilled(formData.get('company'))) {
        return { status: 'success', message: t.success }
    }

    const hdrs = await headers()
    const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    if (!checkRateLimit(ip)) {
        return {
            status: 'error',
            message: t.rateLimit,
        }
    }

    const result = validateContactForm({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    })
    if (!result.ok) {
        const invalid = {
            name: t.invalidName,
            email: t.invalidEmail,
            message: t.invalidMessage,
        } as const
        return { status: 'error', message: invalid[result.error] }
    }

    // Plafond global (toutes IP confondues) : borne le coût même si la limite
    // par IP est esquivée par spoofing d'en-tête.
    if (!checkGlobalRateLimit()) {
        return {
            status: 'error',
            message: t.globalRateLimit,
        }
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        return { status: 'error', message: t.generic }
    }

    try {
        const resend = new Resend(apiKey)
        const { name, email, message } = result.data
        const { error } = await resend.emails.send({
            from: buildFrom(name),
            to: site.email,
            replyTo: email,
            subject: `Nouveau message de ${name} — portfolio`,
            text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
        })
        if (error) {
            return { status: 'error', message: t.generic }
        }
        return { status: 'success', message: t.success }
    } catch {
        return { status: 'error', message: t.generic }
    }
}
