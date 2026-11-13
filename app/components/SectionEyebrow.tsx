export default function SectionEyebrow({
    index,
    children,
}: {
    index: number
    children: string
}) {
    return (
        <p aria-hidden="true" className="eyebrow mb-6">
            <span className="eyebrow-dot" />
            {String(index).padStart(2, '0')} — {children}
        </p>
    )
}
