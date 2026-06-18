export type Project = {
    title: string
    description: string
    technologies: string[]
    link?: string
    github?: string
    status?: "in-progress"
}

export const projects: readonly Project[] = [
    {
        title: "Petfriendly Locator",
        description: "Une plateforme de géolocalisation pour trouver des lieux pet-friendly avec recherche avancée et filtres intelligents. Développée avec des technologies web modernes pour offrir performance et confort d'utilisation.",
        technologies: ["Next.js", "PostgreSQL", "TailwindCSS", "Leaflet Maps"],
        link: "https://gitlab.com/Periicles/petfriendlylocator",
        github: "https://gitlab.com/Periicles/petfriendlylocator",
    },
    {
        title: "MY_RPG",
        description: "Un jeu de rôle multijoueur avec système de combat en temps réel et progression persistante. Communication temps réel via sockets et architecture backend évolutive.",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
        link: "https://github.com/Periicles/RPG",
        github: "https://github.com/Periicles/RPG",
    },
    {
        title: "Tableau de bord Microservices",
        description: "Un tableau de bord complet pour superviser et administrer une architecture microservices. Inclut métriques en temps réel, suivi de santé des services et contrôles de mise à l'échelle automatiques.",
        technologies: ["TypeScript", "Docker", "Kubernetes", "FastAPI"],
        status: "in-progress",
    },
] as const
