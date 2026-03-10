# Workflow.md – Présentation du workflow

---

# GitHub – Règles de protection des branches

Ce document décrit **pas à pas** la configuration des **Rulesets GitHub** afin de protéger les branches selon le workflow conventionnel :

- `feature/*` → `dev`
- `release/*` → `main` (merge via PR après validation de version)
- `hotfix/*` → `main` (merge via PR avec patch automatique et synchronisation dev)

---

## Objectifs

- ❌ Aucun push direct sur `main` et `dev`
- ✅ Push libre sur `feature/*`
- ✅ Merges uniquement via **Pull Request**
- ✅ Sécurisation des branches critiques
- ✅ Vérification automatique de la structure, du changelog, des messages de commit et des versions

---

## Workflow cible

```
feature/* → PR → dev
dev → PR → main (vérification release)
release/* → PR → main
hotfix/* → PR → main → PRauto main → dev
```

---

## Pré-requis

- Être **Admin** ou **Owner** du repository
- GitHub Cloud
- Utilisation des **Rulesets** (nouvelle interface GitHub)
- Python + `pre-commit` pour validation locale

---

## Accès à la configuration

1. Ouvrir le repository GitHub
2. Aller dans **Settings → Rules → Rulesets**
3. Cliquer sur **New ruleset**
4. Choisir **Branch ruleset**

---

## Ruleset : Protection de `main`

### Nom

```
protect-main
```

### Target branches

```
main
```

### Règles

- ✅ Restrict deletions et force pushes
- ✅ Require pull request avant merge
  - Minimum approvals : 1 ou 2
  - (Optionnel) Require review from Code Owners
  - (Recommandé) Dismiss stale approvals
- ✅ Require status checks (tests, lint, CI/CD)
- ✅ Require conversation resolution
- (Optionnel) Require signed commits
- ❌ Ne pas autoriser les push directs

---

## Ruleset : Protection de `dev`

### Nom

```
protect-dev
```

### Target branches

```
dev
```

### Règles

- ❌ Allow direct pushes
- ✅ Require pull request avant merge
- ✅ Require status checks
- ✅ Restrict force pushes et deletions

---

## Ruleset : Branches de features

### Nom

```
allow-feature-push
```

### Target branches

```
feature/*
feat/*
```

### Règles

- ❌ Require pull request
- ❌ Require approvals
- ❌ Require status checks
- ❌ Restrict pushes

> Les développeurs peuvent pousser librement sur ces branches.

---

## Ruleset : Branches de release

### Nom

```
protect-release
```

### Target branches

```
release/*
```

### Règles

- ❌ Allow force pushes
- ❌ Allow deletions
- ❌ Allow direct pushes (optionnel selon politique)
- ✅ Require pull request vers `main` après validation de version SemVer (`x.y.z`)

---

## Ruleset : Branches de hotfix

### Nom

```
protect-hotfix
```

### Target branches

```
hotfix/*
```

### Règles

- ❌ Allow direct pushes, force pushes et deletions
- ✅ Require pull request vers `main`
- ✅ PR merge déclenche patch automatique (`x.y.z+1`) et PR auto `main → dev`

---

## Ordre et comportement des Rulesets

- GitHub applique **toutes les règles correspondantes**
- Les règles les plus restrictives gagnent
- Vérifier dans `Settings → Rules → Rulesets`

---

## Tests recommandés

### Push interdit

```bash
git push origin main
git push origin dev
```

### Push autorisé

```bash
git push origin feature/ma-feature
```

### Flux valide

```
feature/* → dev via PR
dev → main via PR (version mineure vérifiée)
hotfix/* → main via PR + patch automatique
```

---

# Workflow – YAML

### Objectif

- Git propre et sécurisé
- Branches cohérentes
- Issues traçables
- Validation commits, PR, changelog et version
- Releases automatisées (hotfix et release)

### Ce que GitHub fera

- Bloquer les erreurs
- Automatiser les tâches répétitives
- Forcer les bonnes pratiques

---

## Étapes du workflow

### Vérification du nom de branche

- `.github/workflows/branch-name.yml`
- Valide les formats :
  ```
  feature/<issue-id>-short-description
  fix/<issue-id>-short-description
  hotfix/<issue-id>-short-description
  release/<x.y.z>
  ```
- Bloque PR et affiche un message clair si invalide

---

### Vérification de la présence d’une issue

- `.github/workflows/ticket.yml`
- Vérifie que le nom de PR ou de branche contient `#<numéro>`
- Bloque PR si aucune référence

---

### Ajout automatique de labels

- `.github/workflows/labels.yml`
- Ajoute label selon type de branche : `feature`, `fix`, `hotfix`, `release`
- ⚠️ Avertit si aucun label ajouté

---

### Vérification des messages de commit

- `.github/workflows/commit-message.yml`
- Format :
  ```
  type(nom): Fixes#<issue> - message
  ```
- Blocage push/PR si non respecté
- Exemple :
  ```
  feat(login):Fixes#3 - Ajout page logindocs(readme):Fixes#6 - Mise à jour du READMEfix(api):Fixes#10 - Correction timeout APIhotfix(prod):Fixes#12 - Correction crash production
  ```
- **Ajout de logs explicatifs** pour guider le développeur

---

### Vérification de la structure du projet

- `.github/workflows/structure.yml`
- Fichiers racine : `README.md`, `CONTRIBUTING.md`, `INSTALL.md`, `LICENSE`
- Dossiers : `frontend` et `backend`
- Blocage PR si manquant

---

### Tests unitaires et build

