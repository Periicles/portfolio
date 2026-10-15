import { skillGroups } from '@/content/skills'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import StatusBadge from './StatusBadge'
import SectionEyebrow from './SectionEyebrow'

export default function About({ locale }: { locale: Locale }) {
    const t = getDictionary(locale).about

    return (
        <section id="about" aria-labelledby="about-heading" className="pt-0 pb-16 md:pt-16 scroll-mt-24 md:scroll-mt-16">
            <StatusBadge locale={locale} />
            <SectionEyebrow index={1}>{t.eyebrow}</SectionEyebrow>
            <h2 id="about-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-8">
                {t.heading}
            </h2>

            <div className="space-y-6 text-muted leading-relaxed">
                {t.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </div>

            <div className="mt-12">
                <h3 className="text-lg font-semibold text-ink mb-6">{t.skillsHeading}</h3>
                <dl className="grid gap-6 sm:grid-cols-2">
                    {skillGroups[locale].map((group) => (
                        <div key={group.label}>
                            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-accent-strong mb-3">
                                {group.label}
                            </dt>
                            <dd className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="text-xs text-muted font-mono bg-surface px-2 py-1 rounded"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
