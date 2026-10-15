import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'
import { Download, Mail } from 'lucide-react'
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
                    En alternance chez Ceva Santé Animale jusqu&apos;en septembre 2027, je reste ouvert aux échanges et aux opportunités pour la suite de mon parcours. Que vous ayez une question, une proposition ou simplement envie de discuter, n&apos;hésitez pas à me contacter.
                </p>

                <p className="text-muted leading-relaxed max-w-2xl">
                    Je suis particulièrement intéressé par les applications web évolutives, les API REST et le développement assisté par IA. Discutons de la façon dont je peux contribuer à votre équipe.
                </p>

                <div className="pt-8">
                    <ContactForm />
                    <p className="mt-4 text-sm text-muted">
                        Vous préférez votre client mail ?{' '}
                        <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 text-accent-strong hover:underline">
                            Écrivez-moi directement
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

                        <a
                            href={site.cv.href}
                            download={site.cv.fileName}
                            className="flex items-center gap-2 text-muted hover:text-accent-strong transition-colors"
                        >
                            <Download className="w-5 h-5" />
                            CV (PDF)
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
