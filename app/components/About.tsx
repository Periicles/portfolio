import { skillGroups } from '@/content/skills'
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
                    Je suis développeur web fullstack, actuellement en alternance chez Ceva Santé Animale en tant que Développeur Full Stack – AI Assisted Development. J&apos;y conçois des applications métier de bout en bout, de l&apos;interface jusqu&apos;aux API, et je modernise des outils existants.
                </p>

                <p>
                    Ma spécificité : tirer parti des outils d&apos;IA comme Cursor et Claude Code pour livrer plus vite, sans transiger sur la qualité. Le code que je produis est contrôlé selon les standards SonarQube et OWASP Top 10, et je mesure l&apos;impact de cette approche pour en démontrer la valeur.
                </p>

                <p>
                    Auparavant, j&apos;ai développé le frontend React/TypeScript d&apos;un éditeur de newsletters chez H2V Solutions, et le backend Python/FastAPI d&apos;une application de monitoring chez Metapolis. Je termine aujourd&apos;hui mon mastère Dev Manager Full Stack à l&apos;EFREI (2027).
                </p>
            </div>

            <div className="mt-12">
                <h3 className="text-lg font-semibold text-ink mb-6">Technologies avec lesquelles je travaille</h3>
                <dl className="grid gap-6 sm:grid-cols-2">
                    {skillGroups.map((group) => (
                        <div key={group.label}>
                            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-accent-strong mb-3">
                                {group.label}
                            </dt>
                            <dd className="flex flex-wrap gap-2">
                                {group.items.map((item) => (
                                    <span
                                        key={item}
                                        className="text-xs text-muted font-mono bg-surface px-2 py-1 rounded"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
