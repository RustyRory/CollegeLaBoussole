# Contribuer au projet

Merci de ton intérêt pour ce projet 🎉
Ce document décrit les règles et bonnes pratiques à suivre pour contribuer efficacement.

## 📦 Présentation du projet

Ce projet est une application web full-stack composée de :

- Un **site vitrine** (Next.js)
- Un **back-office** d’administration
- Un **service interne de partage de fichiers**
- Une API **Node.js / Express**
- Une base de données **MongoDB**

L’objectif est de garantir un code lisible, maintenable et cohérent sur l’ensemble du projet.

---

## 🛠️ Prérequis

Avant de commencer, assure-toi d’avoir installé :

- **Node.js** (version recommandée : LTS)
- **npm** ou **yarn**
- **MongoDB** (local ou distant)
- **Git**

---

## 🚀 Installation du projet

```bash
git clone https://github.com/organisation/nom-du-projet.git
cd nom-du-projet
npm install
```

Créer un fichier .env à la racine du projet (voir .env.example) :

```bash
MONGODB_URI=
JWT_SECRET=
FILE_STORAGE_PATH=
```

Lancer le projet en mode développement :

```bash
npm run dev
```

---

## 🌱 Workflow Git

### Branches

- `main` : version stable en production
- `dev` : branche d’intégration
- `feat/*` : nouvelles fonctionnalités
- `fix/*` : corrections de bugs
- `hotfix/*` : maintenance, refactoring, configuration

👉 Toute contribution doit se faire via une **Pull Request** vers `dev`.

---

## 🧱 Structure du projet (exemple)

```
.
├── app/
│   ├── frontend/        # Next.js (vitrine + back office)
│   └── backend/         # Express API
├── docs/
└── README.md

```

---

## ✨ Bonnes pratiques de code

### Général

- Utiliser **ESLint** et **Prettier**
- Nommer clairement les variables et fonctions
- Éviter les fonctions trop longues
- Ajouter des commentaires uniquement si nécessaire

### Backend (Node / Express)

- Séparer routes, contrôleurs, services et modèles
- Valider les entrées utilisateur (ex : `Joi`, `Zod`)
- Gérer les erreurs proprement (middleware dédié)
- Ne jamais exposer de secrets dans le code

### Frontend (Next.js)

- Favoriser les composants fonctionnels
- Limiter la logique métier dans les composants
- Utiliser le SSR / SSG uniquement quand pertinent
- Respecter l’accessibilité (a11y)

---

## 📁 Service de partage de fichiers

- Les fichiers ne doivent **pas** être stockés dans le repo
- Vérifier la taille et le type des fichiers uploadés
- Gérer les droits d’accès côté API
- Logger les actions sensibles (upload / delete)

---

## 🧪 Tests

- Les nouvelles fonctionnalités doivent être testées
- Corriger un bug = ajouter un test si possible
- Lancer les tests avant toute Pull Request :

```bash
npm run test

```

---

## ✅ Pull Requests

Avant de soumettre une PR, vérifie que :

- Le code compile et fonctionne
- Les tests passent
- La PR est claire et ciblée
- Le titre décrit précisément le changement
- Le titre est associé à une issue

### Exemple de titre

```
feat(back-office): Fixes #3 - ajout de la gestion des utilisateurs

```

---

## 🐛 Signaler un bug

Merci d’ouvrir une **issue** en précisant :

- Le comportement attendu
- Le comportement observé
- Les étapes pour reproduire
- L’environnement (OS, navigateur, version Node)

---

## 🤝 Code de conduite

- Respect et bienveillance
- Feedback constructif uniquement
- Pas de propos offensants ou discriminants

---

## 📄 Licence

En contribuant à ce projet, tu acceptes que ton code soit publié sous la licence définie dans le fichier [`LICENSE`](/LICENSE).

Merci pour ta contribution 💙
