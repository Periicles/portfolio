export const locales = ['fr', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export function isLocale(value: unknown): value is Locale {
    return typeof value === 'string' && (locales as readonly string[]).includes(value)
}

/** Chemin de la page d'accueil : le français est servi à la racine. */
export function homePath(locale: Locale): string {
    return locale === defaultLocale ? '/' : `/${locale}`
}

export const ogLocales: Record<Locale, string> = {
    fr: 'fr_FR',
    en: 'en_US',
}
