import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'
import { MailIcon } from './icons/MailIcon'
import { site } from '@/content/site'

export default function Contact() {
    return (
        <section id="contact" aria-labelledby="contact-heading" className="py-16 scroll-mt-24 md:scroll-mt-16">
            <p aria-hidden="true" className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">04. Contact</p>
            <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Entrons en contact
            </h2>

            <div className="space-y-6">
                <p className="text-gray-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    Je suis actuellement ouvert à de nouvelles opportunités et je serais ravi d&apos;échanger avec vous. Que vous ayez une question, une proposition de projet ou simplement envie de discuter, n&apos;hésitez pas à me contacter.
                </p>

                <p className="text-gray-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    Je suis particulièrement intéressé par des missions autour d&apos;applications web évolutives, d&apos;architectures microservices ou de solutions frontend innovantes. Discutons de la façon dont je peux contribuer à votre équipe.
                </p>

                <div className="pt-8">
                    <a
                        href={`mailto:${site.email}`}
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-green-600 text-green-600 dark:text-green-400 font-semibold rounded hover:bg-green-600 hover:text-white transition-all duration-300"
                    >
                        Écrire un message
                        <MailIcon />
                    </a>
                </div>

                <div className="pt-12 border-t border-gray-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Autres moyens de me contacter :</h3>
                    <div className="flex flex-wrap gap-6">
                        <a
                            href={site.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        >
                            <GitHubIcon />
                            GitHub
                        </a>

                        <a
                            href={site.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
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
