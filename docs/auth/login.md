# Page Login — Collège La Boussole

Page d'authentification du back office, construite avec **Next.js 16 + Tailwind CSS**, branchée sur l'API REST du backend.

---

## Structure des fichiers

```
src/
├── app/
│   └── login/
│       └── page.tsx              # Route /login
├── components/
│   ├── login-form.tsx            # Formulaire — logique + UI
│   └── ui/
│       ├── button.tsx            # Composant Button
│       ├── card.tsx              # Composants Card / CardContent
│       ├── input.tsx             # Composant Input
│       └── field.tsx             # Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator
└── lib/
    └── utils.ts                  # Utilitaire cn() pour les classes Tailwind
public/
└── assets/images/
    ├── logo.svg                  # Logo texte foncé (fond clair)
    └── logo-light.svg            # Logo texte blanc (fond sombre ou coloré)
```

---

## Variables d'environnement

Fichier `.env.local` à créer dans `collegeLaBoussoleApp/frontend/` :

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

En production (Docker), cette variable est injectée via les `ARG` du Dockerfile :

```env
NEXT_PUBLIC_API_URL=/collegelaboussole/api
```

---

## Page — `app/login/page.tsx`

Simple wrapper qui centre le formulaire sur toute la hauteur de l'écran avec un fond gris clair (`bg-zinc-100`).

```tsx
export default function LoginPage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-zinc-100 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
```

---

## Formulaire — `components/login-form.tsx`

Composant client (`"use client"`). Gère l'état du formulaire, l'appel API et la redirection.

### États

| State      | Type           | Rôle                                        |
| ---------- | -------------- | ------------------------------------------- |
| `email`    | string         | Valeur du champ email                       |
| `password` | string         | Valeur du champ mot de passe                |
| `error`    | string \| null | Message d'erreur affiché sous le formulaire |
| `loading`  | boolean        | Désactive le bouton pendant l'appel API     |

### Flux de connexion

1. L'utilisateur soumet le formulaire
2. `POST NEXT_PUBLIC_API_URL/auth/login` avec `{ email, password }`
3. **Succès** (`200`) → stocke `token` et `role` dans `localStorage`, redirige vers `/dashboard`
4. **Erreur API** (`401`, `400`…) → affiche `data.message`
5. **Erreur réseau** (fetch échoue) → affiche `"Impossible de contacter le serveur"`

### Layout

Le formulaire utilise une grille 2 colonnes sur desktop (`md:grid-cols-2`) :

| Colonne gauche                       | Colonne droite                                       |
| ------------------------------------ | ---------------------------------------------------- |
| Logo (`logo-light.svg`) + formulaire | Logo (`logo.svg`) sur fond blanc — masqué sur mobile |

---

## Composants UI

Tous les composants sont construits en **Tailwind CSS pur**, sans librairie externe.

### `Button`

Variantes : `default` (fond noir) et `outline` (fond blanc bordé).

### `Card` / `CardContent`

Conteneur avec bordure, ombre légère et coins arrondis.

### `Input`

Champ de saisie stylisé, avec focus ring et support dark mode.

### `Field` / `FieldGroup` / `FieldLabel` / `FieldDescription` / `FieldSeparator`

Wrappers sémantiques pour structurer les champs de formulaire :

- `FieldGroup` — conteneur vertical avec gap
- `Field` — wrapper d'un champ (label + input)
- `FieldLabel` — label associé à un `htmlFor`
- `FieldDescription` — texte secondaire (aide, mentions légales)
- `FieldSeparator` — séparateur horizontal avec texte centré

---

## Logos

| Fichier          | Usage                                                  |
| ---------------- | ------------------------------------------------------ |
| `logo.svg`       | Texte `#262320` (noir) — colonne droite sur fond blanc |
| `logo-light.svg` | Texte `#ffffff` (blanc) — en-tête du formulaire        |

Les deux fichiers sont identiques à l'exception de la couleur `.cls-1`. La boussole orange (`#d67043`) est conservée dans les deux versions.

---

## CORS

Le backend autorise les requêtes cross-origin via le middleware `cors` :

```ts
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:3000" }));
```

Variable à ajouter dans `.env` du backend :

```env
CORS_ORIGIN=http://localhost:3000
```

---

## Prochaines étapes

- Créer la page `/dashboard` (protégée)
- Ajouter un middleware Next.js (`middleware.ts`) qui vérifie le token JWT et redirige vers `/login` si absent
- Gérer le rafraîchissement du token (expiration 7 jours)
