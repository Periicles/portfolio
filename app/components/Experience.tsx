export default function Experience() {
    const experiences = [
        {
            title: "Developpeur Frontend",
            company: "H2V Solutions",
            period: "oct. 2024 -> juil. 2025",
            description: "Developpement et conception de la partie frontend d'une application de composition de newsletters en TypeScript et React. Mise en place de composants reutilisables et maintenables, dans une architecture modulaire, avec application des bonnes pratiques frontend (clean code, typage strict, separation des responsabilites) et usage de Git pour le travail collaboratif.",
            technologies: ["TypeScript", "React", "Git", "Architecture modulaire"]
        },
        {
            title: "Developpeur Backend",
            company: "METAPOLIS",
            period: "juil. 2023 -> dec. 2023",
            description: "Developpement et conception du backend d'une application de monitoring avec Python et FastAPI, ainsi que de bases de donnees PostgreSQL et MongoDB. Creation d'API REST performantes et documentees (OpenAPI / Swagger), puis tests et validation des endpoints pour garantir la stabilite de l'application.",
            technologies: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "OpenAPI"]
        }
    ]

    return (
        <section id="experience" className="py-16 scroll-mt-24 md:scroll-mt-0">
            <h2 className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">02. Experience</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Mon parcours
            </h1>

            <div className="space-y-12">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative">
                        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                            <div className="md:w-48 mb-2 md:mb-0">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                                    {exp.title}
                                </h3>
                                <a
                                    href="#"
                                    className="text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors"
                                >
                                    {exp.company}
                                </a>
                                <p className="text-sm text-gray-500 dark:text-slate-500 font-mono mt-1">
                                    {exp.period}
                                </p>
                            </div>

                            <div className="flex-1">
                                <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-4">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="text-xs text-gray-500 dark:text-slate-500 font-mono bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {index < experiences.length - 1 && (
                            <div className="absolute left-0 top-0 w-px h-full bg-gray-200 dark:bg-slate-700 -ml-0.5 hidden md:block"
                                style={{ top: '3rem', height: `calc(100% - 3rem)` }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
