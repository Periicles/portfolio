import { describe, it, expect } from 'vitest'
import { buildStructuredData, serializeJsonLd } from './structured-data'
import { site } from '@/content/site'

describe('buildStructuredData', () => {
    const graph = buildStructuredData()['@graph']
    const person = graph.find((node) => node['@type'] === 'Person')

    it('décrit la personne avec ses profils publics', () => {
        expect(person).toMatchObject({ name: site.name, url: site.url, jobTitle: site.role })
        expect(person?.sameAs).toEqual([site.socials.github, site.socials.linkedin])
    })

    it('dédoublonne les établissements de formation', () => {
        const names = (person?.alumniOf ?? []).map((school) => school.name)
        expect(names).toEqual([...new Set(names)])
    })

    it('relie le site web à la personne', () => {
        const website = graph.find((node) => node['@type'] === 'WebSite')
        expect(website?.publisher).toEqual({ '@id': person?.['@id'] })
    })
})

describe('serializeJsonLd', () => {
    it('échappe les chevrons pour ne pas refermer la balise script', () => {
        const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' })
        expect(out).not.toContain('<')
        expect(JSON.parse(out).name).toBe('</script><script>alert(1)</script>')
    })
})
