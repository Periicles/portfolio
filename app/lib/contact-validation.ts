export type ContactInput = {
    name: string
    email: string
    message: string
}

export type ValidationResult =
    | { ok: true; data: ContactInput }
    | { ok: false; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asTrimmed(value: FormDataEntryValue | null): string {
    return typeof value === 'string' ? value.trim() : ''
}

export function isHoneypotFilled(value: FormDataEntryValue | null): boolean {
    return asTrimmed(value).length > 0
}

const DISPLAY_NAME_FALLBACK = 'Portfolio'

/**
 * Neutralise une saisie utilisateur destinée au nom affiché d'un en-tête From.
 * Retire les caractères de contrôle (retours ligne inclus) et ceux qui ont un
 * sens syntaxique dans un en-tête d'email, afin qu'un nom hostile ne puisse pas
 * altérer la structure du message.
 */
export function sanitizeDisplayName(name: string): string {
    const cleaned = name
        .replace(/[\x00-\x1F\x7F]/g, ' ')
        .replace(/[<>"\\]/g, '')
        .replace(/\s+/g, ' ')
        .trim()

    return cleaned.length > 0 ? cleaned : DISPLAY_NAME_FALLBACK
}

export function validateContactForm(raw: {
    name: FormDataEntryValue | null
    email: FormDataEntryValue | null
    message: FormDataEntryValue | null
}): ValidationResult {
    const name = asTrimmed(raw.name)
    const email = asTrimmed(raw.email)
    const message = asTrimmed(raw.message)

    if (name.length < 2 || name.length > 100) {
        return { ok: false, error: "Merci d'indiquer ton nom (2 à 100 caractères)." }
    }
    if (email.length > 254 || !EMAIL_RE.test(email)) {
        return { ok: false, error: "Merci d'indiquer une adresse email valide." }
    }
    if (message.length < 10 || message.length > 5000) {
        return { ok: false, error: 'Le message doit faire entre 10 et 5000 caractères.' }
    }
    return { ok: true, data: { name, email, message } }
}
