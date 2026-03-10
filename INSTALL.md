[B3_My Digital Project Guide de référence 2025-2026.pdf](attachment:4efdf341-7df2-41f4-8b31-1abb594713c4:B3_My_Digital_Project_Guide_de_rfrence_2025-2026.pdf)

# Installation du projet

Ce document décrit les étapes nécessaires pour installer et lancer le projet en local.

---

## 🧩 Présentation rapide

Application web full-stack comprenant :

- Site vitrine (**Next.js**)
- Back-office d’administration
- API (**Node.js / Express**)
- Base de données (**MongoDB**)
- Service interne de partage de fichiers

---

## 🛠️ Prérequis

Assure-toi d’avoir installé les outils suivants :

- **Node.js** (version LTS recommandée)
- **npm** ou **yarn**
- **MongoDB** (local ou cloud)
- **Git**

Vérifier les versions :

```bash
node -v
npm -v
mongo --version
```

## 📥 Récupération du projet

```bash
gitclone https://github.com/organisation/nom-du-projet.git
cd nom-du-projet
```

---

## 📦 Installation des dépendances

```bash
npm install
```

ou

```bash
yarn install
```

---

## ⚙️ Configuration des variables d’environnement

Créer un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.example`.

### Exemple de `.env`

```
# Environnement
NODE_ENV=development

# API
API_PORT=4000
API_BASE_URL=http://localhost:4000

# Base de données
MONGODB_URI=mongodb://localhost:27017/nom_du_projet

# Authentification
JWT_SECRET=change_me

# Fichiers
FILE_STORAGE_PATH=./storage
MAX_FILE_SIZE=10485760
```

⚠️ **Ne jamais versionner le fichier `.env`**

---

## 🗂️ Initialisation des dossiers

Créer les dossiers nécessaires au stockage des fichiers :

```bash
mkdir storage
mkdir storage/uploads
```

---

## ▶️ Lancement du projet

### Mode développement

```bash
npm run dev
```

Ce mode lance :

- le front Next.js
- l’API Express
- le back-office

---

### Mode production

```bash
npm run build
npm run start
```

---

## 🌐 Accès aux services

| Service      | URL                         |
| ------------ | --------------------------- |
| Site vitrine | http://localhost:3000       |
| Back-office  | http://localhost:3000/admin |
| API          | http://localhost:4000       |

---

## 🧪 Tests

Lancer l’ensemble des tests :

```bash
npm runtest
```

---

## 🐞 Problèmes courants

### MongoDB ne démarre pas

- Vérifier que le service MongoDB est actif
- Vérifier l’URI dans le fichier `.env`

### Upload de fichiers impossible

- Vérifier les permissions du dossier `storage`
- Vérifier la taille maximale autorisée

---

## 🔄 Mise à jour du projet

```bash
git pull
npm install
```

---

## 📄 Documentation complémentaire

- [`README.md`](/README.md) – vue d’ensemble du projet
- [`CONTRIBUTING.md`](/CONTRIBUTING.md) – règles de contribution
- [`LICENSE`](/LICENSE) – licence du projet

---

## ✅ Installation terminée

Le projet est maintenant prêt à être utilisé 🚀

En cas de problème, merci d’ouvrir une issue.
