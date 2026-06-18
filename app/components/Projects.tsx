import { ExternalLinkIcon } from './icons/ExternalLinkIcon'
import { GitHubIcon } from './icons/GitHubIcon'
import { projects } from '@/content/projects'

export default function Projects() {
    return (
        <section id="projects" aria-labelledby="projects-heading" className="py-16 scroll-mt-24 md:scroll-mt-16">
            <p aria-hidden="true" className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">03. Projets</p>
            <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Quelques réalisations
            </h2>

            <div className="space-y-12">
                {projects.map((project) => {
                    const isInProgress = project.status === "in-progress"
                    return (
                        <article key={project.title} className="relative">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-12 md:col-span-8">
                                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-2 flex flex-wrap items-center gap-3">
                                        {project.link ? (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="transition-colors hover:text-teal-500 dark:hover:text-teal-400"
                                            >
                                                {project.title}
                                            </a>
                                        ) : (
                                            <span>{project.title}</span>
                                        )}
                                        {isInProgress && (
                                            <span className="text-xs font-mono font-normal px-2 py-1 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30">
                                                En cours
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-gray-600 dark:text-slate-400 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 text-xs font-mono bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded"
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
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
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
                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
                                            aria-label={`Démo du projet ${project.title}`}
                                        >
                                            <ExternalLinkIcon />
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