- `.github/workflows/tests.yml`
- Backend et frontend :
  ```bash
  cd app/backend && npm install && npmtestcd ../frontend && npm install && npmtest
  ```
- Blocage PR si tests échouent

---

### Linting (ESLint / Prettier)

- `.github/workflows/lint.yml`
- Vérifie style et cohérence
- Blocage PR si non respecté

---

### Pre-commit

- Local : `.pre-commit-config.yaml`
- Vérifie avant commit : lint, tests, structure, messages de commit
- Installation :
  ```bash
  python3 -m venv .venvsource .venv/bin/activate# mac/linux
  pip install pre-commit
  pre-commit install
  ```
- Test :
  ```bash
  pre-commit run --all-files
  ```

---

### Audit des dépendances

- `.github/workflows/audit.yml`
- Vérifie sécurité npm (`npm audit --audit-level=high`)
- Blocage PR si vulnérabilités critiques

---

### Hotfix & Release Automation

### Hotfix

- `.github/workflows/hotfix-release.yml`
- PR hotfix merge vers `main`
- Patch automatique (`x.y.z+1`)
- Tag & GitHub Release créés
- PR automatique `main → dev` pour synchronisation

### Release

- `.github/workflows/release-validation.yml`
- PR `dev → main`
- Vérification CHANGELOG et dernier tag
- Nouvelle version mineure (`x.y+1.0`)
- Tag & GitHub Release

---

## ÉTAPE 11 — Pré-commit (Validation locale avant push)

### Qu’est-ce que `pre-commit` ?

`pre-commit` est un outil qui exécute automatiquement des vérifications avant chaque commit Git.

Il permet de s’assurer que le code respecte le **workflow**, les **standards de commit**, la **structure du projet**, le **linting**, les **tests**, et même la **sécurité des dépendances** avant d’envoyer des changements sur une branche distante.

> Cela permet de détecter les erreurs **avant** qu’elles n’atteignent `dev` ou `main`.

---

### Installation

1. Créer un environnement Python pour isoler pre-commit :

```bash
python3 -m venv .venvsource .venv/bin/activate# mac/linux
```

2. Installer pre-commit :

```bash
pip install pre-commit
```

3. Activer le hook Git :

```bash
pre-commit install
```

- Cela ajoute un hook dans `.git/hooks/pre-commit`.
- Tous les développeurs du projet auront les mêmes validations.

---

### Hooks configurés pour ce projet

| Hook              | Description                                                                                              | Chemin / scope                               |
| ----------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `commit-msg`      | Vérifie que le message de commit respecte la convention `type(scope): Fixes #<issue> - message`          | Tous les commits                             |
| `branch-name`     | Vérifie que le nom de branche respecte la convention (`feature/*`, `fix/*`, `hotfix/*`, `release/x.y.z`) | Branche courante                             |
| `frontend-lint`   | ESLint + Prettier sur `frontend`                                                                         | `collegeLaBoussoleApp/frontend`              |
| `backend-lint`    | ESLint + Prettier sur `backend` et fichiers `.md`                                                        | `collegeLaBoussoleApp/backend`               |
| `check-structure` | Vérifie la présence des fichiers racine et des dossiers `frontend` / `backend`                           | Racine du projet                             |
| `run-tests`       | Lance les tests unitaires frontend et backend                                                            | `collegeLaBoussoleApp/frontend` et `backend` |
| `npm-audit`       | Vérifie la sécurité des packages npm (`npm audit --audit-level=high`)                                    | `frontend` et `backend`                      |

---

### Fonctionnement

1. Ajouter les fichiers au commit :

```bash
git add .
```

2. Faire le commit :

```bash
git commit -m"feat(login): Fixes #12 - Ajout page login"
```

3. Déclenchement automatique :
   - `pre-commit` exécute tous les hooks configurés.
   - Si un hook échoue, le commit est **bloqué**.
   - Un message clair explique **quoi corriger**.
4. Si tout passe, le commit est accepté et peut être poussé vers le repository.

---

# Règles à retenir

- 1 issue = 1 branche
- Pas de push sur `main` ou `dev`
- Pas de merge sans PR
- Hotfix → patch automatique
- Release → version mineure automatique
- Fichiers obligatoires présents

---

# Diagramme visuel (mis à jour)

```
           ┌───────────────┐
           │ Issue github  │
           └─────┬─────────┘
                 │
                 ▼
           ┌──────────────┐
           │ Créer branche│
           │ feature/*    │
           │ fix/*        │
           │ hotfix/*     │
           │ release/*    │
           └─────┬────────┘
                 │
                 ▼
           ┌─────────────┐
           │ Ouvrir PR   │
           │ vers dev    │
           └─────┬───────┘
                 │
        ┌────────┴─────────┐
        │ Workflow GitHub   │
        │ CI/CD checks      │
        └────────┬─────────┘
                 │
      ┌──────────┴───────────┐
      │ Vérification branche, │
      │ commit et issue       │
      └──────────┬───────────┘
                 │ OK
                 ▼
          ┌─────────────┐
          │ Ajout labels│
          └──────┬──────┘
                 │
                 ▼
          ┌─────────────┐
          │ PR mergée   │
          │ sur main    │
          └──────┬──────┘
                 │
                 ▼
        ┌─────────────────────┐
        │ Hotfix → patch + PR │
        │ main → dev           │
        └─────────┬───────────┘
                 │
                 ▼
       ┌─────────────────────┐
       │ Release → version   │
       │ mineure x.y+1.0     │
       └─────────────────────┘
```

---
