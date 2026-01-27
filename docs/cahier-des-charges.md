Contexte du projet

- Présentation de l’association
- Organisation par comités (pédagogique, immobilier, communication/levée de fonds, social/RH/vie associative)
- Objectif : ouverture du collège en septembre 2026
- Situation actuelle (Google Workspace, outils artisanaux, manque de compétences techniques)

Objectifs généraux

- Structurer et professionnaliser l’écosystème numérique du futur collège
- Créer une identité visuelle cohérente et attractive
- Développer un site web et potentiellement un service web
- Mettre en place une stratégie digitale
- Sécuriser les données
- Préparer l’équipe à l’utilisation des outils créés

Périmètre fonctionnel

Identité visuelle

- Refonte/amélioration du logo
- Extension de la charte graphique
- Définition des couleurs, typographies, symboliques, iconographie
- Création de templates (présentations, documents internes)

Site web

- Présentation du collège et des valeurs Informations pratiques
- Espace donateurs
- Espace familles / enseignants
- Accès administratifs
- Back-office simple
- Respect des normes RGPD et d’accessibilité
- Communication interne
- Planning / calendrier
- Notifications
- Accès sécurisé selon les profils (familles, enseignants, donateurs…)
- Outils de suivi (CRM, newsletters, statistiques)

Gestion de documents en interne

La solution devra permettre la **gestion centralisée de fichiers** via une **interface web sécurisée**, accessible depuis un navigateur et des applications clientes.

Fonctionnalités attendues :

- Stockage de fichiers et dossiers
- Téléversement et téléchargement de documents
- Organisation par arborescence de dossiers
- Synchronisation des fichiers entre plusieurs appareils
- Gestion des utilisateurs et des droits d’accès
- Partage de fichiers et dossiers (liens sécurisés, expiration, mot de passe)
- Historique des versions et corbeille
- Accès multi-utilisateurs
- Authentification sécurisée (mot de passe fort, 2FA en option)

La solution devra être utilisable comme un **site web de gestion de fichiers**, sans développement spécifique obligatoire.

Périmètre technique

Site web

Le site web reposera sur une architecture moderne de type **full-stack JavaScript**, permettant une maintenance facilitée, une évolutivité maîtrisée et de bonnes performances.

La solution devra être accessible depuis tous les navigateurs récents, responsive (ordinateur, tablette, mobile) et conforme aux exigences de sécurité, de performance, d’accessibilité et de protection des données personnelles.

L’architecture technique distinguera clairement :

- le **front-end** (interface utilisateur),
- le **back-end** (logique métier et API),
- la **base de données** (stockage sécurisé des informations).

Technologies envisagées

*NextJs*

Le front-end du site sera développé avec **Next.js**, framework React orienté performance et SEO.

Next.js permettra :

- Le **rendu côté serveur (SSR)** et/ou statique (SSG), garantissant de bonnes performances et un référencement naturel optimal ;
- Une navigation fluide et rapide pour les utilisateurs ;
- Une meilleure accessibilité grâce à une structure HTML sémantique ;
- La mise en place d’un design responsive et conforme aux normes d’accessibilité (WCAG / RGAA).

Next.js facilitera également l’intégration des espaces sécurisés (familles, enseignants, donateurs, administration) et des mécanismes d’authentification.

*NodeJs*

Le back-end reposera sur **Node.js**, environnement d’exécution JavaScript côté serveur.

Node.js offrira :

- une excellente performance pour la gestion des requêtes concurrentes ;
- une cohérence technologique entre le front-end et le back-end ;
- une grande flexibilité pour faire évoluer les fonctionnalités (gestion documentaire, communication interne, dons, etc.).

*ExpressJs*

**Express.js** sera utilisé comme framework back-end pour la création de l’API.

Il permettra :

- la gestion des routes et des endpoints sécurisés ;
- la mise en place des règles métiers (gestion des utilisateurs, documents, dons, communications internes) ;
- L’implémentation des mécanismes de sécurité (authentification, autorisations par rôles, protections contre les attaques courantes) ;
- la conformité RGPD (gestion des données personnelles, droits des utilisateurs).

*MongoDB*

La base de données sera basée sur **MongoDB**, solution NoSQL orientée documents.

MongoDB permettra :

- un stockage flexible et structuré des données (utilisateurs, documents, contenus, dons, messages internes) ;
- une évolution simple du modèle de données en fonction des besoins futurs ;
- de bonnes performances pour les opérations de lecture et d’écriture ;
- une gestion sécurisée des données sensibles, conforme aux exigences RGPD.

Architecture du site

*Site public (accessible à tous)*

Accueil

- Message de bienvenue
- Actualités principales
- Accès rapides (inscriptions, contact, espace familles, dons)

Le collège

- Présentation du collège
- Histoire et projet éducatif
- Valeurs et engagements
- Équipe pédagogique et administrative
- Partenariats

Informations pratiques

- Coordonnées & plan d’accès
- Horaires
- Calendrier scolaire
- Règlement intérieur
- Modalités d’inscription
- FAQ

Actualités & événements

- Actualités du collège
- Événements à venir
- Archives

Soutenir le collège (Espace donateurs – partie publique)

- Pourquoi soutenir le collège
- Projets financés
- Faire un don (hello asso)
- Avantages fiscaux
- Témoignages

Contact

- Formulaire de contact
- Coordonnées
- Mentions légales & politique de confidentialité

*Espaces sécurisés (accès par compte)*

Espace Familles

- Actualités internes
- Documents utiles (circulaires, autorisations, formulaires)
- Calendrier des classes
- Communication avec l’établissement
- Informations par niveau/classe

