import { Download } from 'lucide-react'

type CvDownloadProps = {
    label: string
    href: string
    fileName: string
}

export default function CvDownload({ label, href, fileName }: CvDownloadProps) {
    return (
        <a href={href} download={fileName} className="capsule h-10 px-4" aria-label={`${label} (PDF)`}>
            <Download aria-hidden className="h-4 w-4" />
            <span aria-hidden className="hidden sm:inline">{label}</span>
            <span aria-hidden className="sm:hidden">CV</span>
        </a>
    )
}
