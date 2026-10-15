# Paul Ragueneau — Portfolio

Portfolio personnel moderne et responsive, présentant mon parcours, mes projets et comment me contacter.

🔗 **En ligne : [paulragueneau.com](https://www.paulragueneau.com)**

## 🚀 Fonctionnalités

- **Bilingue FR / EN** : français à la racine (`/`), anglais sur `/en`, sélecteur de langue à côté du bouton de thème
- **Navigation fixe** avec indicateur de section active (IntersectionObserver)
- **Sections** : À propos, Expérience, Formation, Projets, Contact
- **Pastille de statut** à effet néon (désactivée si `prefers-reduced-motion`)
- **Formulaire de contact** via une Server Action et [Resend](https://resend.com/) : validation, honeypot, limitation de débit par IP et globale
- **CV téléchargeable** en PDF, dans la langue de la page
- **Mode sombre** via `next-themes` (préférence système respectée)
- **Responsive mobile** avec barre de navigation compacte

## 🛠️ Stack technologique

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router, Turbopack, rendu statique)
- **Runtime** : [React 19](https://react.dev/)
- **Langage** : [TypeScript 5](https://www.typescriptlang.org/) en mode strict
- **Styles** : [Tailwind CSS 4](https://tailwindcss.com/)
- **Thème** : [next-themes](https://www.npmjs.com/package/next-themes/)
- **Emails** : [Resend](https://resend.com/)
- **Tests** : [Vitest](https://vitest.dev/)
- **Linting** : [ESLint 9](https://eslint.org/) (flat config + `core-web-vitals` + `typescript`)
- **CI** : GitHub Actions (détection de secrets Gitleaks, tests, lint, build)
- **Déploiement** : [Vercel](https://vercel.com/) (+ Analytics et Speed Insights)

### Stack présentée dans le portfolio

- **Frontend** : TypeScript · JavaScript · React · Next.js · Tailwind CSS · Angular
- **Backend & données** : Node.js · Python · FastAPI · Java · Prisma · PostgreSQL · MongoDB
- **Apple** : Swift · SwiftUI
- **Outils & IA** : Git · GitHub Actions · Docker · SonarQube · Cursor · Claude Code · WordPress

## 📋 Composants

- `Navigation.tsx` — Navigation latérale / compacte, scroll-spy, CV, thème et langue
- `StatusBadge.tsx` — Pastille de statut à effet néon
- `About.tsx` — Présentation et stack par catégories
- `Experience.tsx` — Parcours professionnel
- `Education.tsx` — Formation et certifications
- `Projects.tsx` — Projets réalisés
- `Contact.tsx` / `ContactForm.tsx` — Prise de contact et formulaire
- `CvDownload.tsx` — Lien de téléchargement du CV
- `ThemeToggle.tsx` / `LanguageSwitcher.tsx` — Bascules thème et langue

## 🌍 Internationalisation

- Routes `app/[lang]` prérendues pour `fr` et `en` (`generateStaticParams`, `dynamicParams = false`), sans middleware
- `/` est réécrit vers `/fr` et `/fr` redirige vers `/` (`next.config.ts`) : une seule URL par contenu
- Textes d'interface dans `app/i18n/dictionaries.ts` (un test garantit que FR et EN gardent la même structure)
- Contenu (expériences, formation, compétences, projets) dans `app/content/`, une entrée par langue
- Page 404 globale bilingue (`app/global-not-found.tsx`)

**Ajouter ou modifier un texte** : éditer le dictionnaire ou le fichier de contenu concerné dans les deux langues.

## 🔍 SEO & Accessibilité

**SEO**
- `metadata` localisée par langue : `openGraph`, `twitter`, `canonical`, alternates `hreflang` (`fr`, `en`, `x-default`) (`app/[lang]/layout.tsx`)
- Données structurées JSON-LD `Person` + `WebSite` dérivées du contenu (`app/lib/structured-data.ts`)
- `/robots.txt` (`app/robots.ts`) et `/sitemap.xml` avec alternates de langue (`app/sitemap.ts`)
- Une image Open Graph 1200×630 par langue, générée au build via `next/og` (`app/[lang]/opengraph-image.tsx`)

**Accessibilité (WCAG 2.1 AA)**
- Un seul `<h1>` global, sections en `<h2 id="...">` référencées via `aria-labelledby`
- `aria-label` explicites sur les icônes et boutons
- Préfixes décoratifs (« 01 — », …) en `aria-hidden` pour ne pas polluer la lecture d'écran
- `<html lang>` selon la langue, `hrefLang` sur le sélecteur de langue
- `prefers-color-scheme` et `prefers-reduced-motion` respectés

**Sécurité**
- En-têtes HTTP via `next.config.ts` : CSP stricte (aucun script externe en prod), HSTS `max-age=2y; includeSubDomains; preload`, COOP et CORP `same-origin`, `X-Frame-Options: DENY`, Permissions-Policy verrouillée
- Formulaire : honeypot, limitation de débit par IP et globale, nettoyage du nom affiché contre l'injection d'en-têtes email
- CI : détection de secrets (Gitleaks) sur tout l'historique

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
