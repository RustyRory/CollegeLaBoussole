# Cahier des charges — Collège La Boussole

## 1. Contexte du projet

### 1.1 Présentation de l'association

Le Collège La Boussole est un établissement scolaire en cours de création, porté par une association. L'objectif principal est l'ouverture du collège en **septembre 2026**.

L'association est organisée en plusieurs comités :

- **Comité pédagogique**
- **Comité immobilier**
- **Comité communication / levée de fonds**
- **Comité social / RH / vie associative**

### 1.2 Situation actuelle

- Utilisation de Google Workspace
- Outils artisanaux et non centralisés
- Manque de compétences techniques au sein de l'équipe
- Besoin de structuration et de professionnalisation des outils numériques

---

## 2. Objectifs généraux

- Structurer et professionnaliser l'écosystème numérique du futur collège
- Créer une identité visuelle cohérente et attractive
- Développer un site web et potentiellement un service web
- Mettre en place une stratégie digitale
- Sécuriser les données
- Préparer l'équipe à l'utilisation des outils créés

---

## 3. Périmètre fonctionnel

### 3.1 Identité visuelle

- Refonte / amélioration du logo
- Extension de la charte graphique
- Définition des couleurs, typographies, symboliques, iconographie
- Création de templates (présentations, documents internes)

### 3.2 Site web

- Présentation du collège et des valeurs
- Informations pratiques
- Espace donateurs
- Espace familles / enseignants
- Accès administratifs
- Back-office simple
- Respect des normes RGPD et d'accessibilité

### 3.3 Communication interne

- Planning / calendrier partagé
- Notifications
- Accès sécurisé selon les profils (familles, enseignants, donateurs…)
- Outils de suivi (CRM, newsletters, statistiques)

### 3.4 Gestion de documents en interne

La solution devra permettre la gestion centralisée de fichiers via une interface web sécurisée, accessible depuis un navigateur et des applications clientes.

**Fonctionnalités attendues :**

- Stockage de fichiers et dossiers
- Téléversement et téléchargement de documents
- Organisation par arborescence de dossiers
- Synchronisation des fichiers entre plusieurs appareils
- Gestion des utilisateurs et des droits d'accès
- Partage de fichiers et dossiers (liens sécurisés, expiration, mot de passe)
- Historique des versions et corbeille
- Accès multi-utilisateurs
- Authentification sécurisée (mot de passe fort, 2FA en option)

La solution devra être utilisable comme un site web de gestion de fichiers, sans développement spécifique obligatoire.

### 3.5 Hébergement

**Choix de la solution d'hébergement** (décision à prendre parmi les trois options) :

| Fournisseur | Notes |
| ----------- | ----- |
| OVH         | —     |
| LWS         | —     |
| IONOS       | —     |

**Nom de domaine :** `collegelaboussole.org` (renouvelé via Google Workspace)
**Email de contact :** `contact@collegelaboussole.org`

**Exigences de sécurité et conformité :**

- Sécurisation des données personnelles
- Conformité RGPD
- Politique d'accès et de permissions
- Stockage sécurisé des documents et informations sensibles

---

## 4. Périmètre technique

### 4.1 Site web

Le site web reposera sur une architecture moderne de type **full-stack JavaScript**, permettant une maintenance facilitée, une évolutivité maîtrisée et de bonnes performances.

La solution devra être :

- Accessible depuis tous les navigateurs récents
- Responsive (ordinateur, tablette, mobile)
- Conforme aux exigences de sécurité, performance, accessibilité et protection des données personnelles

L'architecture technique distinguera clairement :

- le **front-end** (interface utilisateur)
- le **back-end** (logique métier et API)
- la **base de données** (stockage sécurisé des informations)

### 4.2 Technologies envisagées

#### Next.js (front-end)

Le front-end sera développé avec **Next.js**, framework React orienté performance et SEO.

Avantages :