Espace Enseignants

- Documents pédagogiques
- Ressources internes
- Planning et réunions
- Communication interne
- Annonces administratives

Espace Donateurs (privé)

- Historique des dons
- Reçus fiscaux téléchargeables
- Suivi des projets soutenus
- Actualités dédiées aux donateurs

*Accès administratifs (restreint)*

Espace Administration

- Gestion des utilisateurs et rôles
- Gestion des contenus du site
- Gestion des documents internes
- Statistiques (visites, dons, téléchargements)
- Modération des communications internes

*Back-office (pour l’équipe)*

Back-office simplifié

- Tableau de bord
- Gestion des pages et actualités
- Gestion des documents (classement par dossiers)
- Gestion des utilisateurs (familles, enseignants, donateurs)
- Envoi de messages / communications internes
- Paramètres RGPD (consentements, cookies, données personnelles)
- Paramètres d’accessibilité (contrastes, textes alternatifs)

*Aspects transversaux (obligatoires)*

RGPD

- Gestion des consentements
- Politique de confidentialité
- Droit d’accès / suppression des données
- Sécurité des données

Accessibilité (RGAA / WCAG)

- Navigation clavier
- Contrastes adaptés
- Textes alternatifs pour images
- Structure sémantique claire
- Lisibilité et responsive design

*Schéma simplifié (vue globale)*

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

Outils de design

Le projet utilisera des outils de design professionnels afin de garantir la cohérence visuelle, l’ergonomie et l’accessibilité de la plateforme.

Outils envisagés

- **Figma** : création des maquettes et prototypes interactifs, collaboration en temps réel, partage avec les équipes et les parties prenantes.
- **Autres outils éventuels** : Illustrator, Photoshop, ou Canva pour les contenus graphiques ponctuels.

Objectifs et périmètre

- Création des **maquettes fonctionnelles et visuelles** (desktop, tablette, mobile)
- Validation des interfaces avant intégration front-end
- Collaboration avec les développeurs pour assurer la **faisabilité technique** et la **cohérence UI/UX**
- Respect des normes **accessibilité (WCAG / RGAA)** et **charte graphique** de l’établissement

Infrastructure et hébergement (VPS)

La solution sera hébergée sur un **serveur privé virtuel (VPS)** dédié, permettant un contrôle total de l’environnement, des performances et de la sécurité.

Le VPS hébergera l’ensemble des composants techniques de la plateforme :

- le front-end Next.js,
- le back-end Node.js / Express.js,
- la base de données MongoDB,
- les services de stockage de fichiers (documents internes),
- les services de sécurité et de supervision.

Caractéristiques attendues du VPS

Le VPS devra répondre aux exigences suivantes :

- Système d’exploitation Linux (distribution stable type Debian ou Ubuntu LTS)
- Ressources dimensionnées pour les besoins actuels et futurs :
- CPU dédié ou partagé
- Mémoire RAM suffisante
- Espace de stockage évolutif
- Accès administrateur (root) pour la configuration et la maintenance
- Haute disponibilité et fiabilité de l’infrastructure
- Possibilité d’évolution des ressources (scalabilité verticale)

Architecture de déploiement

L’architecture d’hébergement distinguera clairement :

- les environnements **production**, **préproduction** (si applicable) et **développement**,
- les services applicatifs (front-end, API),
- les services de données (base de données, stockage de fichiers).

Les composants applicatifs pourront être déployés :

- via des services Node.js exécutés sur le VPS,
- et/ou à l’aide de conteneurs (Docker) afin de faciliter la maintenance et les mises à jour.

Sécurité de l’hébergement

Le VPS devra intégrer les mesures de sécurité suivantes :

- Accès sécurisé par clés SSH (mot de passe désactivé)
- Pare-feu système (ports strictement nécessaires ouverts)
- Chiffrement des communications (HTTPS / TLS)
- Séparation des rôles et des accès administratifs
- Protection contre les attaques courantes (brute force, DDoS, injections)
- Journalisation des accès et des actions sensibles

Une couche de sécurité externe (ex : CDN / pare-feu applicatif type Cloudflare) pourra être mise en place pour renforcer la protection du site et masquer l’adresse IP du VPS.

Sauvegardes et continuité de service

La solution devra prévoir :

- des sauvegardes régulières :
- de la base de données MongoDB,
- des fichiers et documents stockés,
- des sauvegardes stockées sur un support distinct du VPS,
- une procédure de restauration documentée,
- une politique de rétention des sauvegardes conforme aux exigences réglementaires.

Conformité et localisation des données

- L’hébergement devra être conforme au RGPD
- La localisation des données (pays / zone géographique) devra être maîtrisée
- Les données personnelles et sensibles devront être protégées contre tout accès non autorisé

Contraintes

- Délais (objectif ouverture 2026)
- Budget (à préciser par l’association)
- Niveau technique faible côté association
- Obligation de simplicité d’utilisation
- Respect légal (données, sécurité, RGPD)
- Image institutionnelle

Livrables

- Charte graphique complète
- Logo finalisé
- Maquettes UX/UI du site + de l’application
- Supports print et web
- Site web fonctionnel + back-office
- Documentation technique
- Guide utilisateur
- Plan de cybersécurité
- Formation pour l’équipe

Critères de validation

- Respect de la charte graphique
- Fonctionnalités opérationnelles
- Simplicité d’utilisation
- Sécurité vérifiée
- Conformité RGPD
- Performance du site
- Accessibilité
- Satisfaction des utilisateurs finaux
- Respect des délais

Annexes

- Inspirations visuelles
- Exemples de sites de référence
- Documents fournis par l’association
- Notes des réunions