'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import type { Dictionary } from '@/i18n/dictionaries'

// L'icône et le libellé suivent la classe `.dark` posée par next-themes avant
// le premier rendu : pas d'état « non monté », donc pas de flash au chargement.
export default function ThemeToggle({ t }: { t: Dictionary['theme'] }) {
    const { resolvedTheme, setTheme } = useTheme()

    return (
        <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            title={t.toggle}
            className="relative w-10 h-10 rounded-lg border border-hairline bg-paper flex items-center justify-center hover:bg-surface transition-colors"
        >
            <Moon aria-hidden className="w-4 h-4 text-muted dark:hidden" />
            <Sun aria-hidden className="hidden w-4 h-4 text-accent dark:block" />
            <span className="sr-only dark:hidden">{t.toDark}</span>
            <span className="sr-only hidden dark:inline">{t.toLight}</span>
        </button>
    )
}
