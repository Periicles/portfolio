export type Project = {
    title: string
    description: string
    technologies: string[]
    link?: string
    github?: string
}

export const projects: readonly Project[] = [
    {
        title: "Petfriendly Locator",
        description: "Application web communautaire pour découvrir et partager les lieux pet-friendly de la région bordelaise : carte interactive, ajout de lieux, profils utilisateurs, système d'avis et espace de modération. Conteneurisée avec Docker et déployée via une CI/CD GitHub Actions.",
        technologies: ["Next.js 16", "TypeScript", "React 19", "Prisma", "PostgreSQL", "Mapbox GL JS", "Auth.js", "Tailwind CSS", "Docker"],
        link: "https://github.com/Periicles/petfriendlylocator",
        github: "https://github.com/Periicles/petfriendlylocator",
    },
    {
        title: "MY_RPG",
        description: "Jeu de rôle 2D inspiré de Link's Awakening, écrit en C avec la CSFML. Rendu en projection isométrique 3D, gestion des collisions au pixel près via le canal alpha des sprites, dialogues avec les PNJ et interactions avec le décor. Projet d'équipe réalisé à Epitech.",
        technologies: ["C", "CSFML", "Make"],
        link: "https://github.com/Periicles/RPG",
        github: "https://github.com/Periicles/RPG",
    },
    {
        title: "NotchBar",
        description: "Application macOS minimaliste qui exploite l'encoche physique du Mac pour afficher la progression de l'événement de calendrier en cours. Six états contextuels révélés au survol, accès au calendrier via EventKit, rendu SwiftUI sans aucune dépendance externe.",
        technologies: ["Swift", "SwiftUI", "EventKit", "AppKit", "SPM"],
        link: "https://periicles.github.io/Notchapp/",
        github: "https://github.com/Periicles/Notchapp",
    },
] as const
