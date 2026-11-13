import { ArrowRight } from 'lucide-react'
import { skillGroups } from '@/content/skills'
import { site } from '@/content/site'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import StatusBadge from './StatusBadge'
import SectionEyebrow from './SectionEyebrow'

export default function About({ locale }: { locale: Locale }) {
    const dict = getDictionary(locale)
    const t = dict.about
    const [firstName, ...lastNames] = site.name.split(' ')

    return (
        <section id="about" aria-labelledby="about-heading" className="@container scroll-mt-32 pb-24 md:scroll-mt-24 md:pb-32">
            <StatusBadge locale={locale} />

            {/* Titre géant façon affiche : le saut de ligne reste précédé d'une espace
                pour que le nom accessible soit « Paul Ragueneau ». */}
            <h1 className="font-display text-[clamp(2.75rem,14vw,9rem)] font-bold uppercase leading-[0.84] tracking-[-0.05em] text-ink">
                {firstName}{' '}
                <br />
                {lastNames.join(' ')}
                <span aria-hidden className="text-sunset-strong">.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-snug text-ink/80 md:text-2xl">
                {dict.meta.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#contact" className="capsule">
                    {dict.nav.items.contact}
                    <ArrowRight aria-hidden className="h-4 w-4" />
                </a>
                <a href="#projects" className="capsule-outline">
                    {dict.nav.items.projects}
                </a>
                <p className="w-full font-mono text-xs uppercase tracking-[0.12em] text-muted sm:ml-3 sm:w-auto">
                    {dict.meta.ogTagline}
                </p>
            </div>

            <div className="mt-24 grid gap-10 md:mt-32 md:grid-cols-12 md:gap-12">
                <div className="md:col-span-7">
                    <SectionEyebrow index={1}>{t.eyebrow}</SectionEyebrow>
                    <h2 id="about-heading" className="mb-8 font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-ink md:text-4xl">
                        {t.heading}
                    </h2>
                    <div className="space-y-5 leading-relaxed text-muted">
                        {t.paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>

                <div className="card self-start p-6 md:col-span-5 md:p-7">
                    <h3 className="mb-6 font-display text-lg font-bold tracking-[-0.01em] text-ink">{t.skillsHeading}</h3>
                    <dl className="space-y-5">
                        {skillGroups[locale].map((group) => (
                            <div key={group.label}>
                                <dt className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-strong">
                                    {group.label}
                                </dt>
                                <dd className="flex flex-wrap gap-1.5">
                                    {group.items.map((item) => (
                                        <span key={item} className="chip">
                                            {item}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}
