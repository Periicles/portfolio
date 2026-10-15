import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'
import { Mail } from 'lucide-react'
import { site } from '@/content/site'
import SectionEyebrow from './SectionEyebrow'
import ContactForm from './ContactForm'

export default function Contact() {
    return (
        <section id="contact" aria-labelledby="contact-heading" className="py-16 scroll-mt-24 md:scroll-mt-16 border-t border-hairline">
            <SectionEyebrow index={5}>Contact</SectionEyebrow>
            <h2 id="contact-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-8">
                Entrons en contact
            </h2>

            <div className="space-y-6">
                <p className="text-muted leading-relaxed max-w-2xl">
                    Je suis actuellement ouvert à de nouvelles opportunités et je serais ravi d&apos;échanger avec vous. Que vous ayez une question, une proposition de projet ou simplement envie de discuter, n&apos;hésitez pas à me contacter.
                </p>

                <p className="text-muted leading-relaxed max-w-2xl">
                    Je suis particulièrement intéressé par des missions autour d&apos;applications web évolutives, d&apos;API REST ou de solutions frontend innovantes. Discutons de la façon dont je peux contribuer à votre équipe.
                </p>

                <div className="pt-8">
                    <ContactForm />
                    <p className="mt-4 text-sm text-muted">
                        Tu préfères ton client mail ?{' '}
                        <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 text-accent-strong hover:underline">
                            Écris-moi directement
                            <Mail className="w-3.5 h-3.5" />
                        </a>
                    </p>
                </div>

                <div className="pt-12 border-t border-hairline">
                    <h3 className="text-lg font-semibold text-ink mb-4">Autres moyens de me contacter :</h3>
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
                    </div>
                </div>
            </div>
        </section>
    )
}
