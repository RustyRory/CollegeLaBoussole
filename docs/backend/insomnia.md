# Tests API — Insomnia / Postman

---

## Prérequis — créer le premier admin en base

Sans utilisateur en base, impossible de se connecter. Lance cette commande MongoDB une seule fois :

```js
// dans mongosh
use college_laboussole
db.users.insertOne({
  email: "admin@college.fr",
  passwordHash: "$2a$12$...",
  role: "admin",
  isActive: true,
  isVerified: true,
  settings: {},
  createdAt: new Date(),
  updatedAt: new Date()
})
```

> Le `passwordHash` doit être généré avec bcrypt (factor 12). Utilise [bcrypt-generator.com](https://bcrypt-generator.com) ou une route `/api/auth/seed` temporaire.

---

## 1. Auth

| Méthode | URL                                    | Body JSON                                                   | Résultat attendu             |
| ------- | -------------------------------------- | ----------------------------------------------------------- | ---------------------------- |
| POST    | `http://localhost:5000/api/auth/login` | `{ "email": "admin@college.fr", "password": "motdepasse" }` | `200` + `{ token, role }`    |
| POST    | `http://localhost:5000/api/auth/login` | `{ "email": "inconnu@test.com", "password": "xxx" }`        | `401 Identifiants invalides` |

> Copie le `token` reçu — il sera utilisé dans tous les appels suivants via le header `Authorization: Bearer <token>`.

<img src="./images/insomnia-auth.png />

<img src="./images/insomnia-auth-ok.png />

---

## 2. Users _(token admin requis)_

| Méthode | URL              | Body JSON                                                                | Résultat attendu                                   |
| ------- | ---------------- | ------------------------------------------------------------------------ | -------------------------------------------------- |
| GET     | `/api/users`     | —                                                                        | `200` liste des utilisateurs (sans `passwordHash`) |
| POST    | `/api/users`     | `{ "email": "prof@college.fr", "password": "pass123", "role": "staff" }` | `201` + `{ id, email, role }`                      |
| GET     | `/api/users/:id` | —                                                                        | `200` utilisateur trouvé                           |
| PATCH   | `/api/users/:id` | `{ "isActive": false }`                                                  | `200` utilisateur mis à jour                       |
| DELETE  | `/api/users/:id` | —                                                                        | `204` (désactivation, pas suppression)             |

<img src="./images/insomnia-get-users.png />

<img src="./images/insomnia-post-user.png />

<img src="./images/insomnia-get-user-id.png />

<img src="./images/insomnia-patch-user-id.png />

<img src="./images/insomnia-delete-user-id.png />

---

## 3. Years _(token requis)_

| Méthode | URL              | Body JSON                                                                                         | Résultat attendu                        |
| ------- | ---------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------- |
| POST    | `/api/years`     | `{ "name": "2025-2026", "startDate": "2025-09-01", "endDate": "2026-07-04", "status": "active" }` | `201` + année créée                     |
| GET     | `/api/years`     | —                                                                                                 | `200` liste triée par date décroissante |
| PATCH   | `/api/years/:id` | `{ "status": "archived" }`                                                                        | `200` année mise à jour                 |
| DELETE  | `/api/years/:id` | —                                                                                                 | `204`                                   |

---

## 4. Classes _(nécessite un `yearId` et un `teacherId` valides)_

| Méthode | URL                | Body JSON                                                     | Résultat attendu                                 |
| ------- | ------------------ | ------------------------------------------------------------- | ------------------------------------------------ |
| POST    | `/api/classes`     | `{ "name": "6ème A", "yearId": "<id>", "teacherId": "<id>" }` | `201` + classe créée                             |
| GET     | `/api/classes`     | —                                                             | `200` liste avec `yearId` et `teacherId` peuplés |
| PATCH   | `/api/classes/:id` | `{ "name": "6ème B" }`                                        | `200` classe mise à jour                         |
| DELETE  | `/api/classes/:id` | —                                                             | `204`                                            |

---

## 5. Lectures _(nécessite un `classId` et un `teacherId` valides)_

| Méthode | URL                 | Body JSON                                                                                                                       | Résultat attendu                                  |
| ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| POST    | `/api/lectures`     | `{ "name": "Mathématiques", "classId": "<id>", "teacherId": "<id>", "day": "lundi", "startTime": "08:00", "endTime": "09:00" }` | `201` + cours créé                                |
| GET     | `/api/lectures`     | —                                                                                                                               | `200` liste avec `classId` et `teacherId` peuplés |
| PATCH   | `/api/lectures/:id` | `{ "day": "mardi" }`                                                                                                            | `200` cours mis à jour                            |
| DELETE  | `/api/lectures/:id` | —                                                                                                                               | `204`                                             |

---

## 6. Documents

| Méthode | URL                            | Body JSON                                                                             | Résultat attendu                               |
| ------- | ------------------------------ | ------------------------------------------------------------------------------------- | ---------------------------------------------- |
| POST    | `/api/documents`               | `{ "titre": "Règlement intérieur", "url": "/uploads/reglement.pdf", "type": "file" }` | `201` + document créé                          |
| GET     | `/api/documents`               | —                                                                                     | `200` documents à la racine (`folderId: null`) |
| GET     | `/api/documents?folderId=<id>` | —                                                                                     | `200` documents dans ce dossier                |
| GET     | `/api/documents/:id`           | —                                                                                     | `200` document trouvé                          |
| PATCH   | `/api/documents/:id`           | `{ "titre": "Nouveau nom" }`                                                          | `200` document mis à jour                      |
| DELETE  | `/api/documents/:id`           | —                                                                                     | `204`                                          |

---

## 7. Groups

| Méthode | URL                               | Body JSON                                         | Résultat attendu        |
| ------- | --------------------------------- | ------------------------------------------------- | ----------------------- |
| POST    | `/api/groups`                     | `{ "name": "Parents 6ème A", "type": "parents" }` | `201` + groupe créé     |
| GET     | `/api/groups`                     | —                                                 | `200` liste des groupes |
| POST    | `/api/groups/:id/members`         | `{ "userId": "<id>" }`                            | `201` membre ajouté     |
| DELETE  | `/api/groups/:id/members/:userId` | —                                                 | `204`                   |
| DELETE  | `/api/groups/:id`                 | —                                                 | `204`                   |

---

## Cas d'erreur à vérifier

| Cas                                                     | Résultat attendu                   |
| ------------------------------------------------------- | ---------------------------------- |
| Appel `/api/users` sans header `Authorization`          | `401 Token manquant`               |
| Appel avec un token expiré ou falsifié                  | `401 Token invalide ou expiré`     |
| Utilisateur `staff` qui appelle `DELETE /api/users/:id` | `403 Accès interdit`               |
| `POST /api/users` avec un email déjà existant           | `500` erreur duplicate key MongoDB |
| `GET /api/users/:id` avec un id inexistant              | `404 Utilisateur introuvable`      |
| `POST /api/auth/login` avec champs manquants            | `400 Email et mot de passe requis` |
