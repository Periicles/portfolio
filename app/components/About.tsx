export default function About() {
    return (
        <section id="about" className="py-16 scroll-mt-24 md:scroll-mt-0">
            <h2 className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">01. A propos</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Bonjour, je suis Paul. Ravi de vous rencontrer.
            </h1>

            <div className="space-y-6 text-gray-600 dark:text-slate-400 leading-relaxed">
                <p>
                    Je suis developpeur web, passionne par la creation de microservices evolutifs et d&apos;experiences digitales de qualite. Ce que je prefere se situe a l&apos;intersection d&apos;une architecture backend robuste et d&apos;un frontend soigne, pour concevoir des applications performantes et agreables a utiliser.
                </p>

                <p>
                    Aujourd&apos;hui, je me specialise dans le developpement d&apos;applications web modernes avec des technologies comme Next.js, React et TypeScript. Je contribue a la conception et a la maintenance de systemes evolutifs qui alimentent des produits digitaux, avec un haut niveau d&apos;exigence sur la performance, l&apos;accessibilite et l&apos;ergonomie.
                </p>

                <p>
                    J&apos;ai eu l&apos;occasion de developper des logiciels dans des contextes varies, de la startup a l&apos;entreprise etablie, sur des projets allant de plateformes de geolocalisation pet-friendly a des jeux RPG multijoueurs. Je suis particulierement interesse par l&apos;architecture microservices, les pratiques DevOps et la mise en place de pipelines CI/CD fluides.
                </p>

                <p>
                    Pendant mon temps libre, j&apos;explore de nouvelles technologies, je contribue a des projets open source et je profite de grandes balades a moto. Je continue egalement a me former pour rester a jour sur les tendances et les bonnes pratiques du developpement web.
                </p>
            </div>

            <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Technologies avec lesquelles je travaille :</h3>
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
