# Backend — Collège La Boussole

API REST construite avec **Express 5 + TypeScript + MongoDB (Mongoose)**, déployée via Docker.

---

## Stack technique

| Outil         | Rôle                      |
| ------------- | ------------------------- |
| Express 5     | Framework HTTP            |
| TypeScript    | Typage statique           |
| Mongoose      | ODM MongoDB               |
| bcryptjs      | Hachage des mots de passe |
| jsonwebtoken  | Authentification JWT      |
| dotenv        | Variables d'environnement |
| tsx / nodemon | Dev live-reload           |

---

## Structure des fichiers

```
src/
├── server.ts            # Point d'entrée — connexion MongoDB + routes
├── middleware/
│   ├── auth.ts          # Vérification du JWT (requireAuth)
│   └── role.ts          # Contrôle des rôles (requireRole)
├── models/              # Schémas Mongoose
│   ├── User.ts
│   ├── StaffProfile.ts
│   ├── ParentProfile.ts
│   ├── StudentProfile.ts
│   ├── ParentStudent.ts
│   ├── Year.ts
│   ├── Class.ts
│   ├── Register.ts
│   ├── Lecture.ts
│   ├── Document.ts
│   ├── DocumentShare.ts
│   ├── Permission.ts
│   ├── Group.ts
│   └── GroupUser.ts
└── routes/              # Contrôleurs HTTP
    ├── auth.ts
    ├── users.ts
    ├── years.ts
    ├── classes.ts
    ├── lectures.ts
    ├── documents.ts
    └── groups.ts
```

---

## Variables d'environnement

