export default function About() {
    return (
        <section id="about" className="py-16 scroll-mt-24 md:scroll-mt-0">
            <h2 className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">01. About</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Hi, I&apos;m Paul. Nice to meet you.
            </h1>

            <div className="space-y-6 text-gray-600 dark:text-slate-400 leading-relaxed">
                <p>
                    I&apos;m a web developer passionate about crafting scalable microservices and creating exceptional digital experiences. My favorite work lies at the intersection of robust backend architecture and thoughtful frontend design, building applications that not only perform well but deliver outstanding user experiences.
                </p>

                <p>
                    Currently, I specialize in building modern web applications using technologies like Next.js, React, and TypeScript. I contribute to the development and maintenance of scalable systems that power digital products, ensuring they meet high standards for performance, accessibility, and usability.
                </p>

                <p>
                    In the past, I&apos;ve had the opportunity to develop software across various settings — from startups to established companies, working on everything from pet-friendly location platforms to multiplayer RPG games. I&apos;m particularly passionate about microservices architecture, DevOps practices, and creating seamless CI/CD pipelines.
                </p>

                <p>
                    In my spare time, I&apos;m usually exploring new technologies, contributing to open-source projects, or enjoying epic motorcycle adventures. I&apos;m also constantly learning and staying up-to-date with the latest web development trends and best practices.
                </p>
            </div>

            <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Technologies I work with:</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600 dark:text-slate-400">
                    <li>Next.js & React</li>
                    <li>TypeScript</li>
                    <li>TailwindCSS</li>
                    <li>Docker</li>
                    <li>PostgreSQL</li>
                    <li>FastAPI</li>
                    <li>MongoDB</li>
                    <li>Node.js</li>
                    <li>Kubernetes</li>
                </ul>
            </div>
        </section>
    )
}
