import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

// Pastille de statut façon enseigne néon : le tube vert de l'accent grésille
// par intermittence, comme une lampe de studio allumée.
export default function StatusBadge({ locale }: { locale: Locale }) {
    const { text, detail } = getDictionary(locale).status

    return (
        <p className="neon-badge mb-8 inline-grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-0.5 rounded-2xl border px-4 py-2 text-[13px] text-muted @xl:inline-flex @xl:rounded-full @xl:py-1.5 @xl:text-sm">
            <span aria-hidden className="neon-dot h-2 w-2 shrink-0 self-start mt-1.5 rounded-full bg-accent @xl:self-auto @xl:mt-0" />
            <span className="text-ink font-medium">{text}</span>
            {/* Quand la place manque (mobile, tablette avec sidebar), le détail passe sur sa propre ligne, aligné sous le
                texte : le séparateur n'est utile que sur une seule ligne. */}
            <span className="col-start-2">
                <span aria-hidden className="hidden @xl:inline">· </span>
                {detail}
            </span>
        </p>
    )
}
