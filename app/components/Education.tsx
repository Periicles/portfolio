import { certifications, education } from '@/content/education'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import SectionEyebrow from './SectionEyebrow'

export default function Education({ locale }: { locale: Locale }) {
    const t = getDictionary(locale).education

    return (
        <section id="education" aria-labelledby="education-heading" className="scroll-mt-32 py-20 md:scroll-mt-24 md:py-28">
            <SectionEyebrow index={3}>{t.eyebrow}</SectionEyebrow>
            <h2 id="education-heading" className="mb-12 font-display text-[clamp(2.5rem,9vw,4.5rem)] font-bold uppercase leading-[0.98] tracking-[-0.04em] text-ink">
                {t.heading}
            </h2>

            <ol className="border-t border-hairline">
                {education[locale].map((item) => (
                    <li
                        key={`${item.school}-${item.degree}`}
                        className="grid gap-2 border-b border-hairline py-6 md:grid-cols-[15rem_1fr] md:gap-10 md:py-8"
                    >
                        <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted md:pt-1.5">{item.period}</p>
                        <div>
                            <h3 className="font-display text-xl font-bold leading-tight tracking-[-0.02em] text-ink md:text-2xl">
                                {item.url ? (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline decoration-hairline decoration-2 underline-offset-4 transition-colors hover:text-sunset-strong hover:decoration-sunset"
                                    >
                                        {item.degree}
                                    </a>
                                ) : (
                                    item.degree
                                )}
                            </h3>
                            <p className="mt-1 font-medium text-accent-strong">{item.school}</p>
                            {item.detail && <p className="mt-2 text-sm text-muted">{item.detail}</p>}
                            {item.diploma && <p className="mt-1 font-mono text-xs text-muted">{item.diploma}</p>}
                        </div>
                    </li>
                ))}
            </ol>

            <div className="mt-12">
                <h3 className="mb-4 font-display text-lg font-bold text-ink">{t.certificationsHeading}</h3>
                <ul className="flex flex-wrap gap-2">
                    {certifications[locale].map((cert) => (
                        <li key={cert.name} className="chip normal-case tracking-normal">
                            <span className="mr-1 font-semibold text-ink">{cert.name}</span> · {cert.detail}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
