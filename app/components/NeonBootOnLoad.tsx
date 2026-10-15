'use client'

import { useEffect } from 'react'
import { igniteNeon } from '@/lib/neon-ignition'

// Joue l'allumage néon au chargement de la page. Lancé après l'hydratation
// pour ne pas modifier le DOM rendu par le serveur avant que React le
// reprenne ; d'ici là, la page reste dans le noir (`data-neon-power`).
export default function NeonBootOnLoad() {
    useEffect(() => {
        igniteNeon()
        document.documentElement.removeAttribute('data-neon-power')
    }, [])

    return null
}
