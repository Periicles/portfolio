import { describe, it, expect } from 'vitest'
import { validateContactForm, isHoneypotFilled } from './contact-validation'

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
