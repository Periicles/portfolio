import type { Locale } from '@/i18n/config'

export type Education = {
    school: string
    degree: string
    period: string
    detail?: string
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
        },
        {
            school: "EFREI Paris",
            degree: "Bachelor",
            period: "2024 – 2025",
            detail: "3e année",
        },
        {
            school: "Epitech",
            degree: "Programme Grande École",
            period: "2022 – 2024",
            detail: "1re et 2e année",
        },
    ],
    en: [
        {
            school: "EFREI Paris",
            degree: "Master's degree – Dev. Manager Full Stack",
            period: "2025 – 2027",
            detail: "4th and 5th year · in progress, work-study at Ceva Santé Animale",
        },
        {
            school: "EFREI Paris",
            degree: "Bachelor's degree",
            period: "2024 – 2025",
            detail: "3rd year",
        },
        {
            school: "Epitech",
            degree: "Grande École Programme",
            period: "2022 – 2024",
            detail: "1st and 2nd year",
        },
    ],
}

export const certifications: Record<Locale, readonly Certification[]> = {
    fr: [{ name: "TOEIC", detail: "960/990 · passé via l'EFREI" }],
    en: [{ name: "TOEIC", detail: "960/990 · taken through EFREI" }],
}
