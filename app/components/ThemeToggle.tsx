'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import type { Dictionary } from '@/i18n/dictionaries'
import { igniteNeon } from '@/lib/neon-ignition'

// L'icône et le libellé suivent la classe `.dark` posée par next-themes avant
// le premier rendu : pas d'état « non monté », donc pas de flash au chargement.
// Au clic, la lune pivote et s'efface pendant que le soleil apparaît (et
// inversement) et la page se rallume comme un néon (voir `igniteNeon`).
// Animations coupées si l'utilisateur limite les mouvements.
export default function ThemeToggle({ t }: { t: Dictionary['theme'] }) {
    const { resolvedTheme, setTheme } = useTheme()

    function toggle() {
        igniteNeon()
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    return (
        <button
            type="button"
            onClick={toggle}
            title={t.toggle}
            className="relative overflow-hidden w-10 h-10 rounded-lg border border-hairline bg-paper flex items-center justify-center hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
            <Moon
                aria-hidden
                className="absolute w-4 h-4 text-muted transition-all duration-500 ease-out rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-0 dark:opacity-0 motion-reduce:transition-none"
            />
            <Sun
                aria-hidden
                className="absolute w-4 h-4 text-accent transition-all duration-500 ease-out rotate-90 scale-0 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100 dark:drop-shadow-[0_0_4px_var(--accent)] motion-reduce:transition-none"
            />
            <span className="sr-only dark:hidden">{t.toDark}</span>
            <span className="sr-only hidden dark:inline">{t.toLight}</span>
        </button>
    )
}
