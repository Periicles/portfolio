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
        <section id="contact" aria-labelledby="contact-heading" className="py-16 scroll-mt-24 md:scroll-mt-16 border-t border-hairline">
            <SectionEyebrow index={5}>{t.eyebrow}</SectionEyebrow>
            <h2 id="contact-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-8">
                {t.heading}
            </h2>

            <div className="space-y-6">
                {t.intro.map((paragraph) => (
                    <p key={paragraph} className="text-muted leading-relaxed max-w-2xl">
                        {paragraph}
                    </p>
                ))}

                <div className="pt-8">
                    <ContactForm locale={locale} t={dict.form} />
                    <p className="mt-4 text-sm text-muted">
                        {t.mailPrompt}{' '}
                        <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 text-accent-strong hover:underline">
                            {t.mailLink}
                            <Mail className="w-3.5 h-3.5" />
                        </a>
                    </p>
                </div>

                <div className="pt-12 border-t border-hairline">
                    <h3 className="text-lg font-semibold text-ink mb-4">{t.otherHeading}</h3>
                    <div className="flex flex-wrap gap-6">
                        <a
                            href={site.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted hover:text-accent-strong transition-colors"
                        >
                            <GitHubIcon />
                            GitHub
                        </a>

                        <a
                            href={site.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-muted hover:text-accent-strong transition-colors"
                        >
                            <LinkedInIcon />
                            LinkedIn
                        </a>

                        <a
                            href={dict.cv.href}
                            download={dict.cv.fileName}
                            className="flex items-center gap-2 text-muted hover:text-accent-strong transition-colors"
                        >
                            <Download className="w-5 h-5" />
                            {dict.cv.short}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
