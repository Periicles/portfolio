import { Download } from 'lucide-react'

type CvDownloadProps = {
    label: string
    href: string
    fileName: string
    compact?: boolean
}

export default function CvDownload({ label, href, fileName, compact = false }: CvDownloadProps) {
    if (compact) {
        return (
            <a
                href={href}
                download={fileName}
                className="text-muted hover:text-ink transition-colors"
                aria-label={`${label} (PDF)`}
            >
                <Download className="w-5 h-5" />
            </a>
        )
    }

    return (
        <a
            href={href}
            download={fileName}
            className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent-strong text-sm font-semibold rounded hover:bg-accent hover:text-ink transition-colors"
        >
            <Download className="w-4 h-4" />
            {label}
            <span className="sr-only"> (PDF)</span>
        </a>
    )
}
