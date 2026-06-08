# Rapport d'intervention — B3 Développeur Web
## Collège La Boussole · MyDigitalProject 2025–2026

---

## Sommaire

1. [Contexte et périmètre](#1-contexte-et-périmètre)
2. [Jalon 1 — Études et analyse](#2-jalon-1--études-et-analyse)
3. [Jalon 2 — Conception](#3-jalon-2--conception)
4. [Jalon 3 — Réalisation](#4-jalon-3--réalisation)
5. [Jalon 4 — Livraison](#5-jalon-4--livraison)
6. [État d'avancement et périmètre restant](#6-état-davancement-et-périmètre-restant)
7. [Bilan technique](#7-bilan-technique)

---

## 1. Contexte et périmètre

### 1.1 Le projet

Le **Collège La Boussole** est un établissement scolaire en cours de création, porté par une association dont l'ouverture est prévue en **septembre 2027**. La mission confiée à l'équipe projet est de structurer et professionnaliser l'écosystème numérique de ce futur collège.

Le projet se divise en trois grands volets :

| Volet | Description |
|---|---|
| **Site vitrine** | Présentation publique du collège, espace donateurs, formulaire de contact |
| **Plateforme web interne** | Espaces sécurisés par rôle (admin, staff, famille, élève), gestion documentaire |
| **Service web** | Communication interne type messagerie / partage de documents |

### 1.2 Contexte de développement

Le développement back-end et une partie du front-end ont été réalisés en quasi-autonomie. La conception graphique (maquettes Figma) a été fournie en dehors des délais prévus, ce qui a contraint à réaliser l'intégration du site vitrine sur du temps personnel. Des arbitrages ont également été nécessaires sur les maquettes reçues afin d'assurer la cohérence UX (simplification de l'arborescence des CTA, réduction de la densité de solicitations aux dons).

---

## 2. Jalon 1 — Études et analyse

### 2.1 Analyse du besoin utilisateur

L'association dispose de **Google Workspace** comme seul outil centralisé, avec des pratiques hétérogènes selon les comités (pédagogique, immobilier, communication/levée de fonds, social/RH). Les besoins identifiés sont :

- **Site public** : vitrine institutionnelle, espace donateurs intégré (HelloAsso), formulaire de contact
- **Espace sécurisé** : accès différencié selon le rôle (admin, staff, parent, élève)
- **Gestion documentaire** : arborescence de dossiers, droits d'accès par utilisateur ou groupe
- **Communication interne** : messagerie ou partage de documents entre membres de l'établissement

Le public cible est peu technique côté association — la **simplicité d'utilisation** est une contrainte forte, au même titre que la conformité **RGPD**.

### 2.2 Analyse de la solution d'hébergement

Deux environnements ont été identifiés :

**Environnement de test (staging)**

Le VPS de test mis à disposition dans le cadre du projet est opérationnel à l'adresse `78.138.58.95`. Il sert de cible au pipeline de déploiement continu depuis la branche `staging`.

**Environnement de production (proposé)**

La solution retenue est **Oracle Cloud Free Tier** (Always Free) :
- 2 instances ARM Ampere A1 (4 CPU / 24 Go RAM au total)
- 200 Go de stockage bloc
- Réseau et bande passante inclus sans surcoût

Cette solution est suffisante pour les besoins d'un collège en phase de lancement, sans coût d'hébergement. Elle respecte la contrainte budgétaire de l'association et permet une montée en charge progressive. La localisation des données (datacenter EU) garantit la conformité RGPD.

---

## 3. Jalon 2 — Conception

### 3.1 Choix et justification des technologies (MVP)

#### Architecture cible

L'architecture retenue est de type **full-stack JavaScript**, permettant une cohérence technologique entre front-end et back-end, et facilitant la maintenance future.

| Couche | Technologie | Justification |
|---|---|---|
| Front-end | **Next.js 15** (App Router) | SSR/SSG pour le SEO, routing intégré, composants React, support TypeScript natif |
| Back-end | **Express 5 + TypeScript** | Léger, flexible, parfaitement adapté à une API REST, écosystème npm vaste |
| Base de données | **MongoDB + Mongoose** | Schéma flexible pour un modèle de données évolutif, ODM typé avec Mongoose |
| UI | **Tailwind CSS v4 + Radix UI** | Composants accessibles sans style imposé, composants construits manuellement (sans CLI shadcn) |
| Auth | **JWT (jsonwebtoken + bcryptjs)** | Stateless, compatible avec une API REST, gestion des rôles simplifiée |
| Déploiement | **Docker + Docker Compose** | Environnement identique entre dev, staging et production |
| CI/CD | **GitHub Actions** | Pipeline automatisé intégré au repository |

#### Validation du périmètre MVP

Compte tenu des contraintes de temps, le périmètre de développement a été priorisé ainsi :

| Priorité | Fonctionnalité | Statut |
|---|---|---|
| P0 | Site vitrine public (pages statiques) | ✅ Réalisé |
| P0 | API REST (auth, users, classes, cours, documents, groupes) | ✅ Réalisé |
| P0 | Dashboard admin (CRUD complet) | ✅ Réalisé (à refactoriser) |
| P0 | Conception BDD (MCD/MLD) | ✅ Réalisé |
| P1 | Pipeline CI/CD + déploiement staging | ✅ Réalisé |
| P1 | Dashboards par rôle (staff, famille, élève) | 🔄 En cours |
| P2 | Service web (messagerie / partage docs) | 🔄 À finaliser |
| P2 | Déploiement production | 🔄 À réaliser |

### 3.2 Modélisation des données

La conception de la base de données est documentée dans les fichiers suivants :

- [MCD](./data-conception/mcd.md) — Modèle Conceptuel de Données (diagramme Mermaid + détail des entités et associations)
- [MLD](./data-conception/mld.md) — Modèle Logique de Données

#### Entités principales

| Entité | Rôle |
|---|---|
| `User` | Compte unique pour tous les profils (admin, staff, parent, student) |
| `StaffProfile` / `ParentProfile` / `StudentProfile` | Profils étendus liés à `User` |
| `Year` | Année scolaire |
| `Class` | Classe rattachée à une année et un professeur principal |
| `Lecture` | Cours : matière, horaire, classe, enseignant |
| `Register` | Table d'inscription élève ↔ classe |
| `Document` | Fichier ou dossier avec arborescence auto-référentielle |
| `Permission` / `DocumentShare` | Droits d'accès polymorphiques (user ou group) |
| `Group` | Groupe transversal (classe, staff, parents, etc.) |
| `EnrollmentRequest` | Candidature d'inscription d'un élève |

### 3.3 Diagrammes UML

Les diagrammes UML sont centralisés dans [docs/uml/uml.md](./uml/uml.md) et couvrent :

- **Use Case** : acteurs et fonctionnalités par rôle
- **Diagrammes d'activités** : authentification, processus de don, gestion documentaire, CI/CD, RGPD
- **Diagrammes de séquences** : flux API (auth, documents, contact, HelloAsso)
- **Diagramme de classes** : architecture des modèles

### 3.4 Architecture applicative

```
collegelaboussole.org
│
├── / (site public — Next.js SSG/SSR)
│   ├── /college          — Présentation de l'établissement
│   ├── /pedagogie        — Approche pédagogique
│   ├── /don              — Espace donateurs (HelloAsso)
│   ├── /contact          — Formulaire de contact
│   └── /mentions-legales — Mentions légales & RGPD
│
├── /login                — Authentification JWT
│
└── /dashboard            — Back-office (protégé par rôle)
    ├── /                 — Tableau de bord (statistiques)
    ├── /users            — Gestion des utilisateurs
    ├── /years            — Années scolaires
    ├── /classes          — Classes
    ├── /lectures         — Emploi du temps
    ├── /documents        — Gestion documentaire
    ├── /groups           — Groupes
    └── /enrollments      — Candidatures d'inscription

API REST — Express 5
├── /api/auth             — Authentification
├── /api/users            — CRUD utilisateurs (admin)
├── /api/years            — CRUD années scolaires
├── /api/classes          — CRUD classes
├── /api/lectures         — CRUD cours
├── /api/documents        — CRUD documents
├── /api/groups           — CRUD groupes + membres
└── /api/enrollments      — CRUD candidatures d'inscription
```

---

## 4. Jalon 3 — Réalisation

### 4.1 Site vitrine public

Le site vitrine est une application **Next.js 15** avec App Router, rendu hybride (SSG pour les pages statiques). Il est responsive (mobile-first) et respecte la charte graphique fournie par l'équipe design.

**Pages réalisées :**

| Route | Contenu |
|---|---|
| `/` | Page d'accueil — hero, valeurs, présentation rapide |
| `/college` | Présentation détaillée du collège |
| `/pedagogie` | Approche pédagogique |
| `/don` | Espace donateurs — intégration HelloAsso |
| `/contact` | Formulaire de contact |
| `/mentions-legales` | Mentions légales et politique de confidentialité |

**Arbitrages UX réalisés :**

Les maquettes initiales présentaient une densité importante de call-to-action liés aux dons. Pour garantir une expérience utilisateur équilibrée et éviter l'effet "clickbait", l'intégration a été rééquilibrée : les CTA de dons sont conservés mais regroupés sur des zones dédiées, sans saturation des autres pages.

### 4.2 API REST — Back-end

L'API est construite avec **Express 5 + TypeScript + Mongoose**, documentée dans [docs/backend/backend.md](./backend/backend.md).

**Points techniques notables :**

- **Authentification** : JWT (HS256, expiration 7 jours), hachage bcrypt factor 12
- **Contrôle des rôles** : middleware `requireRole()` sur toutes les routes sensibles
- **Soft delete** : les utilisateurs ne sont pas supprimés physiquement (`isActive: false`)
- **Index MongoDB** : index d'unicité sur les combinaisons critiques (`(userId, classId)`, `(parentId, studentId)`, `(name, yearId)`)
- **Permissions polymorphiques** : `Permission` et `DocumentShare` référencent soit un `User` soit un `Group` via le champ `subjectType`

**Sécurité API :**

- Variables d'environnement pour les secrets (JWT, URI MongoDB)
- CORS configuré avec variable `CORS_ORIGIN`
- Protection contre les erreurs 500 exposant des données internes

### 4.3 Dashboard d'administration

Le dashboard est documenté dans [docs/dashboard/admin.md](./dashboard/admin.md).

**Fonctionnalités réalisées :**

- Layout protégé (`useAuth("admin")`) avec sidebar collapsible
- Page d'accueil avec statistiques en temps réel (compteurs par ressource)
- CRUD complet : utilisateurs, années scolaires, classes, cours, documents, groupes
- Gestion des candidatures d'inscription (onglets de filtre, traitement avec attribution de classe)
- Système de design cohérent : Tailwind v4 + Radix UI, mode sombre, composants CVA

**Statut :** Fonctionnel. Une refactorisation est prévue pour améliorer la maintenabilité avant la livraison finale.

### 4.4 Tests

Les tests unitaires et fonctionnels sont en cours de mise en place. Le pipeline CI vérifie :

- ESLint (front-end et back-end)
- Prettier
- Audit des dépendances npm (`npm audit --audit-level=high`)
- Build des images Docker

### 4.5 Workflow et qualité

Le workflow Git est documenté dans [docs/workflow/workflow.md](./workflow/workflow.md).

| Mécanisme | Outil | Rôle |
|---|---|---|
| Branches | `feature/*` → `dev` → `main` | Isolation des développements |
| Commits | Conventional Commits | Traçabilité et changelog automatique |
| PR | GitHub Rulesets | Protection de `main` et `dev` |
| CI | GitHub Actions | Lint, tests, audit sécurité |
| CD | GitHub Actions → VPS Monitor | Déploiement automatique sur staging |
| Pre-commit | Python pre-commit | Validation locale avant push |
| Releases | GitHub Actions | Tags sémantiques automatiques (SemVer) |

---

## 5. Jalon 4 — Livraison

### 5.1 Pipeline de déploiement

Le déploiement est automatisé via **GitHub Actions** et déclenché sur push vers la branche `staging` :

```
push → staging
  └─ GitHub Actions (deploy.yml)
       └─ POST /api/webhook/deploy → vps-monitor
            └─ Pull image Docker + restart containers
```

Le `vps-monitor` est un service interne développé en parallèle qui gère les déploiements sur le VPS via webhook sécurisé (token Bearer).

**Environnement staging :** `78.138.58.95` (VPS de test)

### 5.2 Architecture Docker

```yaml
services:
  frontend:   # Next.js — port 3000 (interne)
  backend:    # Express — port 5000 (interne)
  mongodb:    # MongoDB — port 27017 (interne uniquement)
  # Reverse proxy : Nginx ou Caddy (à configurer en production)
```

Les conteneurs sont isolés dans un réseau Docker interne. La base de données n'est jamais exposée directement.

### 5.3 Sécurité de l'infrastructure

| Mesure | Statut |
|---|---|
| Accès SSH par clé (mot de passe désactivé) | ✅ |
| HTTPS / TLS (certificat Let's Encrypt) | 🔄 À configurer en production |
| Pare-feu (ports 22, 80, 443 uniquement) | ✅ Staging |
| Secrets en variables d'environnement | ✅ |
| Base de données non exposée | ✅ |
| Audit npm automatique | ✅ CI |

### 5.4 Solution de production proposée

**Oracle Cloud Free Tier (Always Free)**

- **Région** : EU (Frankfurt ou Amsterdam) — conformité RGPD
- **Compute** : 4 OCPU ARM + 24 Go RAM (largement suffisant pour un début)
- **Stockage** : 200 Go bloc + 20 Go object storage
- **Réseau** : 10 To/mois sortant inclus
- **Coût** : 0 € (gratuit de manière permanente, pas d'essai limité dans le temps)

Cette solution permet à l'association de démarrer sans engagement financier en infrastructure, avec la possibilité de migrer vers une offre payante si les besoins évoluent.

---

## 6. État d'avancement et périmètre restant

### 6.1 Ce qui est livré

| Livrable | État |
|---|---|
| Site vitrine public (6 pages) | ✅ Terminé |
| API REST (7 ressources, auth JWT, RBAC) | ✅ Terminé |
| Conception BDD — MCD / MLD | ✅ Terminé |
| Modèles Mongoose (14 modèles) | ✅ Terminé |
| Dashboard admin (CRUD complet) | ✅ Fonctionnel (refacto à faire) |
| Diagrammes UML (use case, activités, séquences, classes) | ✅ Terminé |
| Pipeline CI/CD (lint, audit, déploiement staging) | ✅ Terminé |
| Déploiement staging (VPS test) | ✅ Opérationnel |
| Documentation technique (backend, dashboard, auth, BDD, workflow) | ✅ Terminé |

### 6.2 Ce qui reste à faire

| Tâche | Priorité |
|---|---|
| Dashboards par rôle (staff, famille, élève) | Haute |
| Service web — messagerie / partage de documents | Haute |
| Refactorisation dashboard admin | Moyenne |
| Configuration Nginx + HTTPS production | Haute |
| Déploiement production (Oracle Cloud) | Haute |
| Tests unitaires et fonctionnels | Moyenne |
| Guide utilisateur (back-office) | Moyenne |
| Procès-verbal de recettage | Basse |

### 6.3 Justification de l'état d'avancement

Le développement a été mené en autonomie sur les parties back-end, conception BDD, dashboard et CI/CD. Les maquettes du site vitrine ont été reçues hors délai, ce qui a décalé la phase d'intégration et contraint à travailler sur du temps personnel pour respecter les jalons. Le périmètre prévu est techniquement cohérent et la base est solide — les fonctionnalités manquantes sont identifiées et planifiées.

---

## 7. Bilan technique

### 7.1 Ce que le projet démontre

- Maîtrise d'une **architecture full-stack JavaScript** (Next.js + Express + MongoDB)
- Conception d'un **modèle de données normalisé** adapté à un établissement scolaire
- Mise en place d'un **système d'authentification et de contrôle des rôles** sécurisé
- Mise en œuvre d'un **pipeline CI/CD complet** (lint, audit, déploiement automatisé)
- Respect des bonnes pratiques : Conventional Commits, protection des branches, variables d'environnement, soft delete
- Capacité à **arbitrer techniquement** face à des contraintes (maquettes tardives, travail en autonomie)

### 7.2 Axes d'amélioration identifiés

- Compléter la couverture de tests (actuellement absente sur les routes métier)
- Finaliser les dashboards par rôle pour couvrir l'ensemble du périmètre fonctionnel
- Documenter la procédure de restauration des sauvegardes MongoDB
- Mettre en place le monitoring de l'infrastructure de production

---

*Document rédigé par : **Damien Paszkiewicz** — B3 Développeur Web*
*Projet : My Digital Project 2025–2026 — MyDigitalSchool*
