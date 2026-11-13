'use client'

import { useEffect, useRef, useState } from 'react'

// Ligne de repère fine placée à 40 % de la hauteur d'écran : la section active
// est celle qui la traverse. Comparer des ratios d'intersection désavantagerait
// les sections plus hautes que la fenêtre, dont le ratio reste toujours faible.
const READING_LINE_MARGIN = '-40% 0px -59% 0px'

export function useActiveSection(sectionIds: readonly string[]): string {
    const [active, setActive] = useState<string>('')
    const crossing = useRef<Record<string, boolean>>({})
    const activeRef = useRef<string>('')

    useEffect(() => {
        const elements = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => Boolean(el))

        if (elements.length === 0) {
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    crossing.current[entry.target.id] = entry.isIntersecting
                }

                // Hors de toute section (pied de page), la dernière reste active.
                const next = elements.find((el) => crossing.current[el.id])?.id
                if (next && next !== activeRef.current) {
                    activeRef.current = next
                    setActive(next)
                }
            },
            { root: null, rootMargin: READING_LINE_MARGIN, threshold: 0 },
        )

        elements.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [sectionIds])

    return active
}
