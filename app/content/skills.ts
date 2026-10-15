export type SkillGroup = {
    label: string
    items: string[]
}

export const skillGroups: readonly SkillGroup[] = [
    {
        label: "Frontend",
        items: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Angular"],
    },
    {
        label: "Backend & données",
        items: ["Node.js", "Python", "FastAPI", "Java", "Prisma", "PostgreSQL", "MongoDB"],
    },
    {
        label: "Apple",
        items: ["Swift", "SwiftUI"],
    },
    {
        label: "Outils & IA",
        items: ["Git", "GitHub Actions", "Docker", "SonarQube", "Cursor", "Claude Code", "WordPress"],
    },
] as const
