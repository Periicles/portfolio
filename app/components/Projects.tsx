export default function Projects() {
    const projects = [
        {
            title: "Petfriendly Locator",
            description: "Une plateforme de geolocalisation pour trouver des lieux pet-friendly avec recherche avancee et filtres intelligents. Developpee avec des technologies web modernes pour offrir performance et confort d'utilisation.",
            technologies: ["Next.js", "PostgreSQL", "TailwindCSS", "Leaflet Maps"],
            link: "https://gitlab.com/Periicles/petfriendlylocator",
            github: "https://gitlab.com/Periicles/petfriendlylocator"
        },
        {
            title: "MY_RPG",
            description: "Un jeu de role multijoueur avec systeme de combat en temps reel et progression persistante. Communication temps reel via sockets et architecture backend evolutive.",
            technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
            link: "https://github.com/Periicles/RPG",
            github: "https://github.com/Periicles/RPG"
        },
        {
            title: "Tableau de bord Microservices",
            description: "Un tableau de bord complet pour superviser et administrer une architecture microservices. Inclut metriques en temps reel, suivi de sante des services et controles de mise a l'echelle automatiques.",
            technologies: ["TypeScript", "Docker", "Kubernetes", "FastAPI"],
            link: "#",
            github: "#"
        }
    ]

    return (
        <section id="projects" className="py-16 scroll-mt-24 md:scroll-mt-0">
            <h2 className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">03. Projets</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Quelques réalisations
            </h1>

            <div className="space-y-12">
                {projects.map((project, index) => (
                    <article key={index} className="relative">
                        <div className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-12 md:col-span-8">
                                <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 mb-2">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="link-hover"
                                    >
                                        {project.title}
                                    </a>
                                </h3>
                                <p className="text-gray-600 dark:text-slate-400 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 text-xs font-mono bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-4 flex justify-end space-x-4">
                                {project.github !== "#" && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label="Depot GitHub"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                )}
                                {project.link !== "#" && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                        aria-label="Lien externe"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>

                    </article>
                ))}
            </div>
        </section>
    )
}
