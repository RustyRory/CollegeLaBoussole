# Dashboard Admin — Documentation

## Vue d'ensemble

Le dashboard admin est une interface de gestion complète pour les administrateurs du Collège La Boussole. Il permet de gérer les utilisateurs, les années scolaires, les classes, les cours, les documents et les groupes.

L'interface est construite avec **Next.js 16 App Router** et suit l'architecture visuelle de **shadcn/ui** (implémentée manuellement, sans CLI shadcn).

---

## Architecture

```
src/
├── app/
│   └── dashboard/
│       ├── layout.tsx          # Layout racine : SidebarProvider + AppSidebar + SidebarInset
│       ├── page.tsx            # Page d'accueil : statistiques globales
│       ├── users/page.tsx      # Gestion des utilisateurs
│       ├── years/page.tsx      # Gestion des années scolaires
│       ├── classes/page.tsx    # Gestion des classes
│       ├── lectures/page.tsx   # Gestion des cours
│       ├── documents/page.tsx  # Gestion des documents
│       ├── groups/page.tsx     # Gestion des groupes
│       └── enrollments/page.tsx # Gestion des candidatures d'inscription
├── components/
│   ├── dashboard/
│   │   ├── app-sidebar.tsx     # Sidebar principale avec logo et navigation
│   │   ├── nav-main.tsx        # Navigation principale (liens avec icônes)
│   │   ├── nav-secondary.tsx   # Navigation secondaire (Paramètres, Aide)
│   │   ├── nav-user.tsx        # Bloc utilisateur avec avatar et dropdown
│   │   ├── site-header.tsx     # En-tête de page avec toggle sidebar
│   │   └── section-cards.tsx   # Grille de cartes de statistiques
│   └── ui/
│       ├── sidebar.tsx         # Composant sidebar complet (SidebarProvider, useSidebar...)
│       ├── sheet.tsx           # Drawer mobile (Radix Dialog)
│       ├── button.tsx          # Bouton CVA avec variantes
│       ├── card.tsx            # Card, CardHeader, CardTitle, CardContent...
│       ├── avatar.tsx          # Avatar Radix UI
│       ├── dropdown-menu.tsx   # Menu déroulant Radix UI
│       ├── tooltip.tsx         # Tooltip Radix UI
│       ├── select.tsx          # Select Radix UI
│       ├── tabs.tsx            # Tabs Radix UI
│       ├── separator.tsx       # Séparateur Radix UI
│       ├── checkbox.tsx        # Case à cocher Radix UI
│       ├── label.tsx           # Label Radix UI
│       ├── table.tsx           # Table HTML stylée
│       ├── chart.tsx           # Wrapper recharts avec theming CSS
│       ├── input.tsx           # Champ texte
│       ├── modal.tsx           # Modal overlay (ESC pour fermer)
│       ├── badge.tsx           # Badge avec variantes (success, warning, danger...)
│       ├── field.tsx           # FieldGroup, Field, FieldLabel, FieldDescription
│       └── skeleton.tsx        # Squelette de chargement
└── hooks/
    └── use-mobile.ts           # Hook responsive (détecte < 768px)
```

---

## Layout (`layout.tsx`)

Le layout protège l'ensemble du dashboard via le hook `useAuth("admin")`. Si aucun token JWT valide n'est présent dans le `localStorage`, l'utilisateur est redirigé vers `/login`.

```tsx
<SidebarProvider>
  <AppSidebar user={user} />
  <SidebarInset>{children}</SidebarInset>
</SidebarProvider>
```

L'email et le rôle sont lus depuis le `localStorage` (sauvegardés lors de la connexion) pour alimenter le composant `NavUser`.

---

## Sidebar (`app-sidebar.tsx`)

La sidebar est **collapsible** (mode `offcanvas` : elle se masque complètement sur mobile et peut se replier sur desktop via `Ctrl+B` ou le bouton toggle).

### Navigation principale

| Route                  | Label            | Icône            |
| ---------------------- | ---------------- | ---------------- |
| `/dashboard`           | Tableau de bord  | `IconDashboard`  |
| `/dashboard/users`     | Utilisateurs     | `IconUsers`      |
| `/dashboard/years`     | Années scolaires | `IconCalendar`   |
| `/dashboard/classes`   | Classes          | `IconSchool`     |
| `/dashboard/lectures`  | Cours            | `IconBook`       |
| `/dashboard/documents` | Documents        | `IconFiles`      |
| `/dashboard/groups`    | Groupes          | `IconUsersGroup` |

### Navigation secondaire

| Route                 | Label      | Icône          |
| --------------------- | ---------- | -------------- |
| `/dashboard/settings` | Paramètres | `IconSettings` |
| `/dashboard/help`     | Aide       | `IconHelp`     |

### NavUser

Affiché en bas de la sidebar. Montre les initiales de l'utilisateur dans un avatar, son email et son rôle. Le menu déroulant propose :

- Mon profil
- Notifications
- **Se déconnecter** (supprime `token`, `role` et `email` du localStorage et redirige vers `/login`)

---

## En-tête de page (`site-header.tsx`)

Chaque page affiche un `SiteHeader` contenant :

- Le bouton toggle de la sidebar (`SidebarTrigger`)
- Un séparateur vertical
- Le titre de la page

---

## Page d'accueil (`page.tsx`)