- Rendu côté serveur (SSR) et/ou statique (SSG) pour de bonnes performances et un référencement optimal
- Navigation fluide et rapide
- Meilleure accessibilité grâce à une structure HTML sémantique
- Design responsive conforme aux normes d'accessibilité (WCAG / RGAA)
- Intégration facilitée des espaces sécurisés et des mécanismes d'authentification

#### Node.js (back-end)

Le back-end reposera sur **Node.js**, environnement d'exécution JavaScript côté serveur.

Avantages :

- Excellente performance pour la gestion des requêtes concurrentes
- Cohérence technologique entre front-end et back-end
- Grande flexibilité pour l'évolution des fonctionnalités

#### Express.js (API)

**Express.js** sera utilisé comme framework back-end pour la création de l'API.

Responsabilités :

- Gestion des routes et des endpoints sécurisés
- Mise en place des règles métier (utilisateurs, documents, dons, communications internes)
- Implémentation des mécanismes de sécurité (authentification, autorisations par rôles, protections contre les attaques courantes)
- Conformité RGPD (gestion des données personnelles, droits des utilisateurs)

#### MongoDB (base de données)

La base de données sera **MongoDB**, solution NoSQL orientée documents.

Avantages :

- Stockage flexible et structuré des données
- Évolution simple du modèle de données
- Bonnes performances en lecture et écriture
- Gestion sécurisée des données sensibles conforme RGPD

### 4.3 Architecture du site

#### Site public (accessible à tous)

```
Accueil
├── Le collège
│   ├── Présentation du collège
│   ├── Histoire et projet éducatif
│   ├── Valeurs et engagements
│   ├── Équipe pédagogique et administrative
│   └── Partenariats
├── Informations pratiques
│   ├── Coordonnées & plan d'accès
│   ├── Horaires
│   ├── Calendrier scolaire
│   ├── Règlement intérieur
│   ├── Modalités d'inscription
│   └── FAQ
├── Actualités & événements
│   ├── Actualités du collège
│   ├── Événements à venir
│   └── Archives
├── Soutenir le collège (Espace donateurs – partie publique)
│   ├── Pourquoi soutenir le collège
│   ├── Projets financés
│   ├── Faire un don (HelloAsso)
│   ├── Avantages fiscaux
│   └── Témoignages
└── Contact
    ├── Formulaire de contact
    ├── Coordonnées
    └── Mentions légales & politique de confidentialité
```

#### Espaces sécurisés (accès par compte)

**Espace Familles**

- Actualités internes
- Documents utiles (circulaires, autorisations, formulaires)
- Calendrier des classes
- Communication avec l'établissement
- Informations par niveau / classe

**Espace Enseignants**

- Documents pédagogiques
- Ressources internes
- Planning et réunions
- Communication interne
- Annonces administratives

**Espace Donateurs (privé)**

- Historique des dons
- Reçus fiscaux téléchargeables
- Suivi des projets soutenus
- Actualités dédiées aux donateurs

**Espace Administration (restreint)**

- Gestion des utilisateurs et rôles
- Gestion des contenus du site
- Gestion des documents internes
- Statistiques (visites, dons, téléchargements)
- Modération des communications internes

#### Back-office simplifié (pour l'équipe)

- Tableau de bord
- Gestion des pages et actualités
- Gestion des documents (classement par dossiers)
- Gestion des utilisateurs (familles, enseignants, donateurs)
- Envoi de messages / communications internes
- Paramètres RGPD (consentements, cookies, données personnelles)
- Paramètres d'accessibilité (contrastes, textes alternatifs)

#### Vue globale de l'architecture

```
Accueil
├── Le collège
├── Informations pratiques
├── Actualités
├── Soutenir le collège
├── Contact
├── Espace Familles (privé)
├── Espace Enseignants (privé)
├── Espace Donateurs (privé)
└── Administration (restreint)
    └── Back-office
```

### 4.4 Aspects transversaux obligatoires

#### RGPD

- Gestion des consentements
- Politique de confidentialité
- Droit d'accès / suppression des données
- Sécurité des données

