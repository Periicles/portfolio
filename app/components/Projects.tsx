import { ExternalLink } from 'lucide-react'
import { GitHubIcon } from './icons/GitHubIcon'
import { projects } from '@/content/projects'
import SectionEyebrow from './SectionEyebrow'

export default function Projects() {
    return (
        <section id="projects" aria-labelledby="projects-heading" className="py-16 scroll-mt-24 md:scroll-mt-16 border-t border-hairline">
            <SectionEyebrow index={4}>Projets</SectionEyebrow>
            <h2 id="projects-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-8">
                Quelques réalisations
            </h2>

            <div className="space-y-12">
                {projects.map((project) => {
                    return (
                        <article key={project.title} className="relative">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-12 md:col-span-8">
                                    <h3 className="text-2xl font-semibold text-ink mb-2 flex flex-wrap items-center gap-3">
                                        {project.link ? (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="transition-colors hover:text-accent-strong"
                                            >
                                                {project.title}
                                            </a>
                                        ) : (
                                            <span>{project.title}</span>
                                        )}
                                    </h3>
                                    <p className="text-muted mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-mono bg-surface text-muted rounded"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-12 md:col-span-4 flex justify-end space-x-4">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted hover:text-ink transition-colors"
                                            aria-label={`Dépôt du projet ${project.title}`}
                                        >
                                            <GitHubIcon />
                                        </a>
                                    )}
                                    {project.link && project.link !== project.github && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted hover:text-ink transition-colors"
                                            aria-label={`Démo du projet ${project.title}`}
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
