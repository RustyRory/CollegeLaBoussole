# Collège La Boussole — Plateforme Web

Site web et plateforme numérique du **Collège la boussole**.
Le projet vise à **structurer, moderniser et professionnaliser** la communication et la gestion des informations du collège.

---

## 🎯 Objectifs du projet

- Créer un **site web vitrine moderne et responsive**
- Centraliser les informations du collège
- Mettre en valeur les partenaires et les événements
- Fournir un **back-office simple**
- Poser une base technique solide et maintenable
- Elaborer un service web

---

## 🧱 Stack technique

### Frontend

- TODO

### Backend

- TODO

### Base de données

- TODO

### Dev & Qualité

- **Pre-commit** (lint + format automatique)
- GitHub Actions (CI/CD, releases)
- Conventional Commits

---

## 📂 Structure du projet

```
├── app/
│ ├── frontend/ # Application
│ └── backend/ # API
│
├── docs/ # Documentation de conception
│
├── .github/
│ └── workflows/ # GitHub Actions
│
├── INSTALL.md # Installation et setup du projet
├── CONTRIBUTING.md # Guide de contribution
├── CHANGELOG.md # Historique des versions
├── README.md # (ce fichier)
└── .pre-commit-config.yaml
```

---

## 📚 Documentation du projet

Toute la **conception fonctionnelle et technique** est centralisée dans le dossier `docs/`.

👉 **Point d’entrée recommandé** :

- 📖 [`docs/README.md`](docs/README.md)

### Contenu du dossier `docs/`

| Document                  | Description                                  |
| ------------------------- | -------------------------------------------- |
| 📄 Cahier des charges     | Vision, objectifs, périmètre fonctionnel     |
| 🔄 Workflow               | Git, branches, releases, CI/CD               |
| 🧩 UML                    | Diagrammes (cas d’usage, séquences, classes) |
| 🗺️ Cartographies          | Architecture applicative et flux             |
| 🎨 Maquettes              | UX/UI (desktop & mobile)                     |
| 🗄️ Conception des données | Dictionnaire, MCD, MLD, MPD                  |

---

## 🚀 Installation & démarrage

**Voir le guide** :
[`INSTALL.md`](/INSTALL.md)

Résumé rapide :

```bash
# Frontend
cd app/frontend
npm install
npm run dev

# Backend
cd app/backend
npm install
npm run dev
```

## 🧪 Qualité & linting

Le projet utilise pre-commit pour garantir la qualité du code :

- ESLint (frontend & backend)
- Prettier
- Lancement automatique avant chaque git commit

```
pre-commit install
```

## 🔁 Workflow Git

Branches : main, dev, feat/, fix/, hotfix/

Commits normalisés (Conventional Commits)

Releases automatiques via GitHub Actions

📘 Détails :
[`workflow.md`](docs/workflow/workflow.md)

## 🤝 Contribuer

Les contributions sont les bienvenues, même ponctuelles 🙌

📌 Merci de lire avant toute contribution :
[`CONTRIBUTING.md`](/CONTRIBUTING.md)

## 📈 Suivi & évolutions

Vérifier les l'historique du projet :
[`Projet Github`](https://github.com/users/RustyRory/projects/19)

## 🛡️ Sécurité & conformité

- TODO

## 📄 Licence

Projet développé bénévolement pour une association sportive.
Licence à définir :
[`LICENCE`](/LICENSE)

## ❤️ Remerciements

Projet porté par une équipe bénévole du club.
