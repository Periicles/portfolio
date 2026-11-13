import { experiences } from '@/content/experiences'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import SectionEyebrow from './SectionEyebrow'

export default function Experience({ locale }: { locale: Locale }) {
    const t = getDictionary(locale).experience

    return (
        <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-32 py-20 md:scroll-mt-24 md:py-28">
            <SectionEyebrow index={2}>{t.eyebrow}</SectionEyebrow>
            <h2 id="experience-heading" className="mb-12 font-display text-[clamp(2.5rem,9vw,4.5rem)] font-bold uppercase leading-[0.98] tracking-[-0.04em] text-ink">
                {t.heading}
            </h2>

            <div className="space-y-4">
                {experiences[locale].map((exp) => (
                    <article key={exp.company} className="card grid gap-6 p-6 md:grid-cols-[15rem_1fr] md:gap-10 md:p-8">
                        <div>
                            <p className="chip mb-4">{exp.period}</p>
                            <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.02em] text-ink">
                                {exp.title}
                            </h3>
                            <p className="mt-1 font-medium text-accent-strong">{exp.company}</p>
                            {exp.contract && <p className="mt-1 text-xs text-muted">{exp.contract}</p>}
                        </div>

                        <div>
                            <ul className="mb-6 space-y-2 leading-relaxed text-muted">
                                {exp.description.map((item) => (
                                    <li key={item} className="relative pl-5">
                                        <span aria-hidden className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-sunset" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <ul className="flex flex-wrap gap-1.5">
                                {exp.technologies.map((tech) => (
                                    <li key={tech} className="chip">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
