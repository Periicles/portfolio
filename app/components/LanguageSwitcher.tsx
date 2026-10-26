import Link from 'next/link'
import { homePath } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

// Lien vers l'autre version du site, présenté comme le bouton de thème.
// Le libellé est rédigé dans la langue cible, à destination de qui la lit.
// En thème sombre, les lettres prennent la couleur d'accent.
// Le nom accessible commence par le texte visible (« EN », WCAG 2.5.3) : le
// libellé complet n'est lu que par les lecteurs d'écran.
export default function LanguageSwitcher({ t }: { t: Dictionary['language'] }) {
    return (
        <Link
            href={homePath(t.target)}
            hrefLang={t.target}
            lang={t.target}
            title={t.label}
            className="w-10 h-10 rounded-lg border border-hairline bg-paper flex items-center justify-center font-mono text-xs font-semibold text-muted dark:text-accent hover:text-ink dark:hover:text-ink hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
            {t.short}
            <span className="sr-only">{` — ${t.label}`}</span>
        </Link>
    )
}
