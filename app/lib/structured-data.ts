import { site } from '@/content/site'
import { education } from '@/content/education'
import { skillGroups } from '@/content/skills'
import { homePath, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

/**
 * Graphe schema.org (Person + WebSite) décrivant le propriétaire du site,
 * exploité par les moteurs de recherche pour enrichir les résultats.
 */
export function buildStructuredData(locale: Locale) {
    const t = getDictionary(locale).meta
    const personId = `${site.url}/#person`
    const schools = [...new Set(education[locale].map((item) => item.school))]

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': personId,
                name: site.name,
                url: site.url,
                jobTitle: t.role,
                description: t.description,
                worksFor: {
                    '@type': 'Organization',
                    name: site.employer.name,
                    url: site.employer.url,
                },
                alumniOf: schools.map((name) => ({
                    '@type': 'EducationalOrganization',
                    name,
                })),
                knowsAbout: skillGroups[locale].flatMap((group) => group.items),
                knowsLanguage: ['fr', 'en'],
                sameAs: Object.values(site.socials),
            },
            {
                '@type': 'WebSite',
                '@id': `${site.url}/#website`,
                url: new URL(homePath(locale), site.url).href,
                name: site.name,
                inLanguage: locale,
                publisher: { '@id': personId },
            },
        ],
    }
}

/**
 * Sérialise le JSON-LD pour une balise <script>. Les « < » sont échappés pour
 * qu'aucune valeur ne puisse refermer la balise prématurément.
 */
export function serializeJsonLd(data: unknown): string {
    return JSON.stringify(data).replace(/</g, '\\u003c')
}
