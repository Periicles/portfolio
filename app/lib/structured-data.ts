import { site } from '@/content/site'
import { education } from '@/content/education'
import { skillGroups } from '@/content/skills'

/**
 * Graphe schema.org (Person + WebSite) décrivant le propriétaire du site,
 * exploité par les moteurs de recherche pour enrichir les résultats.
 */
export function buildStructuredData() {
    const personId = `${site.url}/#person`
    const schools = [...new Set(education.fr.map((item) => item.school))]

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                '@id': personId,
                name: site.name,
                url: site.url,
                jobTitle: site.role,
                description: site.description,
                worksFor: {
                    '@type': 'Organization',
                    name: site.employer.name,
                    url: site.employer.url,
                },
                alumniOf: schools.map((name) => ({
                    '@type': 'EducationalOrganization',
                    name,
                })),
                knowsAbout: skillGroups.fr.flatMap((group) => group.items),
                knowsLanguage: ['fr', 'en'],
                sameAs: Object.values(site.socials),
            },
            {
                '@type': 'WebSite',
                '@id': `${site.url}/#website`,
                url: site.url,
                name: site.name,
                inLanguage: 'fr-FR',
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
