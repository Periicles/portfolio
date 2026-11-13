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
import { checkRateLimit, checkGlobalRateLimit, checkSharedRateLimit } from '@/lib/rate-limit'

const FROM_ADDRESS = `contact@${site.domain}`

// Le nom affiché reprend celui du visiteur pour identifier l'expéditeur d'un
// coup d'œil en boîte de réception. Le suffixe « via portfolio » rend la
// provenance explicite et coupe court à toute tentative d'usurpation.
function buildFrom(name: string): string {
    return `${sanitizeDisplayName(name)} (via portfolio) <${FROM_ADDRESS}>`
}
// Trace serveur d'un envoi qui échoue, pour qu'une panne (clé expirée, quota
// atteint, domaine non vérifié) apparaisse dans les erreurs de production au
// lieu de passer inaperçue. Jamais de donnée du visiteur : seulement le code
// d'erreur Resend et le statut HTTP, ou le type de l'exception.
function logSendFailure(reason: string, details: Record<string, unknown> = {}): void {
    console.error('[contact] échec de l’envoi', { reason, ...details })
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

    // Limite par IP partagée entre les instances (pare-feu Vercel). Vérifiée
    // après la validation : seuls les messages réellement envoyables comptent.
    if (!(await checkSharedRateLimit(hdrs))) {
        return {
            status: 'error',
            message: t.rateLimit,
        }
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
        logSendFailure('missing_api_key')
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
            logSendFailure('resend_error', { code: error.name, status: error.statusCode })
            return { status: 'error', message: t.generic }
        }
        return { status: 'success', message: t.success }
    } catch (err) {
        logSendFailure('exception', { type: err instanceof Error ? err.name : typeof err })
        return { status: 'error', message: t.generic }
    }
}
