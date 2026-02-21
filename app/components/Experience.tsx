export default function Experience() {
    const experiences = [
        {
            title: "Developpeur Web Senior",
            company: "Entreprise Tech",
            period: "2022 - Aujourd'hui",
            description: "Pilotage du developpement d'applications web evolutives avec Next.js et une architecture microservices. Mise en place de pipelines CI/CD et optimisation des performances.",
            technologies: ["Next.js", "TypeScript", "Docker", "PostgreSQL", "Kubernetes"]
        },
        {
            title: "Developpeur Full Stack",
            company: "Agence Digitale",
            period: "2020 - 2022",
            description: "Developpement de solutions web sur mesure pour des clients de secteurs varies. Creation d'API REST et d'interfaces frontend responsives.",
            technologies: ["React", "Node.js", "MongoDB", "TailwindCSS", "AWS"]
        },
        {
            title: "Developpeur Frontend",
            company: "Startup Studio",
            period: "2018 - 2020",
            description: "Conception d'interfaces modernes et accessibles pour des applications web. Collaboration avec les equipes design pour une implementation fidele des maquettes.",
            technologies: ["JavaScript", "Vue.js", "SASS", "Git", "Agile"]
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
