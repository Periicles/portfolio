import { experiences } from '@/content/experiences'

export default function Experience() {
    return (
        <section id="experience" aria-labelledby="experience-heading" className="py-16 scroll-mt-24 md:scroll-mt-0">
            <p aria-hidden="true" className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">
                02. Expérience
            </p>
            <h2 id="experience-heading" className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Mon parcours
            </h2>

            <div className="space-y-12">
                {experiences.map((exp) => (
                    <div key={exp.company} className="relative">
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
                                    {exp.description.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
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
