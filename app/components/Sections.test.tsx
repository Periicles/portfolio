// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { certifications, education } from '@/content/education'
import { experiences } from '@/content/experiences'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import { skillGroups } from '@/content/skills'
import { locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import About from './About'
import Contact from './Contact'
import Education from './Education'
import Experience from './Experience'
import Projects from './Projects'

vi.mock('@/actions/contact', () => ({ sendContactMessage: vi.fn() }))

function expectExternal(link: HTMLElement, href: string) {
    expect(link.getAttribute('href')).toBe(href)
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toBe('noopener noreferrer')
}

describe.each(locales)('sections (%s)', (locale) => {
    const dict = getDictionary(locale)

    describe('À propos', () => {
        it('affiche le nom comme titre principal de la page, avec son accroche', () => {
            render(<About locale={locale} />)

            // Le point final est décoratif : il apparaît à l'écran mais pas dans le nom accessible.
            expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(`${site.name}.`)
            expect(screen.getByRole('heading', { level: 1, name: /^Paul\s+Ragueneau$/ })).toBeTruthy()
            expect(screen.getByText(dict.meta.description)).toBeTruthy()
            expect(screen.getByText(dict.status.text)).toBeTruthy()
        })

        it('mène au contact et aux projets', () => {
            render(<About locale={locale} />)

            expect(screen.getByRole('link', { name: dict.nav.items.contact }).getAttribute('href')).toBe('#contact')
            expect(screen.getByRole('link', { name: dict.nav.items.projects }).getAttribute('href')).toBe('#projects')
        })

        it('présente le parcours et toute la stack, par catégorie', () => {
            const { container } = render(<About locale={locale} />)

            const section = container.querySelector('section#about')
            expect(section?.getAttribute('aria-labelledby')).toBe('about-heading')
            expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(dict.about.heading)
            for (const paragraph of dict.about.paragraphs) expect(screen.getByText(paragraph)).toBeTruthy()

            const terms = [...container.querySelectorAll('dt')].map((dt) => dt.textContent)
            expect(terms).toEqual(skillGroups[locale].map((group) => group.label))
            const chips = [...container.querySelectorAll('dd .chip')].map((chip) => chip.textContent)
            expect(chips).toEqual(skillGroups[locale].flatMap((group) => group.items))
        })
    })

    it('Expérience : une carte par poste, avec missions et technologies', () => {
        render(<Experience locale={locale} />)

        expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(dict.experience.heading)
        const cards = screen.getAllByRole('article')
        expect(cards).toHaveLength(experiences[locale].length)

        experiences[locale].forEach((exp, index) => {
            const card = within(cards[index])
            expect(card.getByRole('heading', { level: 3 }).textContent).toBe(exp.title)
            expect(card.getByText(exp.company)).toBeTruthy()
            expect(card.getByText(exp.period)).toBeTruthy()
            if (exp.contract) expect(card.getByText(exp.contract)).toBeTruthy()
            for (const item of exp.description) expect(card.getByText(item)).toBeTruthy()
            for (const tech of exp.technologies) expect(card.getByText(tech)).toBeTruthy()
        })
    })

    it('Formation : diplômes dans l’ordre, liens vers les écoles et certifications', () => {
        const { container } = render(<Education locale={locale} />)

        expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(dict.education.heading)
        const rows = [...container.querySelectorAll('ol > li')] as HTMLElement[]
        expect(rows).toHaveLength(education[locale].length)

        education[locale].forEach((item, index) => {
            const row = within(rows[index])
            expect(row.getByRole('heading', { level: 3 }).textContent).toBe(item.degree)
            expect(row.getByText(item.school)).toBeTruthy()
            expect(row.getByText(item.period)).toBeTruthy()
            if (item.url) expectExternal(row.getByRole('link', { name: item.degree }), item.url)
            else expect(row.queryByRole('link')).toBeNull()
            if (item.detail) expect(row.getByText(item.detail)).toBeTruthy()
            if (item.diploma) expect(row.getByText(item.diploma)).toBeTruthy()
        })

        for (const cert of certifications[locale]) expect(screen.getByText(cert.name)).toBeTruthy()
    })

    it('Projets : une carte numérotée par projet, avec dépôt et démo', () => {
        render(<Projects locale={locale} />)

        expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(dict.projects.heading)
        const cards = screen.getAllByRole('article')
        expect(cards).toHaveLength(projects[locale].length)

        projects[locale].forEach((project, index) => {
            const card = within(cards[index])
            const watermark = cards[index].querySelector('.project-number')
            expect(watermark?.getAttribute('data-number')).toBe(String(index + 1).padStart(2, '0'))
            expect(watermark?.getAttribute('aria-hidden')).toBe('true')
            expect(card.getByText(project.description)).toBeTruthy()
            for (const tech of project.technologies) expect(card.getByText(tech)).toBeTruthy()

            if (project.link) expectExternal(card.getByRole('link', { name: project.title }), project.link)
            if (project.github) {
                expectExternal(card.getByRole('link', { name: `${dict.projects.repoLabel} ${project.title}` }), project.github)
            }
            const demo = card.queryByRole('link', { name: `${dict.projects.demoLabel} ${project.title}` })
            expect(demo !== null).toBe(Boolean(project.link && project.link !== project.github))
        })
    })

    it('Contact : formulaire, courriel direct et autres moyens', () => {
        render(<Contact locale={locale} />)

        expect(screen.getByRole('heading', { level: 2, name: dict.contact.heading })).toBeTruthy()
        for (const paragraph of dict.contact.intro) expect(screen.getByText(paragraph)).toBeTruthy()
        expect(screen.getByLabelText(dict.form.name)).toBeTruthy()

        expect(screen.getByRole('link', { name: dict.contact.mailLink }).getAttribute('href')).toBe(`mailto:${site.email}`)
        expectExternal(screen.getByRole('link', { name: 'GitHub' }), site.socials.github)
        expectExternal(screen.getByRole('link', { name: 'LinkedIn' }), site.socials.linkedin)
        const cv = screen.getByRole('link', { name: dict.cv.short })
        expect(cv.getAttribute('href')).toBe(dict.cv.href)
        expect(cv.getAttribute('download')).toBe(dict.cv.fileName)
    })
})

describe('Projets sans lien public', () => {
    it('affiche le titre sans lien ni bouton de dépôt ou de démo', async () => {
        vi.resetModules()
        vi.doMock('@/content/projects', () => ({
            projects: {
                fr: [{ title: 'Projet interne', description: 'Code privé.', technologies: ['Go'] }],
                en: [],
            },
        }))
        const { default: IsolatedProjects } = await import('./Projects')

        render(<IsolatedProjects locale="fr" />)

        expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Projet interne')
        expect(screen.queryAllByRole('link')).toHaveLength(0)
        vi.doUnmock('@/content/projects')
    })
})
