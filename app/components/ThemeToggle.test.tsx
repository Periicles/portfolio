// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { getDictionary } from '@/i18n/dictionaries'
import ThemeToggle from './ThemeToggle'

const mocks = vi.hoisted(() => ({
    theme: { resolved: 'light' as string | undefined },
    setTheme: vi.fn(),
    igniteNeon: vi.fn(),
}))

vi.mock('next-themes', () => ({
    useTheme: () => ({ resolvedTheme: mocks.theme.resolved, setTheme: mocks.setTheme }),
}))
vi.mock('@/lib/neon-ignition', () => ({ igniteNeon: mocks.igniteNeon }))

const t = getDictionary('fr').theme

beforeEach(() => {
    mocks.setTheme.mockClear()
    mocks.igniteNeon.mockClear()
})

describe('ThemeToggle', () => {
    it('annonce les deux bascules possibles et porte le libellé du bouton', () => {
        render(<ThemeToggle t={t} />)

        const button = screen.getByRole('button')
        expect(button.getAttribute('title')).toBe(t.toggle)
        expect(button.textContent).toContain(t.toDark)
        expect(button.textContent).toContain(t.toLight)
    })

    it('passe au thème sombre depuis le clair, en rallumant la page', () => {
        mocks.theme.resolved = 'light'
        render(<ThemeToggle t={t} />)

        const button = screen.getByRole('button')
        fireEvent.click(button)

        expect(mocks.igniteNeon).toHaveBeenCalledWith(button)
        expect(mocks.setTheme).toHaveBeenCalledWith('dark')
    })

    it('revient au thème clair depuis le sombre', () => {
        mocks.theme.resolved = 'dark'
        render(<ThemeToggle t={t} />)

        fireEvent.click(screen.getByRole('button'))
        expect(mocks.setTheme).toHaveBeenCalledWith('light')
    })
})
