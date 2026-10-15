import { site } from '@/content/site'

// Voyant « ON AIR » de studio : la plaque s'allume en rouge et rayonne
// doucement pour signaler que le poste est en cours.
export default function OnAirBadge() {
    const { label, text, detail } = site.status

    return (
        <p className="mb-8 inline-flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
            <span className="on-air-sign inline-flex items-center gap-2 rounded-md border-2 border-on-air bg-on-air px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
                <span aria-hidden className="on-air-dot h-1.5 w-1.5 rounded-full bg-white" />
                {label}
            </span>
            <span>
                <span className="text-ink font-medium">{text}</span> · {detail}
            </span>
        </p>
    )
}
