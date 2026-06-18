'use client'

import { useEffect, useRef, useState } from 'react'

export function useActiveSection(sectionIds: readonly string[]): string {
    const [active, setActive] = useState<string>('')
    const visibility = useRef<Record<string, number>>({})
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
                    visibility.current[entry.target.id] = entry.isIntersecting
                        ? entry.intersectionRatio
                        : 0
                }

                let next = ''
                let maxRatio = 0
                for (const el of elements) {
                    const ratio = visibility.current[el.id] ?? 0
                    if (ratio > maxRatio) {
                        maxRatio = ratio
                        next = el.id
                    }
                }

                if (next && next !== activeRef.current) {
                    activeRef.current = next
                    setActive(next)
                }
            },
            {
                root: null,
                rootMargin: '-35% 0px -35% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
        )

        elements.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [sectionIds])

    return active
}
