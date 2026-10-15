import type { Locale } from './config'

const fr = {
    meta: {
        role: 'Développeur Web Fullstack',
        title: 'Paul Ragueneau — Développeur Web Fullstack · React/Next.js',
        description:
            'Développeur web fullstack en alternance (TypeScript, React, Next.js, Python), spécialisé dans le développement assisté par IA.',
        keywords: [
            'développeur web',
            'développeur fullstack',
            'TypeScript',
            'React',
            'Next.js',
            'Python',
            'FastAPI',
            'développement assisté par IA',
            'alternance',
            'portfolio',
        ],
        ogTagline: 'TypeScript · React · Next.js · Python · IA',
        ogBadge: 'En alternance chez Ceva Santé Animale',
    },
    status: {
        text: 'En alternance chez Ceva Santé Animale',
        detail: "jusqu'en septembre 2027",
    },
    skipLink: 'Aller au contenu principal',
    nav: {
        ariaLabel: 'Navigation principale',
        homeSuffix: 'accueil',
        items: {
            about: 'À propos',
            experience: 'Expérience',
            education: 'Formation',
            projects: 'Projets',
            contact: 'Contact',
        },
    },
    theme: {
        toggle: 'Changer de thème',
    },
    language: {
        target: 'en' as Locale,
        short: 'EN',
        label: 'Read this page in English',
    },
    cv: {
        label: 'Télécharger le CV',
        short: 'CV (PDF)',
        href: '/cv-paul-ragueneau.pdf',
        fileName: 'CV-Paul-Ragueneau.pdf',
    },
    about: {
        eyebrow: 'À propos',
        heading: 'Bonjour, je suis Paul. Ravi de vous rencontrer.',
        paragraphs: [
            "Je suis développeur web fullstack, actuellement en alternance chez Ceva Santé Animale en tant que Développeur Full Stack – AI Assisted Development. J'y conçois des applications métier de bout en bout, de l'interface jusqu'aux API, et je modernise des outils existants.",
            "Ma spécificité : tirer parti des outils d'IA comme Cursor et Claude Code pour livrer plus vite, sans transiger sur la qualité. Le code que je produis est contrôlé selon les standards SonarQube et OWASP Top 10, et je mesure l'impact de cette approche pour en démontrer la valeur.",
            "Auparavant, j'ai développé le frontend React/TypeScript d'un éditeur de newsletters chez H2V Solutions, et le backend Python/FastAPI d'une application de monitoring chez Metapolis. Je termine aujourd'hui mon mastère Dev Manager Full Stack à l'EFREI (2027).",
        ],
        skillsHeading: 'Technologies avec lesquelles je travaille',
    },
    experience: {
        eyebrow: 'Expérience',
        heading: 'Mon parcours',
    },
    education: {
        eyebrow: 'Formation',
        heading: 'Mon cursus',
        certificationsHeading: 'Certifications',
    },
    projects: {
        eyebrow: 'Projets',
        heading: 'Quelques réalisations',
        repoLabel: 'Dépôt du projet',
        demoLabel: 'Démo du projet',
    },
    contact: {
        eyebrow: 'Contact',
        heading: 'Entrons en contact',
        intro: [
            "En alternance chez Ceva Santé Animale jusqu'en septembre 2027, je reste ouvert aux échanges et aux opportunités pour la suite de mon parcours. Que vous ayez une question, une proposition ou simplement envie de discuter, n'hésitez pas à me contacter.",
            'Je suis particulièrement intéressé par les applications web évolutives, les API REST et le développement assisté par IA. Discutons de la façon dont je peux contribuer à votre équipe.',
        ],
        mailPrompt: 'Vous préférez votre client mail ?',
        mailLink: 'Écrivez-moi directement',
        otherHeading: 'Autres moyens de me contacter :',
    },
    form: {
        name: 'Nom',
        email: 'Email',
        message: 'Message',
        honeypot: 'Société',
        submit: 'Envoyer le message',
        sending: 'Envoi en cours…',
    },
    messages: {
        success: 'Merci, votre message a bien été envoyé. Je vous réponds rapidement.',
        generic: "L'envoi a échoué. Réessayez, ou écrivez-moi directement par email.",
        rateLimit: 'Trop de tentatives. Réessayez dans quelques minutes.',
        globalRateLimit: 'Trop de messages en ce moment. Réessayez dans quelques minutes.',
        invalidName: "Merci d'indiquer votre nom (2 à 100 caractères).",
        invalidEmail: "Merci d'indiquer une adresse email valide.",
        invalidMessage: 'Le message doit faire entre 10 et 5000 caractères.',
    },
}

