import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './icons/GitHubIcon'
import { projects } from '@/content/projects'
import type { Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import SectionEyebrow from './SectionEyebrow'

export default function Projects({ locale }: { locale: Locale }) {
    const t = getDictionary(locale).projects

    return (
        <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-32 py-20 md:scroll-mt-24 md:py-28">
            <SectionEyebrow index={4}>{t.eyebrow}</SectionEyebrow>
            <h2 id="projects-heading" className="mb-12 font-display text-[clamp(2.5rem,9vw,4.5rem)] font-bold uppercase leading-[0.98] tracking-[-0.04em] text-ink">
                {t.heading}
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
                {projects[locale].map((project, index) => (
                    <article
                        key={project.title}
                        className="card group relative flex flex-col overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-8"
                    >
                        <span aria-hidden className="project-number" data-number={String(index + 1).padStart(2, '0')} />

                        <div className="relative flex flex-1 flex-col">
                            <h3 className="mb-3 pr-16 font-display text-2xl font-bold tracking-[-0.03em] text-ink md:text-3xl">
                                {project.link ? (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="transition-colors hover:text-sunset-strong"
                                    >
                                        {project.title}
                                    </a>
                                ) : (
                                    project.title
                                )}
                            </h3>
                            <p className="mb-6 leading-relaxed text-muted">{project.description}</p>

                            <div className="mt-auto flex items-end justify-between gap-4">
                                <ul className="flex flex-wrap gap-1.5">
                                    {project.technologies.map((tech) => (
                                        <li key={tech} className="chip">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex shrink-0 gap-2">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="icon-pill"
                                            aria-label={`${t.repoLabel} ${project.title}`}
                                        >
                                            <GitHubIcon />
                                        </a>
                                    )}
                                    {project.link && project.link !== project.github && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="icon-pill"
                                            aria-label={`${t.demoLabel} ${project.title}`}
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
