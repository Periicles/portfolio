export default function Experience() {
    const experiences = [
        {
            title: "Senior Web Developer",
            company: "Tech Company",
            period: "2022 - Present",
            description: "Leading development of scalable web applications using Next.js and microservices architecture. Implementing CI/CD pipelines and optimizing performance.",
            technologies: ["Next.js", "TypeScript", "Docker", "PostgreSQL", "Kubernetes"]
        },
        {
            title: "Full Stack Developer",
            company: "Digital Agency",
            period: "2020 - 2022",
            description: "Developed custom web solutions for clients across various industries. Built RESTful APIs and responsive frontend applications.",
            technologies: ["React", "Node.js", "MongoDB", "TailwindCSS", "AWS"]
        },
        {
            title: "Frontend Developer",
            company: "Startup Studio",
            period: "2018 - 2020",
            description: "Created modern, accessible user interfaces for web applications. Collaborated with design teams to implement pixel-perfect designs.",
            technologies: ["JavaScript", "Vue.js", "SASS", "Git", "Agile"]
        }
    ]

    return (
        <section id="experience" className="py-16">
            <h2 className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">02. Experience</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Where I've Worked
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
