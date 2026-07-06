export default function SectionEyebrow({
    index,
    children,
}: {
    index: number
    children: string
}) {
    return (
        <p
            aria-hidden="true"
            className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.15em] text-accent-strong"
        >
            <span className="h-px w-8 bg-accent" />
            {String(index).padStart(2, '0')} — {children}
        </p>
    )
}