Fichier `.env` à créer dans `collegeLaBoussoleApp/backend/` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/college_laboussole
JWT_SECRET=change_me_in_production
JWT_EXPIRES_IN=7d
```

---

## Middleware

### `requireAuth`

Vérifie la présence et la validité du token JWT dans le header `Authorization: Bearer <token>`.

- `401 Token manquant` — header absent ou mal formé
- `401 Token invalide ou expiré` — signature invalide ou token expiré
- Attache `req.user = { id, role }` si valide

### `requireRole(...roles)`

Vérifie que `req.user.role` est dans la liste des rôles autorisés.

- `403 Accès interdit` — rôle insuffisant

---

## Modèles

### `User`

Compte d'accès commun à tous les types d'utilisateurs.

| Champ          | Type    | Détail                                     |
| -------------- | ------- | ------------------------------------------ |
| `email`        | String  | Unique, lowercase                          |
| `passwordHash` | String  | bcrypt factor 12                           |
| `role`         | Enum    | `admin` `staff` `parent` `student` `other` |
| `isActive`     | Boolean | `false` = soft delete                      |
| `isVerified`   | Boolean | Compte validé                              |
| `settings`     | Mixed   | Préférences utilisateur                    |
| `lastLoginAt`  | Date    | Mis à jour à chaque login                  |

---

### `StaffProfile`

Profil étendu pour les membres du personnel. Lié à `User` par `userId`.

| Champ    | Type            | Détail                            |
| -------- | --------------- | --------------------------------- |
| `userId` | ObjectId → User | Unique                            |
| `role`   | Enum            | `admin` `owner` `teacher` `other` |

---

### `ParentProfile` / `StudentProfile`

Profils étendus pour parents et élèves. Liés à `User` par `userId` (unique).

---

### `ParentStudent`

Table de liaison parent ↔ élève.

| Champ       | Type                      |
| ----------- | ------------------------- |
| `parentId`  | ObjectId → ParentProfile  |
| `studentId` | ObjectId → StudentProfile |

Index unique sur `(parentId, studentId)`.

---

### `Year`

Année scolaire.

| Champ       | Type   | Détail                       |
| ----------- | ------ | ---------------------------- |
| `name`      | String | Ex : `"2025-2026"`           |
| `startDate` | Date   |                              |
| `endDate`   | Date   |                              |
| `status`    | Enum   | `active` `archived` `future` |

---

### `Class`

Classe rattachée à une année et un professeur principal.

| Champ       | Type            | Détail          |
| ----------- | --------------- | --------------- |
| `name`      | String          | Ex : `"6ème A"` |
| `yearId`    | ObjectId → Year |                 |
| `teacherId` | ObjectId → User |                 |

Index unique sur `(name, yearId)`.

---

### `Register`

Inscription d'un élève dans une classe.

| Champ     | Type             |
| --------- | ---------------- |
| `userId`  | ObjectId → User  |
| `classId` | ObjectId → Class |

Index unique sur `(userId, classId)`.

---

### `Lecture`

Cours rattaché à une classe et un enseignant.

| Champ       | Type             | Détail                                                 |
| ----------- | ---------------- | ------------------------------------------------------ |
| `name`      | String           | Ex : `"Mathématiques"`                                 |
| `classId`   | ObjectId → Class |                                                        |
| `teacherId` | ObjectId → User  |                                                        |
| `day`       | Enum             | `lundi` `mardi` `mercredi` `jeudi` `vendredi` `samedi` |
| `startTime` | String           | Ex : `"08:00"`                                         |
| `endTime`   | String           | Ex : `"09:00"`                                         |

---

### `Document`

Fichier ou dossier dans l'arborescence documentaire.

| Champ                | Type                | Détail                              |
| -------------------- | ------------------- | ----------------------------------- |
| `titre`              | String              |                                     |
| `url`                | String              | Chemin ou URL du fichier            |
| `type`               | Enum                | `file` `folder`                     |
| `folderId`           | ObjectId → Document | Dossier parent (`null` = racine)    |
| `ownerId`            | ObjectId → User     | Propriétaire                        |
| `uploadedBy`         | ObjectId → User     |                                     |
| `inheritPermissions` | Boolean             | Hérite des droits du dossier parent |
| `classId`            | ObjectId → Class    | Optionnel                           |
| `lectureId`          | ObjectId → Lecture  | Optionnel                           |
| `yearId`             | ObjectId → Year     | Optionnel                           |
| `tags`               | String[]            |                                     |

Index sur `folderId` et `uploadedBy`.

---

### `Permission` / `DocumentShare`

Droits d'accès à un document, attribués à un utilisateur ou un groupe.

| Champ            | Type                | Détail                   |
| ---------------- | ------------------- | ------------------------ |
| `documentId`     | ObjectId → Document |                          |
| `subjectType`    | Enum                | `user` `group`           |
| `subjectUserId`  | ObjectId → User     | Si `subjectType = user`  |
| `subjectGroupId` | ObjectId → Group    | Si `subjectType = group` |
| `role`           | Enum                | `read` `write` `admin`   |

---

### `Group`

Groupe de communication ou d'organisation.

| Champ     | Type             | Détail                                            |
| --------- | ---------------- | ------------------------------------------------- |
| `name`    | String           |                                                   |
| `type`    | Enum             | `class` `staff` `parents` `year` `custom` `other` |
| `classId` | ObjectId → Class | Optionnel                                         |
| `yearId`  | ObjectId → Year  | Optionnel                                         |

---

### `GroupUser`

Table de liaison groupe ↔ utilisateur.

| Champ     | Type             |
| --------- | ---------------- |
| `groupId` | ObjectId → Group |
| `userId`  | ObjectId → User  |

Index unique sur `(groupId, userId)`.

---

## Routes

### Auth — `/api/auth`

| Méthode | Route    | Auth | Body                  | Réponse           |
| ------- | -------- | ---- | --------------------- | ----------------- |
| POST    | `/login` | —    | `{ email, password }` | `{ token, role }` |

---

### Users — `/api/users`

Toutes les routes requièrent `admin`.

| Méthode | Route  | Body                                | Réponse                                      |
| ------- | ------ | ----------------------------------- | -------------------------------------------- |
| GET     | `/`    | —                                   | Liste des utilisateurs (sans `passwordHash`) |
| GET     | `/:id` | —                                   | Utilisateur trouvé                           |
| POST    | `/`    | `{ email, password, role }`         | `{ id, email, role }`                        |
| PATCH   | `/:id` | `{ role?, isActive?, isVerified? }` | Utilisateur mis à jour                       |
| DELETE  | `/:id` | —                                   | `204` (soft delete — `isActive: false`)      |

---

### Years — `/api/years`

| Méthode | Route  | Auth                      | Body                                   | Réponse                                 |
| ------- | ------ | ------------------------- | -------------------------------------- | --------------------------------------- |
| GET     | `/`    | tout utilisateur connecté | —                                      | Liste triée par `startDate` décroissant |
| POST    | `/`    | admin / staff             | `{ name, startDate, endDate, status }` | Année créée                             |
| PATCH   | `/:id` | admin / staff             | Champs partiels                        | Année mise à jour                       |
| DELETE  | `/:id` | admin                     | —                                      | `204`                                   |

---

### Classes — `/api/classes`

| Méthode | Route  | Auth                      | Body                          | Réponse                                    |
| ------- | ------ | ------------------------- | ----------------------------- | ------------------------------------------ |
| GET     | `/`    | tout utilisateur connecté | —                             | Liste avec `yearId` et `teacherId` peuplés |
| POST    | `/`    | admin / staff             | `{ name, yearId, teacherId }` | Classe créée                               |
| PATCH   | `/:id` | admin / staff             | Champs partiels               | Classe mise à jour                         |
| DELETE  | `/:id` | admin                     | —                             | `204`                                      |

---

### Lectures — `/api/lectures`

| Méthode | Route  | Auth                      | Body                                                    | Réponse                                     |
| ------- | ------ | ------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| GET     | `/`    | tout utilisateur connecté | —                                                       | Liste avec `classId` et `teacherId` peuplés |
| POST    | `/`    | admin / staff             | `{ name, classId, teacherId, day, startTime, endTime }` | Cours créé                                  |
| PATCH   | `/:id` | admin / staff             | Champs partiels                                         | Cours mis à jour                            |
| DELETE  | `/:id` | admin                     | —                                                       | `204`                                       |

---

### Documents — `/api/documents`

| Méthode | Route             | Auth                      | Body                              | Réponse                                  |
| ------- | ----------------- | ------------------------- | --------------------------------- | ---------------------------------------- |
| GET     | `/`               | tout utilisateur connecté | —                                 | Documents à la racine (`folderId: null`) |
| GET     | `/?folderId=<id>` | tout utilisateur connecté | —                                 | Documents dans ce dossier                |
| GET     | `/:id`            | tout utilisateur connecté | —                                 | Document trouvé                          |
| POST    | `/`               | admin / staff             | `{ titre, url, type, folderId? }` | Document créé                            |
| PATCH   | `/:id`            | admin / staff             | Champs partiels                   | Document mis à jour                      |
| DELETE  | `/:id`            | admin                     | —                                 | `204`                                    |

---

### Groups — `/api/groups`

| Méthode | Route                  | Auth                      | Body                                | Réponse           |
| ------- | ---------------------- | ------------------------- | ----------------------------------- | ----------------- |
| GET     | `/`                    | tout utilisateur connecté | —                                   | Liste des groupes |
| POST    | `/`                    | admin / staff             | `{ name, type, classId?, yearId? }` | Groupe créé       |
| POST    | `/:id/members`         | admin / staff             | `{ userId }`                        | Membre ajouté     |
| DELETE  | `/:id/members/:userId` | admin / staff             | —                                   | `204`             |
| DELETE  | `/:id`                 | admin                     | —                                   | `204`             |

---

## Codes d'erreur communs

| Code  | Cas                                         |
| ----- | ------------------------------------------- |
| `400` | Champs obligatoires manquants               |
| `401` | Token absent, invalide ou expiré            |
| `403` | Rôle insuffisant                            |
| `404` | Ressource introuvable                       |
| `500` | Erreur serveur (ex : duplicate key MongoDB) |
