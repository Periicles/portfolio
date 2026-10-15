import type { Locale } from '@/i18n/config'

export type SkillGroup = {
    label: string
    items: readonly string[]
}

const frontend = ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Angular"]
const backend = ["Node.js", "Python", "FastAPI", "Java", "Prisma", "PostgreSQL", "MongoDB"]
const apple = ["Swift", "SwiftUI"]
const tools = ["Git", "GitHub Actions", "Docker", "SonarQube", "Cursor", "Claude Code", "WordPress"]

export const skillGroups: Record<Locale, readonly SkillGroup[]> = {
    fr: [
        { label: "Frontend", items: frontend },
        { label: "Backend & données", items: backend },
        { label: "Apple", items: apple },
        { label: "Outils & IA", items: tools },
    ],
    en: [
        { label: "Frontend", items: frontend },
        { label: "Backend & data", items: backend },
        { label: "Apple", items: apple },
        { label: "Tools & AI", items: tools },
    ],
}
