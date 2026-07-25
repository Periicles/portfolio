import SectionEyebrow from './SectionEyebrow'

export default function About() {
    return (
        <section id="about" aria-labelledby="about-heading" className="py-16 scroll-mt-24 md:scroll-mt-16">
            <SectionEyebrow index={1}>À propos</SectionEyebrow>
            <h2 id="about-heading" className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink mb-8">
                Bonjour, je suis Paul. Ravi de vous rencontrer.
            </h2>

            <div className="space-y-6 text-muted leading-relaxed">
                <p>
                    Je suis développeur web fullstack, avec des expériences professionnelles sur des environnements TypeScript, React et Python. J&apos;aime concevoir des applications web complètes, de l&apos;interface utilisateur jusqu&apos;aux API REST.
                </p>

                <p>
                    Chez H2V Solutions (octobre 2024 - juillet 2025), j&apos;ai travaillé sur le développement frontend d&apos;une application de composition de newsletters avec React et TypeScript, en mettant l&apos;accent sur l&apos;architecture modulaire, le typage strict et la maintenabilité.
                </p>

                <p>
                    Lors de mon expérience chez Metapolis (juillet 2023 - décembre 2023), j&apos;ai également contribué au backend d&apos;une application de monitoring avec Python, FastAPI, PostgreSQL et MongoDB, en construisant des API documentées et testées.
                </p>

                <p>
                    Depuis mars 2026, je rejoins Ceva Santé Animale en tant que Développeur Full Stack – AI Assisted Development. J&apos;y construis des applications métier from scratch et migre des solutions existantes vers des technologies modernes, en tirant parti d&apos;outils IA comme Cursor et Claude Code pour accélérer le développement tout en maintenant un haut niveau de qualité et de sécurité.
                </p>

                <p>
                    Aujourd&apos;hui, je poursuis ma progression en mastère Dev. Manager Full Stack (EFREI, 2025 - 2027). Je reste motivé par la qualité logicielle, les bonnes pratiques d&apos;ingénierie et les projets qui ont un impact concret. Je dispose également d&apos;un niveau d&apos;anglais professionnel (TOEIC : 960/990).
                </p>
            </div>

            <div className="mt-12">
                <h3 className="text-lg font-semibold text-ink mb-4">Technologies avec lesquelles je travaille :</h3>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-muted">
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
