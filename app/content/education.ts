export type Education = {
    school: string
    degree: string
    period: string
    detail?: string
    diploma?: string
    url?: string
}

export const education: readonly Education[] = [
    {
        school: "EFREI Paris",
        degree: "Mastère Dev. Manager Full Stack",
        period: "2025 – 2027",
        detail: "4e et 5e année · en cours, en alternance chez Ceva Santé Animale",
        diploma: "Titre préparé : Expert en Architecture et Développement Logiciel (RNCP niveau 7, délivré par 3iL)",
        url: "https://www.efrei.fr/formation/mastere-dev-manager-full-stack/",
    },
    {
        school: "EFREI Paris",
        degree: "Bachelor Développeur Web & IA",
        period: "2024 – 2025",
        detail: "3e année",
        diploma: "Titre : Concepteur développeur web full stack (RNCP niveau 6, délivré par 3iL)",
        url: "https://www.efrei.fr/formation/bachelor-developpeur-web-ia/",
    },
    {
        school: "Epitech",
        degree: "Programme Grande École",
        period: "2022 – 2024",
        detail: "1re et 2e année",
        diploma: "Diplôme préparé : Expert en technologies de l'information (RNCP niveau 7)",
        url: "https://www.epitech.eu/programme-grande-ecole-informatique/",
    },
] as const

export const certifications: readonly { name: string; detail: string }[] = [
    { name: "TOEIC", detail: "960/990 · passé via l'EFREI" },
] as const
