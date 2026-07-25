export type Experience = {
    title: string
    company: string
    period: string
    description: string[]
    technologies: string[]
}

export const experiences: readonly Experience[] = [
    {
        title: "Développeur Full Stack – AI Assisted Development",
        company: "Ceva Santé Animale",
        period: "mars 2026 -> août 2026",
        description: [
            "Construction d'applications métier from scratch à l'aide d'outils IA (Cursor, Claude Code) sur une stack React/Next.js/TypeScript/Tailwind CSS.",
            "Migration d'applications existantes vers des technologies modernes et open-source via le vibe coding.",
            "Recueil des besoins métier et collaboration directe avec les parties prenantes pour traduire leurs besoins en solutions fonctionnelles.",
            "Garantie de la qualité et sécurité du code selon les standards SonarQube et OWASP Top 10, et documentation des métriques pour construire le business case du vibe coding.",
        ],
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Git", "Cursor", "Claude Code"],
    },
    {
        title: "Développeur Frontend",
        company: "H2V Solutions",
        period: "oct. 2024 -> juil. 2025",
        description: [
            "Développement et conception de la partie frontend d'une application permettant la composition de newsletters avec TypeScript et React.",
            "Implémentation de composants réutilisables et maintenables en suivant une architecture modulaire.",
            "Application des bonnes pratiques frontend : clean code, typage strict, séparation des responsabilités.",
            "Utilisation de Git pour le versioning et le travail collaboratif.",
        ],
        technologies: ["TypeScript", "React", "Git", "Architecture modulaire"],
    },
    {
        title: "Développeur Backend",
        company: "METAPOLIS",
        period: "juil. 2023 -> déc. 2023",
        description: [
            "Développement et conception du backend d'une application de monitoring avec Python et FastAPI ainsi que de bases de données PostgreSQL et MongoDB.",
            "Création et exposition d'API REST performantes et documentées (OpenAPI / Swagger).",
            "Tests et validation des endpoints pour garantir la stabilité de l'application.",
            "Méthodologie de travail agile",
        ],
        technologies: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "OpenAPI"],
    },
] as const
