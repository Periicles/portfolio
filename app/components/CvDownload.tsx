import { Download } from 'lucide-react'
import { site } from '@/content/site'

const label = 'Télécharger le CV'

export default function CvDownload({ compact = false }: { compact?: boolean }) {
    if (compact) {
        return (
            <a
                href={site.cv.href}
                download={site.cv.fileName}
                className="text-muted hover:text-ink transition-colors"
                aria-label={`${label} (PDF)`}
            >
                <Download className="w-5 h-5" />
            </a>
        )
    }

    return (
        <a
            href={site.cv.href}
            download={site.cv.fileName}
            className="inline-flex items-center gap-2 px-4 py-2 border border-accent text-accent-strong text-sm font-semibold rounded hover:bg-accent hover:text-ink transition-colors"
        >
            <Download className="w-4 h-4" />
            {label}
            <span className="sr-only"> (PDF)</span>
        </a>
    )
}
