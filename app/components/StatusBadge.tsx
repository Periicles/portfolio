import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

// Pastille de statut façon enseigne néon : le tube vert de l'accent grésille
// par intermittence, comme une lampe de studio allumée.
export default function StatusBadge({ locale }: { locale: Locale }) {
    const { text, detail } = getDictionary(locale).status

    return (
        <p className="neon-badge mb-8 inline-grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-0.5 rounded-2xl border border-accent px-4 py-2 text-sm text-muted sm:inline-flex sm:rounded-full sm:py-1.5">
            <span aria-hidden className="neon-dot h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span className="text-ink font-medium">{text}</span>
            {/* Sur mobile, le détail passe sur sa propre ligne, aligné sous le
                texte : le séparateur n'est utile que sur une seule ligne. */}
            <span className="col-start-2">
                <span aria-hidden className="hidden sm:inline">· </span>
                {detail}
            </span>
        </p>
    )
}
