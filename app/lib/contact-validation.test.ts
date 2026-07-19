import { describe, it, expect } from 'vitest'
import { validateContactForm, isHoneypotFilled, sanitizeDisplayName } from './contact-validation'

const valid = { name: 'Jean Dupont', email: 'jean@example.com', message: 'Bonjour, je vous contacte au sujet de votre profil.' }

describe('validateContactForm', () => {
    it('accepte une saisie valide et renvoie les champs nettoyés', () => {
        const res = validateContactForm({ name: '  Jean Dupont ', email: ' jean@example.com ', message: valid.message })
        expect(res).toEqual({ ok: true, data: { name: 'Jean Dupont', email: 'jean@example.com', message: valid.message } })
    })

    it('rejette un nom trop court', () => {
        const res = validateContactForm({ ...valid, name: 'J' })
        expect(res.ok).toBe(false)
    })

    it('rejette un nom trop long', () => {
        const res = validateContactForm({ ...valid, name: 'x'.repeat(101) })
        expect(res.ok).toBe(false)
    })

    it('rejette un email invalide', () => {
        const res = validateContactForm({ ...valid, email: 'pas-un-email' })
        expect(res.ok).toBe(false)
    })

    it('rejette un message trop court', () => {
        const res = validateContactForm({ ...valid, message: 'court' })
        expect(res.ok).toBe(false)
    })

    it('rejette un message trop long', () => {
        const res = validateContactForm({ ...valid, message: 'x'.repeat(5001) })
        expect(res.ok).toBe(false)
    })

    it('rejette une valeur non-string (null)', () => {
        const res = validateContactForm({ name: null, email: null, message: null })
        expect(res.ok).toBe(false)
    })
})

describe('sanitizeDisplayName', () => {
    it('laisse passer un nom normal', () => {
        expect(sanitizeDisplayName('Jean Dupont')).toBe('Jean Dupont')
    })

    it('conserve les accents et traits d’union', () => {
        expect(sanitizeDisplayName('Anne-Sophie Périé')).toBe('Anne-Sophie Périé')
    })

    it('supprime les retours ligne (injection d’en-tête)', () => {
        expect(sanitizeDisplayName('Jean\r\nBcc: victime@example.com')).toBe('Jean Bcc: victime@example.com')
    })

    it('supprime les chevrons et guillemets qui casseraient l’en-tête From', () => {
        expect(sanitizeDisplayName('Jean <hack@evil.com>')).toBe('Jean hack@evil.com')
        expect(sanitizeDisplayName('Jean "le hacker"')).toBe('Jean le hacker')
    })

    it('condense les espaces multiples', () => {
        expect(sanitizeDisplayName('Jean    Dupont')).toBe('Jean Dupont')
    })

    it('renvoie un repli si le nom est vide après nettoyage', () => {
        expect(sanitizeDisplayName('<<>>')).toBe('Portfolio')
        expect(sanitizeDisplayName('   ')).toBe('Portfolio')
    })
})

describe('isHoneypotFilled', () => {
    it('renvoie true si le champ piège est rempli', () => {
        expect(isHoneypotFilled('ACME Corp')).toBe(true)
    })
    it('renvoie false si vide, espaces seuls, ou null', () => {
        expect(isHoneypotFilled('')).toBe(false)
        expect(isHoneypotFilled('   ')).toBe(false)
        expect(isHoneypotFilled(null)).toBe(false)
    })
})
