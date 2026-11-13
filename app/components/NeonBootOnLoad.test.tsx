// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import NeonBootOnLoad from './NeonBootOnLoad'

const { igniteNeon } = vi.hoisted(() => ({ igniteNeon: vi.fn() }))
vi.mock('@/lib/neon-ignition', () => ({ igniteNeon }))

describe('NeonBootOnLoad', () => {
    it('lance l’allumage après l’hydratation puis retire le voile du chargement', () => {
        document.documentElement.setAttribute('data-neon-power', '')

        const { container } = render(<NeonBootOnLoad />)

        expect(igniteNeon).toHaveBeenCalledOnce()
        expect(document.documentElement.hasAttribute('data-neon-power')).toBe(false)
        expect(container.innerHTML).toBe('')
    })
})
