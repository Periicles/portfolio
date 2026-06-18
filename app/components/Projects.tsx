import { ExternalLinkIcon } from './icons/ExternalLinkIcon'
import { GitHubIcon } from './icons/GitHubIcon'

type Project = {
    title: string
    description: string
    technologies: string[]
    link?: string
    github?: string
    status?: "in-progress"
}

export default function Projects() {
    const projects: Project[] = [
        {
            title: "Petfriendly Locator",
            description: "Une plateforme de géolocalisation pour trouver des lieux pet-friendly avec recherche avancée et filtres intelligents. Développée avec des technologies web modernes pour offrir performance et confort d'utilisation.",
            technologies: ["Next.js", "PostgreSQL", "TailwindCSS", "Leaflet Maps"],
            link: "https://gitlab.com/Periicles/petfriendlylocator",
            github: "https://gitlab.com/Periicles/petfriendlylocator",
        },
        {
            title: "MY_RPG",
            description: "Un jeu de rôle multijoueur avec système de combat en temps réel et progression persistante. Communication temps réel via sockets et architecture backend évolutive.",
            technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
            link: "https://github.com/Periicles/RPG",
            github: "https://github.com/Periicles/RPG",
        },
        {
            title: "Tableau de bord Microservices",
            description: "Un tableau de bord complet pour superviser et administrer une architecture microservices. Inclut métriques en temps réel, suivi de santé des services et contrôles de mise à l'échelle automatiques.",
            technologies: ["TypeScript", "Docker", "Kubernetes", "FastAPI"],
            status: "in-progress",
        },
    ]

    return (
        <section id="projects" aria-labelledby="projects-heading" className="py-16 scroll-mt-24 md:scroll-mt-0">
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
