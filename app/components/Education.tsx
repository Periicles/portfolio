import { certifications, education } from '@/content/education'
import SectionEyebrow from './SectionEyebrow'

export default function Education() {
    return (
        <section id="education" aria-labelledby="education-heading" className="py-16 scroll-mt-24 md:scroll-mt-16 border-t border-hairline">
            <SectionEyebrow index={3}>Formation</SectionEyebrow>
            <h2 id="education-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-8">
                Mon cursus
            </h2>

            <ol className="space-y-8">
                {education.map((item) => (
                    <li key={`${item.school}-${item.degree}`} className="flex flex-col md:flex-row md:items-baseline md:space-x-8">
                        <p className="md:w-48 shrink-0 text-sm text-muted font-mono mb-1 md:mb-0">
                            {item.period}
                        </p>
                        <div>
                            <h3 className="text-lg font-semibold text-ink">
                                {item.degree}
                            </h3>
                            <p className="text-accent-strong">{item.school}</p>
                            {item.detail && (
                                <p className="text-sm text-muted mt-1">{item.detail}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>

            <div className="mt-10">
                <h3 className="text-lg font-semibold text-ink mb-3">Certifications</h3>
                <ul className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                        <li
                            key={cert.name}
                            className="text-xs text-muted font-mono bg-surface px-3 py-1 rounded"
                        >
                            <span className="text-ink font-semibold">{cert.name}</span> · {cert.detail}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
