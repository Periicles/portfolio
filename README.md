# Paul Ragueneau — Portfolio

Portfolio personnel moderne et responsive, présentant mon parcours, mes projets et comment me contacter.

🔗 **En ligne : [paulragueneau.com](https://www.paulragueneau.com)**

## 🚀 Fonctionnalités

- **Navigation fixe** avec indicateur de section active (IntersectionObserver)
- **Sections claires** : À propos, Expérience, Projets, Contact
- **Mode sombre** via `next-themes` (préférence système respectée)
- **Responsive mobile** avec barre de navigation compacte

## 🛠️ Stack technologique

- **Framework** : [Next.js 16.1.0](https://nextjs.org/) (App Router, Turbopack)
- **Langage** : [TypeScript 5](https://www.typescriptlang.org/) en mode strict
- **Styles** : [Tailwind CSS 4](https://tailwindcss.com/)
- **Runtime** : [React 19.2.3](https://react.dev/)
- **Thème** : [next-themes](https://www.npmjs.com/package/next-themes/)
- **Linting** : [ESLint 9](https://eslint.org/) (flat config + `core-web-vitals` + `typescript`)
- **Déploiement** : [Vercel](https://vercel.com/)

### Stack présentée dans le portfolio

JavaScript · TypeScript · React · Next.js · Node.js · Angular · Java · Python · FastAPI · WordPress · Docker · PostgreSQL · MongoDB · Tailwind CSS · Git

## 📋 Composants

Le portfolio est composé des composants principaux suivants :

- `Navigation.tsx` — Navigation latérale/compacte, scroll-spy
- `About.tsx` — Présentation et bio
- `Experience.tsx` — Parcours professionnel
- `Projects.tsx` — Projets réalisés
- `Contact.tsx` — Prise de contact
- `ThemeToggle.tsx` — Bascule thème clair/sombre

## 🔍 SEO & Accessibilité

Le portfolio applique les bonnes pratiques attendues d'un site public en 2026 :

**SEO**
- `metadata` complète avec `openGraph`, `twitter`, `canonical`, `robots`, `themeColor` (`app/layout.tsx`)
- `/robots.txt` généré dynamiquement (`app/robots.ts`)
- `/sitemap.xml` généré dynamiquement (`app/sitemap.ts`)
- `/opengraph-image` (1200×630) généré au build via `next/og` `ImageResponse` (`app/opengraph-image.tsx`) — Next 16 injecte automatiquement `og:image` et `twitter:image`

**Accessibilité (WCAG 2.1 AA)**
- Un seul `<h1>` global, sections en `<h2 id="..."` référencées via `aria-labelledby`
- `aria-label` explicites sur les icônes et boutons
- Préfixes décoratifs ("01.", "02.", …) en `<p aria-hidden="true">` pour ne pas polluer la navigation lecteur d'écran
- `<html lang="fr">`, `prefers-color-scheme` respecté

**Sécurité (headers HTTP via `next.config.ts`)**
- Content-Security-Policy stricte (pas de script externe en prod)
- HSTS `max-age=2y; includeSubDomains; preload`
- COOP `same-origin`, CORP `same-origin`, X-Frame-Options `DENY`
- Permissions-Policy verrouillant caméra / micro / géoloc

## 🏃 Démarrage rapide

### Prérequis

- Node.js 18+

### Installation & développement

1. Installer les dépendances :

   ```bash
   npm install
   ```

2. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

La page se met à jour automatiquement lors de vos modifications.

## 📦 Build & production

Construire pour la production :

```bash
npm run build
```

Lancer le serveur de production :

```bash
npm start
```

## 🔧 Scripts disponibles

- `npm run dev` — Serveur de développement
- `npm run build` — Build de production
- `npm start` — Serveur de production
- `npm run lint` — ESLint

## 📐 Structure du projet

```text
/
├── app/
│   ├── components/         # Composants React
│   ├── layout.tsx          # Layout racine + metadata SEO
│   ├── page.tsx            # Page d'accueil
│   ├── opengraph-image.tsx # OG image dynamique 1200×630
│   ├── robots.ts           # Génère /robots.txt
│   ├── sitemap.ts          # Génère /sitemap.xml
│   ├── globals.css         # Styles globaux + Tailwind v4
│   └── favicon.ico
├── public/                 # Ressources statiques
├── types/                  # Déclarations TypeScript
├── next.config.ts          # Config Next.js + security headers
├── tailwind.config.ts      # Config Tailwind
├── tsconfig.json           # Config TypeScript
└── eslint.config.mjs       # Config ESLint
```

## 🎨 Design

Le portfolio mise sur un design sobre et lisible, avec navigation fixe, typographies contrastées et version mobile optimisée. Inspiration : design minimaliste de type "developer portfolio", accent teal sur fond slate en mode sombre.

## 📧 Contact

- 🌐 **Site** : [paulragueneau.com](https://www.paulragueneau.com)
- 💼 **LinkedIn** : [paul-ragueneau](https://www.linkedin.com/in/paul-ragueneau/)
- 🐙 **GitHub** : [@Periicles](https://github.com/Periicles)
- ✉️ **Email** : via le bouton **Écrire un message** sur la [section Contact du site](https://www.paulragueneau.com/#contact)
