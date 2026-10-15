import { experiences } from '@/content/experiences'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import SectionEyebrow from './SectionEyebrow'

export default function Experience({ locale }: { locale: Locale }) {
    const t = getDictionary(locale).experience

    return (
        <section id="experience" aria-labelledby="experience-heading" className="py-16 scroll-mt-24 md:scroll-mt-16 border-t border-hairline">
            <SectionEyebrow index={2}>{t.eyebrow}</SectionEyebrow>
            <h2 id="experience-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-8">
                {t.heading}
            </h2>

            <div className="space-y-12">
                {experiences[locale].map((exp) => (
                    <div key={exp.company} className="relative">
                        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                            <div className="md:w-48 mb-2 md:mb-0">
                                <h3 className="text-lg font-semibold text-ink">
                                    {exp.title}
                                </h3>
                                <p className="text-accent-strong">
                                    {exp.company}
                                </p>
                                <p className="text-sm text-muted font-mono mt-1">
                                    {exp.period}
                                </p>
                                {exp.contract && (
                                    <p className="text-xs text-muted mt-1">
                                        {exp.contract}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1">
                                <ul className="list-disc pl-5 text-muted leading-relaxed mb-4 space-y-1">
                                    {exp.description.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs text-muted font-mono bg-surface px-2 py-1 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}
