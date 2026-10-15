import type { Locale } from '@/i18n/config'

export type Education = {
    school: string
    degree: string
    period: string
    detail?: string
    diploma?: string
    url?: string
}

export type Certification = {
    name: string
    detail: string
}

export const education: Record<Locale, readonly Education[]> = {
    fr: [
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
    ],
    en: [
        {
            school: "EFREI Paris",
            degree: "Master's degree – Dev. Manager Full Stack",
            period: "2025 – 2027",
            detail: "4th and 5th year · in progress, work-study at Ceva Santé Animale",
            diploma: "Qualification in preparation: Software Architecture & Development Expert (French RNCP level 7, awarded by 3iL)",
            url: "https://www.efrei.fr/formation/mastere-dev-manager-full-stack/",
        },
        {
            school: "EFREI Paris",
            degree: "Bachelor's degree – Web & AI Developer",
            period: "2024 – 2025",
            detail: "3rd year",
            diploma: "Qualification: Full-Stack Web Developer (French RNCP level 6, awarded by 3iL)",
            url: "https://www.efrei.fr/formation/bachelor-developpeur-web-ia/",
        },
        {
            school: "Epitech",
            degree: "Grande École Programme",
            period: "2022 – 2024",
            detail: "1st and 2nd year",
            diploma: "Qualification prepared: Information Technology Expert (French RNCP level 7)",
            url: "https://www.epitech.eu/programme-grande-ecole-informatique/",
        },
    ],
}

export const certifications: Record<Locale, readonly Certification[]> = {
    fr: [{ name: "TOEIC", detail: "960/990 · passé via l'EFREI" }],
    en: [{ name: "TOEIC", detail: "960/990 · taken through EFREI" }],
}
