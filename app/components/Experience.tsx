export default function Experience() {
    const experiences = [
        {
            title: "Développeur Frontend",
            company: "H2V Solutions",
            period: "oct. 2024 -> juil. 2025",
            description: [
                "Développement et conception de la partie frontend d'une application permettant la composition de newsletters avec TypeScript et React.",
                "Implémentation de composants réutilisables et maintenables en suivant une architecture modulaire.",
                "Application des bonnes pratiques frontend : clean code, typage strict, séparation des responsabilités.",
                "Utilisation de Git pour le versioning et le travail collaboratif."
            ],
            technologies: ["TypeScript", "React", "Git", "Architecture modulaire"]
        },
        {
            title: "Développeur Backend",
            company: "METAPOLIS",
            period: "juil. 2023 -> déc. 2023",
            description: [
                "Développement et conception du backend d'une application de monitoring avec Python et FastAPI ainsi que de bases de données PostgreSQL et MongoDB.",
                "Création et exposition d'API REST performantes et documentées (OpenAPI / Swagger).",
                "Tests et validation des endpoints pour garantir la stabilité de l'application.",
                "Méthodologie de travail agile"
            ],
            technologies: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "OpenAPI"]
        }
    ]

    return (
        <section id="experience" aria-labelledby="experience-heading" className="py-16 scroll-mt-24 md:scroll-mt-0">
            <p aria-hidden="true" className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">
                02. Expérience
            </p>
            <h2 id="experience-heading" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Mon parcours
            </h2>

            <div className="space-y-12">
                {experiences.map((exp, index) => (
                    <div key={index} className="relative">
                        <div className="flex flex-col md:flex-row md:items-start md:space-x-8">
                            <div className="md:w-48 mb-2 md:mb-0">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
                                    {exp.title}
                                </h3>
                                <p className="text-teal-500 dark:text-teal-400">
                                    {exp.company}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-slate-500 font-mono mt-1">
                                    {exp.period}
                                </p>
                            </div>

                            <div className="flex-1">
                                <ul className="list-disc pl-5 text-gray-600 dark:text-slate-400 leading-relaxed mb-4 space-y-1">
                                    {exp.description.map((item, itemIndex) => (
                                        <li key={itemIndex}>{item}</li>
                                    ))}
                                </ul>
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

                    </div>
                ))}
            </div>
        </section>
    )
}