Charge en parallèle le nombre d'entrées de chaque ressource via `Promise.allSettled` et les affiche dans une grille de 6 cartes (`SectionCards`) :

| Carte            | Couleur | API                  |
| ---------------- | ------- | -------------------- |
| Utilisateurs     | Bleu    | `GET /api/users`     |
| Années scolaires | Vert    | `GET /api/years`     |
| Classes          | Orange  | `GET /api/classes`   |
| Cours            | Violet  | `GET /api/lectures`  |
| Documents        | Rose    | `GET /api/documents` |
| Groupes          | Cyan    | `GET /api/groups`    |

---

## Pages CRUD

Chaque page de gestion suit le même pattern :

1. **Tableau** listant toutes les entrées avec leurs propriétés
2. **Bouton "Nouveau..."** ouvrant une modale de création
3. **Actions par ligne** : Modifier (ouvre la modale en mode édition) + Supprimer (confirmation `window.confirm`)
4. **Modale** avec formulaire contrôlé, gestion d'erreur et soumission vers l'API

Toutes les requêtes passent par le helper `apiFetch` (`src/lib/api.ts`) qui attache automatiquement le token JWT depuis le localStorage.

### Utilisateurs (`/dashboard/users`)

Champs : email, mot de passe (création uniquement), rôle.

Rôles disponibles : `admin`, `staff`, `parent`, `student`, `other`.

Actions supplémentaires : **Activer / Désactiver** un compte (`isActive`).

Badges de rôle :

| Rôle    | Variante         |
| ------- | ---------------- |
| admin   | danger (rouge)   |
| staff   | warning (orange) |
| parent  | success (vert)   |
| student | default (gris)   |

### Années scolaires (`/dashboard/years`)

Champs : nom (ex. `2025-2026`), date de début, date de fin, statut.

Statuts : `future` (À venir), `active` (Active), `archived` (Archivée).

### Classes (`/dashboard/classes`)

Champs : nom (ex. `6ème A`), année scolaire (select), professeur principal (select).

Les selects chargent les listes depuis `GET /api/years` et `GET /api/users`.

### Cours (`/dashboard/lectures`)

Champs : matière, classe (select), enseignant (select), jour de la semaine, heure de début, heure de fin.

Jours disponibles : `lundi` à `samedi`.

### Documents (`/dashboard/documents`)

Champs : titre, URL/chemin, type (`file` ou `folder`), tags (chaîne séparée par des virgules, convertie en tableau à l'envoi).

### Inscriptions (`/dashboard/enrollments`)

Page de gestion des **candidatures d'inscription** d'élèves.

**Onglets de filtre** : Toutes / En attente / Acceptées / Refusées (avec compteurs).

**Champs d'une candidature** : nom, prénom, date de naissance, email du parent/responsable, année scolaire souhaitée, notes internes.

**Modale "Traiter"** : permet à l'admin de choisir une décision et, si `Acceptée`, d'attribuer une classe à l'élève. Le champ classe n'apparaît que si la décision est `Acceptée`.

| Statut     | Badge                         |
| ---------- | ----------------------------- |
| `pending`  | warning (orange) — En attente |
| `approved` | success (vert) — Acceptée     |
| `rejected` | danger (rouge) — Refusée      |

**Backend** :

- Modèle : `EnrollmentRequest` (`src/models/EnrollmentRequest.ts`)
- Routes : `GET/POST /api/enrollments`, `GET/PATCH/DELETE /api/enrollments/:id`
- Accès : `admin` et `staff` (lecture + modification) ; suppression `admin` uniquement

---

### Groupes (`/dashboard/groups`)

Champs : nom, type.

Types disponibles :

| Valeur    | Label        |
| --------- | ------------ |
| `class`   | Classe       |
| `staff`   | Personnel    |
| `parents` | Parents      |
| `year`    | Année        |
| `custom`  | Personnalisé |
| `other`   | Autre        |

---

## Système de design

### Thème

Le thème est défini dans `globals.css` avec des variables CSS en format `oklch`, compatibles Tailwind v4. Il supporte le mode sombre via la classe `.dark`.

Variables clés : `--background`, `--foreground`, `--primary`, `--muted`, `--sidebar`, `--sidebar-accent`, `--border`, `--ring`, `--chart-1` à `--chart-5`.

### Packages UI

| Package                    | Usage                                                               |
| -------------------------- | ------------------------------------------------------------------- |
| `@radix-ui/react-*`        | Primitives accessibles (dialog, dropdown, tooltip, select, tabs...) |
| `@tabler/icons-react`      | Icônes de la navigation                                             |
| `class-variance-authority` | Variantes de composants (Button, Badge...)                          |
| `clsx` + `tailwind-merge`  | Utilitaire `cn()` pour fusionner les classes                        |
| `recharts`                 | Graphiques (wrapper `ChartContainer` avec theming CSS)              |
| `tw-animate-css`           | Animations CSS importées dans `globals.css`                         |

---

## Authentification

- Le token JWT est stocké dans `localStorage` à la connexion (`token`, `role`, `email`).
- Le hook `useAuth(role)` (dans `src/hooks/useAuth.ts`) vérifie la présence du token et le rôle. Si invalide, il redirige vers `/login`.
- Le layout du dashboard appelle `useAuth("admin")` — seuls les admins peuvent accéder.
- La déconnexion vide le localStorage et redirige vers `/login`.
