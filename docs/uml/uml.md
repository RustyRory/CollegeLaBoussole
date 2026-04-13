# USE CASE

---

<img src="./images/use-case.png />

---

# ACTIVITIES

---

## Authentification & accès

### Connexion utilisateur — saisie identifiants → vérification → redirection selon le rôle (famille, enseignant, donateur, admin)

<img src="./images/act-auth.png />

### Réinitialisation de mot de passe

<img src="./images/act-reset-pass.png />

### Inscription d'un nouvel utilisateur (par un admin)

<img src="./images/act-register.png />

---

## Site public

### Soumission du formulaire de contact

<img src="./images/act-contact-form.png />

### Processus de don — choix du montant → redirection HelloAsso → confirmation → reçu fiscal

<img src="./images/act-donation.png />

---

## Espace Familles / Enseignants

### Téléchargement d'un document — connexion → navigation → téléversement/téléchargement → journalisation

<img src="./images/act-download.png />

### Envoi d'une communication interne (message entre familles et établissement)

<img src="./images/act-com.png />

---

## Back-office / Administration

### Création / modification d'un contenu (actualité, page) — rédaction → validation → publication

<img src="./images/act-update-website.png />

### Gestion d'un utilisateur — création → attribution du rôle → notification → accès

<img src="./images/act-users.png />

### Modération d'une communication interne

<img src="./images/act-update-com.png />

### Export de statistiques (visites, dons, téléchargements)

<img src="./images/act-stats.png />

---

## Gestion documentaire

### Téléversement d'un document — upload → vérification du type/taille → classement → droits d'accès

<img src="./images/act-download.png />

### Partage d'un fichier (génération d'un lien sécurisé avec expiration)

<img src="./images/act-share.png />

### Restauration depuis la corbeille

<img src="./images/act-trash.png />

---

## RGPD & sécurité

### Gestion du consentement cookies (première visite → acceptation/refus → enregistrement)

<img src="./images/act-cookies.png />

### Demande de suppression de données (droit à l'oubli) — demande → vérification → traitement → confirmation

<img src="./images/act-data-management.png />

### Sauvegarde automatique des données (déclenchement → dump BDD → stockage distant → notification)

<img src="./images/act-data-save.png />

---

## Déploiement

### Pipeline CI/CD — push → tests → build → déploiement en préproduction → validation → production

<img src="./images/act-ci-cd.png />

---

# SEQUENCES

---

## Authentification & accès

### Connexion — Frontend → API → BDD → JWT → redirection selon rôle

<img src="./images/seq-auth.png />

### Réinitialisation de mot de passe — demande → email token → vérification → nouveau mdp

<img src="./images/seq-reset-pass.png />

### Inscription d'un utilisateur (par admin) — création → hachage mdp → email invitation

<img src="./images/seq-register.png />

---

## Site public

### Soumission formulaire de contact — Frontend → API → email (nodemailer/SMTP)

<img src="./images/seq-contact.png />

### Processus de don — Frontend → API → HelloAsso → callback → reçu fiscal

<img src="./images/seq-donation.png />

---

## Espace Familles / Enseignants

### Téléchargement d'un document — auth → vérif droits → BDD → stockage → stream fichier

<img src="./images/seq-download.png />

### Envoi d'une communication interne — message → modération → notification destinataire

<img src="./images/seq-com.png />

---

## Back-office / Administration

### Publication d'un contenu — rédaction → validation → BDD → mise en ligne

<img src="./images/seq-com.png />

### Gestion d'un utilisateur — création → BDD → email notification

<img src="./images/seq-users.png />

---

## Gestion documentaire

### Téléversement — upload → vérif type/taille → stockage → BDD métadonnées

<img src="./images/seq-upload.png />

### Partage d'un fichier — génération token signé → lien avec expiration → accès

<img src="./images/seq-share.png />

---

## RGPD & sécurité

### Consentement cookies — première visite → choix → localStorage/cookie

<img src="./images/seq-cookies.png />

### Demande suppression de données — requête → vérif identité → purge BDD → confirmation

<img src="./images/seq-rgpd.png />

---

## Déploiement

### Pipeline CI/CD — push GitHub → GitHub Actions → tests → build Docker → déploiement

<img src="./images/seq-cicd.png />

---

# CLASSES

---

<img src="./images/classes.png />