#### Accessibilité (RGAA / WCAG)

- Navigation clavier
- Contrastes adaptés
- Textes alternatifs pour les images
- Structure sémantique claire
- Lisibilité et responsive design

### 4.5 Outils de design

**Outils envisagés :**

- **Figma** : création des maquettes et prototypes interactifs, collaboration en temps réel, partage avec les équipes et les parties prenantes
- **Outils complémentaires éventuels** : Illustrator, Photoshop, ou Canva pour les contenus graphiques ponctuels

**Objectifs :**

- Création des maquettes fonctionnelles et visuelles (desktop, tablette, mobile)
- Validation des interfaces avant intégration front-end
- Collaboration avec les développeurs pour assurer la faisabilité technique et la cohérence UI/UX
- Respect des normes accessibilité (WCAG / RGAA) et de la charte graphique de l'établissement

### 4.6 Infrastructure et hébergement (VPS)

La solution sera hébergée sur un **serveur privé virtuel (VPS)** dédié, permettant un contrôle total de l'environnement, des performances et de la sécurité.

**Composants hébergés sur le VPS :**

- Front-end Next.js
- Back-end Node.js / Express.js
- Base de données MongoDB
- Services de stockage de fichiers (documents internes)
- Services de sécurité et de supervision

**Caractéristiques attendues du VPS :**

- Système d'exploitation Linux (Debian ou Ubuntu LTS)
- Ressources dimensionnées (CPU, RAM, stockage évolutif)
- Accès administrateur (root)
- Haute disponibilité et fiabilité
- Scalabilité verticale

**Architecture de déploiement :**

- Environnements distincts : production, préproduction (si applicable), développement
- Services applicatifs (front-end, API) séparés des services de données
- Déploiement via services Node.js et/ou conteneurs Docker

**Sécurité de l'hébergement :**

- Accès sécurisé par clés SSH (mot de passe désactivé)
- Pare-feu système (ports strictement nécessaires ouverts)
- Chiffrement des communications (HTTPS / TLS)
- Séparation des rôles et des accès administratifs
- Protection contre les attaques courantes (brute force, DDoS, injections)
- Journalisation des accès et des actions sensibles
- Couche de sécurité externe optionnelle (CDN / pare-feu applicatif type Cloudflare)

**Sauvegardes et continuité de service :**

- Sauvegardes régulières de la base de données MongoDB et des fichiers stockés
- Sauvegardes stockées sur un support distinct du VPS
- Procédure de restauration documentée
- Politique de rétention conforme aux exigences réglementaires

**Conformité et localisation des données :**

- Hébergement conforme au RGPD
- Localisation des données maîtrisée (pays / zone géographique)
- Protection des données personnelles et sensibles contre tout accès non autorisé

---

## 5. Contraintes

| Contrainte       | Détail                                                         |
| ---------------- | -------------------------------------------------------------- |
| Délais           | Objectif d'ouverture en septembre 2026                         |
| Budget           | À préciser par l'association                                   |
| Niveau technique | Faible côté association — simplicité d'utilisation obligatoire |
| Légal            | Respect du RGPD, sécurité des données                          |
| Image            | Respect de l'image institutionnelle du collège                 |

---

## 6. Livrables

- Charte graphique complète
- Logo finalisé
- Maquettes UX/UI du site et de l'application
- Supports print et web
- Site web fonctionnel + back-office
- Documentation technique
- Guide utilisateur
- Plan de cybersécurité
- Formation pour l'équipe

---

## 7. Critères de validation

- Respect de la charte graphique
- Fonctionnalités opérationnelles
- Simplicité d'utilisation
- Sécurité vérifiée
- Conformité RGPD
- Performance du site
- Accessibilité (WCAG / RGAA)
- Satisfaction des utilisateurs finaux
- Respect des délais

---

## 8. Annexes

- Inspirations visuelles
- Exemples de sites de référence
- Documents fournis par l'association
- Notes des réunions
