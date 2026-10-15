import { site } from '@/content/site'

// Pastille de statut façon enseigne néon : le tube vert de l'accent grésille
// par intermittence, comme une lampe de studio allumée.
export default function StatusBadge() {
    const { text, detail } = site.status

    return (
        <p className="neon-badge mb-8 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-accent px-4 py-1.5 text-sm text-muted">
            <span aria-hidden className="neon-dot h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span className="text-ink font-medium">{text}</span>
            <span>· {detail}</span>
        </p>
    )
}
