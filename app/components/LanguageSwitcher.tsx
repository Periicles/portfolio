import Link from 'next/link'
import { homePath } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

// Lien vers l'autre version du site, présenté comme le bouton de thème.
// Le libellé est rédigé dans la langue cible, à destination de qui la lit.
export default function LanguageSwitcher({ t }: { t: Dictionary['language'] }) {
    return (
        <Link
            href={homePath(t.target)}
            hrefLang={t.target}
            lang={t.target}
            aria-label={t.label}
            title={t.label}
            className="w-10 h-10 rounded-lg border border-hairline bg-paper flex items-center justify-center font-mono text-xs font-semibold text-muted hover:text-ink hover:bg-surface transition-colors"
        >
            {t.short}
        </Link>
    )
}
