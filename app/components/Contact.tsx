import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'
import { Download, Mail } from 'lucide-react'
import { site } from '@/content/site'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import SectionEyebrow from './SectionEyebrow'
import ContactForm from './ContactForm'

export default function Contact({ locale }: { locale: Locale }) {
    const dict = getDictionary(locale)
    const t = dict.contact

    return (
        <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-32 py-20 md:scroll-mt-24 md:py-28">
            <SectionEyebrow index={5}>{t.eyebrow}</SectionEyebrow>
            <h2 id="contact-heading" className="mb-12 font-display text-[clamp(2.5rem,9vw,4.5rem)] font-bold uppercase leading-[0.98] tracking-[-0.04em] text-ink">
                {t.heading}
                <span aria-hidden className="text-sunset-strong">.</span>
            </h2>

            <div className="grid gap-10 md:grid-cols-12 md:gap-12">
                <div className="space-y-5 md:col-span-5">
                    {t.intro.map((paragraph) => (
                        <p key={paragraph} className="leading-relaxed text-muted">
                            {paragraph}
                        </p>
                    ))}

                    <div className="pt-6">
                        <h3 className="mb-4 font-display text-lg font-bold text-ink">{t.otherHeading}</h3>
                        <div className="flex flex-wrap gap-2">
                            <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="capsule-outline">
                                <GitHubIcon />
                                GitHub
                            </a>
                            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="capsule-outline">
                                <LinkedInIcon />
                                LinkedIn
                            </a>
                            <a href={dict.cv.href} download={dict.cv.fileName} className="capsule-outline">
                                <Download className="h-4 w-4" />
                                {dict.cv.short}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="card p-6 md:col-span-7 md:p-8">
                    <ContactForm locale={locale} t={dict.form} />
                    <p className="mt-6 text-sm text-muted">
                        {t.mailPrompt}{' '}
                        <a
                            href={`mailto:${site.email}`}
                            className="inline-flex items-center gap-1 font-medium text-accent-strong underline-offset-4 hover:underline"
                        >
                            {t.mailLink}
                            <Mail className="h-3.5 w-3.5" />
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}
