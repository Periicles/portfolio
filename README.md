# Paul Ragueneau - Portfolio

Portfolio personnel moderne et responsive, présentant mon parcours, mes projets et comment me contacter.

## 🚀 Fonctionnalités

- **Navigation fixe** avec indicateur de section active
- **Sections claires**: À propos, Expérience, Projets, Contact
- **Mode sombre** via `next-themes`
- **Responsive mobile** avec barre de navigation compacte

## 🛠️ Stack Technologique

- **Framework**: [Next.js 16.1.0](https://nextjs.org/)
- **Langage**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styles**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Runtime**: [React 19.2.3](https://react.dev/)
- **Thème**: [next-themes](https://www.npmjs.com/package/next-themes/)
- **Linting**: [ESLint 9](https://eslint.org/)

### Technologies Clés Présentées

- Next.js
- React
- TypeScript
- Docker
- PostgreSQL

## 📋 Composants

Le portfolio est composé des composants principaux suivants:

- `About.tsx` - Présentation et bio
- `Experience.tsx` - Parcours professionnel
- `Projects.tsx` - Projets réalisés
- `Contact.tsx` - Prise de contact
- `Navigation.tsx` - Navigation latérale/compacte
- `ThemeToggle.tsx` - Bascule thème clair/sombre

## 🏃 Démarrage Rapide

### Prérequis

- Node.js 18+ installé

### Installation & Développement

1. Installer les dépendances:

```bash
npm install
```

1. Lancer le serveur de développement:

```bash
npm run dev
```

1. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur

La page se mettra à jour automatiquement lors de vos modifications.

## 📦 Build & Production

Construire pour la production:

```bash
npm run build
```

Lancer le serveur de production:

```bash
npm start
```

## 🔧 Scripts Disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Construire pour la production
- `npm start` - Lancer le serveur de production
- `npm run lint` - Exécuter ESLint

## 📐 Structure du Projet

```markdown
/
├── app/
│   ├── components/        # Composants React réutilisables
│   ├── layout.tsx         # Layout racine
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── public/                # Ressources statiques
├── package.json           # Dépendances
├── tsconfig.json          # Configuration TypeScript
└── next.config.ts         # Configuration Next.js
```

## 🎨 Design

Le portfolio mise sur un design sobre et lisible, avec navigation fixe,
typographies contrastées et version mobile optimisée.

## 📧 Contact

Veuillez me contacter via la section Contact du site.
