import type { Locale } from '@/i18n/config'

export type Experience = {
    title: string
    company: string
    period: string
    contract?: string
    description: string[]
    technologies: string[]
}

export const experiences: Record<Locale, readonly Experience[]> = {
    fr: [
        {
            title: "Développeur Full Stack – AI Assisted Development",
            company: "Ceva Santé Animale",
            period: "mars 2026 – aujourd'hui",
            contract: "Stage (mars – août 2026), puis alternance jusqu'en septembre 2027",
            description: [
                "Conception et développement d'applications métier de bout en bout en React, Next.js, TypeScript et Tailwind CSS, avec un workflow de développement assisté par IA (Cursor, Claude Code).",
                "Migration d'applications existantes vers des technologies modernes et open-source.",
                "Recueil des besoins auprès des équipes métier et itérations courtes avec les parties prenantes pour livrer des outils réellement adoptés.",
                "Garantie de la qualité et de la sécurité du code (SonarQube, OWASP Top 10) et suivi de métriques pour construire le business case du développement assisté par IA.",
            ],
            technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Git", "Cursor", "Claude Code"],
        },
        {
            title: "Développeur Frontend",
            company: "H2V Solutions",
            period: "oct. 2024 – juil. 2025",
            description: [
                "Conception et développement du frontend d'une application de composition de newsletters en React et TypeScript.",
                "Création de composants réutilisables et maintenables au sein d'une architecture modulaire.",
                "Application des bonnes pratiques frontend : clean code, typage strict, séparation des responsabilités.",
            ],
            technologies: ["TypeScript", "React", "Git", "Architecture modulaire"],
        },
        {
            title: "Développeur Backend",
            company: "METAPOLIS",
            period: "juil. 2023 – déc. 2023",
            description: [
                "Conception et développement du backend d'une application de monitoring en Python et FastAPI, avec des bases de données PostgreSQL et MongoDB.",
                "Création et exposition d'API REST performantes et documentées (OpenAPI / Swagger).",
                "Tests et validation des endpoints pour garantir la stabilité de l'application.",
                "Travail en méthodologie agile au sein d'une équipe produit.",
            ],
            technologies: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "OpenAPI"],
        },
    ],
    en: [
        {
            title: "Full Stack Developer – AI Assisted Development",
            company: "Ceva Santé Animale",
            period: "Mar 2026 – present",
            contract: "Internship (Mar – Aug 2026), then work-study apprenticeship until September 2027",
            description: [
                "Designed and built business applications end to end with React, Next.js, TypeScript and Tailwind CSS, using an AI-assisted development workflow (Cursor, Claude Code).",
                "Migrated existing applications to modern, open-source technologies.",
                "Gathered requirements from business teams and iterated in short cycles with stakeholders to deliver tools people actually adopt.",
                "Ensured code quality and security (SonarQube, OWASP Top 10) and tracked metrics to build the business case for AI-assisted development.",
            ],
            technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Git", "Cursor", "Claude Code"],
        },
        {
            title: "Frontend Developer",
            company: "H2V Solutions",
            period: "Oct 2024 – Jul 2025",
            description: [
                "Designed and built the frontend of a newsletter composition application with React and TypeScript.",
                "Created reusable, maintainable components within a modular architecture.",
                "Applied frontend best practices: clean code, strict typing, separation of concerns.",
            ],
            technologies: ["TypeScript", "React", "Git", "Modular architecture"],
        },
        {
            title: "Backend Developer",
            company: "METAPOLIS",
            period: "Jul 2023 – Dec 2023",
            description: [
                "Designed and built the backend of a monitoring application with Python and FastAPI, backed by PostgreSQL and MongoDB databases.",
                "Built and exposed fast, well-documented REST APIs (OpenAPI / Swagger).",
                "Tested and validated endpoints to keep the application stable.",
                "Worked in an agile product team.",
            ],
            technologies: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "OpenAPI"],
        },
    ],
}
