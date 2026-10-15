export type Project = {
    title: string
    description: string
    technologies: string[]
    link?: string
    github?: string
}

export const projects: readonly Project[] = [
    {
        title: "NotchBar",
        description: "Application macOS minimaliste qui exploite l'encoche physique du Mac pour afficher la progression de l'événement de calendrier en cours. Six états contextuels révélés au survol, accès au calendrier via EventKit, rendu SwiftUI sans aucune dépendance externe.",
        technologies: ["Swift", "SwiftUI", "EventKit", "AppKit", "SPM"],
        link: "https://periicles.github.io/Notchapp/",
        github: "https://github.com/Periicles/Notchapp",
    },
    {
        title: "Petfriendly Locator",
        description: "Application web communautaire pour découvrir et partager les lieux pet-friendly de la région bordelaise : carte interactive, ajout de lieux, profils utilisateurs, système d'avis et espace de modération. Conteneurisée avec Docker et déployée via une CI/CD GitHub Actions.",
        technologies: ["Next.js 16", "TypeScript", "React 19", "Prisma", "PostgreSQL", "Mapbox GL JS", "Auth.js", "Tailwind CSS", "Docker"],
        link: "https://github.com/Periicles/petfriendlylocator",
        github: "https://github.com/Periicles/petfriendlylocator",
    },
    {
        title: "Ce portfolio",
        description: "Site Next.js prérendu, pensé comme un projet de production : formulaire de contact via une Server Action et Resend avec validation, honeypot et limitation de débit, en-têtes de sécurité durcis (CSP, HSTS, COOP), SEO complet et accessibilité WCAG 2.1 AA. Tests Vitest, détection de secrets et build vérifiés en CI à chaque PR.",
        technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Resend", "Vitest", "GitHub Actions", "Vercel"],
        link: "https://www.paulragueneau.com",
        github: "https://github.com/Periicles/portfolio",
    },
] as const
