export type Education = {
    school: string
    degree: string
    period: string
    detail?: string
}

export const education: readonly Education[] = [
    {
        school: "EFREI Paris",
        degree: "Mastère Dev Manager Full Stack",
        period: "2025 – 2027",
        detail: "4e et 5e année · en cours, en alternance chez Ceva Santé Animale",
    },
    {
        school: "EFREI Paris",
        degree: "Bachelor Développeur Web & IA",
        period: "2024 – 2025",
        detail: "3e année",
    },
    {
        school: "Epitech",
        degree: "Programme Grande École",
        period: "2022 – 2024",
        detail: "1re et 2e année",
    },
] as const

export const certifications: readonly { name: string; detail: string }[] = [
    { name: "TOEIC", detail: "960/990 · passé via l'EFREI" },
] as const
