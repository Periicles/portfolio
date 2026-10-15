import { describe, it, expect } from 'vitest'
import { defaultLocale, homePath, isLocale, locales } from './config'
import { getDictionary } from './dictionaries'

function shape(value: unknown): unknown {
    if (Array.isArray(value)) return value.map(shape)
    if (value && typeof value === 'object') {
        return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, shape(v)]))
    }
    return typeof value
}

describe('config i18n', () => {
    it('sert la langue par défaut à la racine', () => {
        expect(homePath(defaultLocale)).toBe('/')
        expect(homePath('en')).toBe('/en')
    })

    it('reconnaît uniquement les langues prises en charge', () => {
        expect(isLocale('fr')).toBe(true)
        expect(isLocale('en')).toBe(true)
        expect(isLocale('de')).toBe(false)
        expect(isLocale(undefined)).toBe(false)
    })
})

describe('dictionnaires', () => {
    it('ont exactement la même structure dans toutes les langues', () => {
        const [reference, ...others] = locales.map((locale) => shape(getDictionary(locale)))
        for (const other of others) expect(other).toEqual(reference)
    })

    it('pointent le sélecteur de langue vers une autre langue', () => {
        for (const locale of locales) {
            const target = getDictionary(locale).language.target
            expect(isLocale(target)).toBe(true)
            expect(target).not.toBe(locale)
        }
    })
})
