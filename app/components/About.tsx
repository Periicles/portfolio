export default function About() {
    return (
        <section id="about" className="py-16 scroll-mt-24 md:scroll-mt-0">
            <h2 className="text-xs font-mono text-teal-500 dark:text-teal-400 mb-2">01. A propos</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-8">
                Bonjour, je suis Paul. Ravi de vous rencontrer.
            </h1>

            <div className="space-y-6 text-gray-600 dark:text-slate-400 leading-relaxed">
                <p>
                    Je suis developpeur web fullstack, avec des experiences professionnelles sur des environnements TypeScript, React et Python. J&apos;aime concevoir des applications web complètes, de l&apos;interface utilisateur jusqu&apos;aux API REST.
                </p>

                <p>
                    Chez H2V Solutions (octobre 2024 - juillet 2025), j&apos;ai travaillé sur le developpement frontend d&apos;une application de composition de newsletters avec React et TypeScript, en mettant l&apos;accent sur l&apos;architecture modulaire, le typage strict et la maintenabilité.
                </p>

                <p>
                    Lors de mon experience chez Metapolis (juillet 2023 - decembre 2023), j&apos;ai également contribué au backend d&apos;une application de monitoring avec Python, FastAPI, PostgreSQL et MongoDB, en construisant des API documentées et testées.
                </p>

                <p>
                    Aujourd&apos;hui, je poursuis ma progression en mastère Dev. Manager Full Stack (EFREI, 2025 - 2027). Je reste motivé par la qualité logicielle, les bonnes pratiques d&apos;ingénierie et les projets qui ont un impact concret. Je dispose egalement d&apos;un niveau d&apos;anglais professionnel (TOEIC : 960/990).
                </p>
            </div>

            <div className="mt-12">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">Technologies avec lesquelles je travaille :</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600 dark:text-slate-400">
                    <li>JavaScript</li>
                    <li>TypeScript</li>
                    <li>TailwindCSS</li>
                    <li>Node.js</li>
                    <li>Next.js</li>
                    <li>React.js</li>
                    <li>Java</li>
                    <li>Angular</li>
                    <li>Python</li>
                    <li>FastAPI</li>
                    <li>WordPress</li>
                    <li>Docker</li>
                    <li>PostgreSQL</li>
                    <li>MongoDB</li>
                    <li>Git</li>
                </ul>
            </div>
        </section>
    )
}
