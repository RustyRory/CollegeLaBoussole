# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.0] - 2026-04-21

### Ajouté

- Site vitrine public (route group `(public)` avec layout partagé)
  - Layout public avec header et footer automatiques sur toutes les pages
  - Page d'accueil (`/`) — hero, pédagogie, statistiques, encadrement, partenaires, FAQ, CTA
  - Page Le collège (`/college`) — hero, histoire & projet éducatif, valeurs, chiffres, équipe, partenariats, CTA
  - Page Pédagogie (`/pedagogie`) — hero, méthodes pédagogiques, approche détaillée alternée, statistiques, CTA
  - Page Faire un don (`/don`) — hero avec lien HelloAsso, statistiques donateurs, projets financés, avantages fiscaux (66%), CTA
  - Page Contact (`/contact`) — formulaire de contact (nom, email, message), cartes d'information, CTA
  - Page Mentions légales (`/mentions-legales`) — 7 sections légales obligatoires (éditeur, hébergement, propriété intellectuelle, RGPD, cookies, responsabilité, liens)
- Composant `SiteHeader` — navbar sticky publique avec liens de navigation et bouton connexion
- Composant `SiteFooter` — footer avec logo, navigation, coordonnées, réseaux sociaux, liens légaux
- Composant `ContactForm` — formulaire client avec gestion d'état et appel API
- Composants réutilisables `home/stat-card` et `home/faq-item`
- Fichier `.env.example` dans le backend

### Modifié

- Renommage des composants en kebab-case (`accueil-form.tsx` → `home-page.tsx`, `statCard.tsx` → `stat-card.tsx`, `faqItem.tsx` → `faq-item.tsx`)
- Réorganisation du dossier `homePage/` → `home/`
- Architecture App Router restructurée avec route group `(public)` séparant les pages publiques du dashboard
- Correction du chemin des logos (`/assets/images/` → `/images/`) dans `login-form.tsx` et `app-sidebar.tsx`
- Règle ESLint `react/no-unescaped-entities` désactivée pour le frontend (projet en français)
- Script `prepare` mis à jour (`husky install` → `husky`)

### Corrigé

- Suppression des dépendances Linux spécifiques (`lightningcss-linux-x64-gnu`, `lightningcss-linux-x64-musl`) du `package.json` racine — rendait `npm install` impossible sur Windows
- Correction des entités HTML `&apos` (sans point-virgule) dans `home-page.tsx` remplacées par des apostrophes directes
- Correction du composant `Button` — `Slot.Root` remplacé par `Slot` (`@radix-ui/react-slot`)

---

## [0.2.0] - 2026-04-14

### Ajouté

- Mise en place du backoffice dashboard complet
  - Layout global avec SidebarProvider, AppSidebar, SidebarInset
  - Pages dashboard : users, years, classes, lectures, documents, groups
  - Page d’accueil avec statistiques globales
- Système de sidebar avancé
  - Sidebar responsive (desktop + mobile via Sheet)
  - Navigation principale, secondaire et utilisateur
  - Support collapse / expand + rail + shortcuts clavier
- Création d’un design system UI complet
  - Button (variantes CVA : default, outline, ghost, etc.)
  - Card, Input, Badge, Modal
  - Table, Tabs, Select, Checkbox, Label
  - Tooltip, Dropdown Menu, Avatar
  - Skeleton loaders
  - Field system (Field, FieldGroup, etc.)
- Composant Chart wrapper (Recharts + theming CSS)
  - Tooltip custom
  - Legend custom
  - Support thème light/dark via variables CSS
- Système d’authentification frontend
  - Hook useAuth
  - Redirection automatique selon rôle
  - Gestion token + logout
- Pages d’authentification
  - Login form
  - Signup form
- Backend complet (API REST)
  - Auth JWT
  - CRUD Users / Years / Classes / Lectures / Documents / Groups
  - Middleware auth et role
  - Modèles MongoDB (User, Class, Year, etc.)
- Documentation de tests API
  - Scénarios Insomnia / Postman complets
  - Exemples de requêtes CRUD
  - Cas d’erreurs documentés

### Modifié

- Architecture frontend réorganisée en modules (dashboard / ui / hooks)
- Centralisation des composants UI dans components/ui
- Amélioration du système de navigation dashboard
- Optimisation des layouts (responsive + inset variant)
- Structuration backend (routes + middleware + models séparés)

### Corrigé

- Corrections de structure sur plusieurs composants UI (sidebar, button, chart)
- Fix logique auth (redirections et gestion rôle)
- Corrections de typage TypeScript sur certains composants
- Ajustements de linting ESLint (hooks et imports)
- Stabilisation du build pre-commit (Husky + ESLint + Prettier)

### Supprimé

- Code UI redondant ou temporaire lors de la mise en place du dashboard
- Composants de test ou placeholders non utilisés dans le backoffice
- Anciennes structures de navigation simplifiées

---

## [0.1.0] - 2026-04-13

### Ajouté

- Workflow github
  - Vérification du nom de branche
  - Vérification de la présence d’une issue
  - Ajout automatique de labels à la PR
  - Vérification des messages de commit
  - Vérification de la structure du projet
    - Fichiers racine
      - README.md
      - CONTRIBUTING.md
      - INSTALL.md
      - LICENSE
    - Dossiers app
      - frontend
      - backend
    - Tests unitaires et build
    - Linting (ESLint / Prettier)
    - Pre-commit
    - Audit des dépendances
    - Release & versioning
  - Deploiement Automatique vers env test (branche main)
- Husky
  - Precommit
  - Prepush
- Documentation
  - workflow.md
  - uml
  - Cartographies
  - Data conception
  - Wireframes

- ***

## [Unreleased]

### Ajouté

-

### Modifié

-

### Corrigé

-

### Supprimé

-