export type Dictionary = typeof fr

const en: Dictionary = {
    meta: {
        role: 'Full-Stack Web Developer',
        title: 'Paul Ragueneau — Full-Stack Web Developer · React/Next.js',
        description:
            'Full-stack web developer on a work-study apprenticeship (TypeScript, React, Next.js, Python), focused on AI-assisted development.',
        keywords: [
            'web developer',
            'full-stack developer',
            'TypeScript',
            'React',
            'Next.js',
            'Python',
            'FastAPI',
            'AI-assisted development',
            'apprenticeship',
            'portfolio',
        ],
        ogTagline: 'TypeScript · React · Next.js · Python · AI',
        ogBadge: 'Apprentice at Ceva Santé Animale',
    },
    status: {
        text: 'Work-study apprentice at Ceva Santé Animale',
        detail: 'until September 2027',
    },
    skipLink: 'Skip to main content',
    nav: {
        ariaLabel: 'Main navigation',
        homeSuffix: 'home',
        items: {
            about: 'About',
            experience: 'Experience',
            education: 'Education',
            projects: 'Projects',
            contact: 'Contact',
        },
    },
    theme: {
        toggle: 'Toggle theme',
    },
    language: {
        target: 'fr',
        short: 'FR',
        label: 'Lire cette page en français',
    },
    cv: {
        label: 'Download CV',
        short: 'CV (PDF)',
        href: '/cv-paul-ragueneau-en.pdf',
        fileName: 'CV-Paul-Ragueneau-EN.pdf',
    },
    about: {
        eyebrow: 'About',
        heading: "Hi, I'm Paul. Nice to meet you.",
        paragraphs: [
            "I'm a full-stack web developer, currently on a work-study apprenticeship at Ceva Santé Animale as a Full Stack Developer – AI Assisted Development. I build business applications end to end, from the interface to the APIs, and modernize existing tools.",
            'What sets me apart: using AI tools such as Cursor and Claude Code to ship faster without compromising on quality. The code I write is checked against SonarQube and OWASP Top 10 standards, and I measure the impact of this approach to demonstrate its value.',
            "Previously, I built the React/TypeScript frontend of a newsletter editor at H2V Solutions, and the Python/FastAPI backend of a monitoring application at Metapolis. I'm now completing my Master's degree (Dev Manager Full Stack) at EFREI, graduating in 2027.",
        ],
        skillsHeading: 'Technologies I work with',
    },
    experience: {
        eyebrow: 'Experience',
        heading: 'Where I have worked',
    },
    education: {
        eyebrow: 'Education',
        heading: 'Academic background',
        certificationsHeading: 'Certifications',
    },
    projects: {
        eyebrow: 'Projects',
        heading: 'Selected work',
        repoLabel: 'Repository for',
        demoLabel: 'Live demo of',
    },
    contact: {
        eyebrow: 'Contact',
        heading: "Let's get in touch",
        intro: [
            "On a work-study apprenticeship at Ceva Santé Animale until September 2027, I'm open to conversations and opportunities for the next step of my career. Whether you have a question, a proposal or just want to chat, feel free to reach out.",
            "I'm particularly interested in scalable web applications, REST APIs and AI-assisted development. Let's talk about how I can contribute to your team.",
        ],
        mailPrompt: 'Prefer your own email client?',
        mailLink: 'Email me directly',
        otherHeading: 'Other ways to reach me:',
    },
    form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        honeypot: 'Company',
        submit: 'Send message',
        sending: 'Sending…',
    },
    messages: {
        success: "Thank you, your message has been sent. I'll get back to you shortly.",
        generic: 'Sending failed. Please try again, or email me directly.',
        rateLimit: 'Too many attempts. Please try again in a few minutes.',
        globalRateLimit: 'Too many messages right now. Please try again in a few minutes.',
        invalidName: 'Please enter your name (2 to 100 characters).',
        invalidEmail: 'Please enter a valid email address.',
        invalidMessage: 'Your message must be between 10 and 5000 characters.',
    },
}

const dictionaries: Record<Locale, Dictionary> = { fr, en }

export function getDictionary(locale: Locale): Dictionary {
    return dictionaries[locale]
}
