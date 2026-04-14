# MCD — Modèle Conceptuel de Données

---

## Diagramme

```mermaid
erDiagram
    User ||--o| StaffProfile    : "possède"
    User ||--o| ParentProfile   : "possède"
    User ||--o| StudentProfile  : "possède"

    ParentProfile }o--o{ StudentProfile : "est parent de"

    User     ||--|{ Register : "est inscrit via"
    Class    ||--|{ Register : "reçoit via"

    Year  ||--|{ Class   : "contient"
    Class ||--|{ Lecture : "comprend"

    User ||--o{ Class   : "dirige (prof principal)"
    User ||--o{ Lecture : "dispense"

    Document |o--o{ Document     : "contenu dans (dossier)"
    User     ||--|{ Document     : "dépose"
    Class    |o--o{ Document     : "associé à"
    Lecture  |o--o{ Document     : "associé à"
    Year     |o--o{ Document     : "associé à"

    Document ||--o{ Permission    : "définit les droits"
    Document ||--o{ DocumentShare : "partagé via"

    User  |o--o{ Permission    : "accordée à"
    Group |o--o{ Permission    : "accordée à"
    User  |o--o{ DocumentShare : "partagé avec"
    Group |o--o{ DocumentShare : "partagé avec"

    Group |o--o{ User  : "composé de"
    Class |o--o{ Group : "associé à"
    Year  |o--o{ Group : "associé à"
```

---

## Entités

### User

| Attribut     | Description                                        |
| ------------ | -------------------------------------------------- |
| email        | Adresse email, identifiant de connexion            |
| passwordHash | Mot de passe chiffré (bcrypt)                      |
| role         | Rôle global : admin, staff, parent, student, other |
| isActive     | Compte actif ou non                                |
| isVerified   | Email vérifié ou non                               |
| settings     | Préférences personnalisées                         |
| lastLoginAt  | Date de dernière connexion                         |
| createdAt    | Date de création                                   |
| updatedAt    | Date de mise à jour                                |

---

### StaffProfile

| Attribut | Description                                                           |
| -------- | --------------------------------------------------------------------- |
| role     | Rôle précis au sein de l'établissement : admin, owner, teacher, other |

---

### ParentProfile

_Pas d'attribut propre — défini entièrement par ses associations._

---

### StudentProfile

_Pas d'attribut propre — défini entièrement par ses associations._

---

### Document

| Attribut           | Description                         |
| ------------------ | ----------------------------------- |
| titre              | Nom du fichier ou du dossier        |
| url                | Chemin de stockage du fichier       |
| type               | file ou folder                      |
| inheritPermissions | Hérite des droits du dossier parent |
| tags               | Mots-clés pour la recherche         |
| createdAt          | Date de création                    |
| updatedAt          | Date de mise à jour                 |

---

### Lecture

| Attribut  | Description         |
| --------- | ------------------- |
| name      | Intitulé du cours   |
| day       | Jour de la semaine  |
| startTime | Heure de début      |
| endTime   | Heure de fin        |
| createdAt | Date de création    |
| updatedAt | Date de mise à jour |

---

### Year

| Attribut  | Description                         |
| --------- | ----------------------------------- |
| name      | Intitulé de l'année (ex. 2025-2026) |
| startDate | Date de début                       |
| endDate   | Date de fin                         |
| status    | active, archived ou future          |
| createdAt | Date de création                    |
| updatedAt | Date de mise à jour                 |

---

### Register _(table d'association)_

| Attribut  | Description         |
| --------- | ------------------- |
| createdAt | Date d'inscription  |
| updatedAt | Date de mise à jour |

---

### Group

| Attribut  | Description                                |
| --------- | ------------------------------------------ |
| name      | Nom du groupe                              |
| type      | class, staff, parents, year, custom, other |
| createdAt | Date de création                           |
| updatedAt | Date de mise à jour                        |

---

### Class

| Attribut  | Description                   |
| --------- | ----------------------------- |
| name      | Nom de la classe (ex. 6ème A) |
| createdAt | Date de création              |
| updatedAt | Date de mise à jour           |

---

### Permission

| Attribut    | Description                         |
| ----------- | ----------------------------------- |
| subjectType | Type du sujet : user ou group       |
| role        | Niveau d'accès : read, write, admin |
| createdAt   | Date de création                    |
| updatedAt   | Date de mise à jour                 |

---

### DocumentShare

| Attribut    | Description                                 |
| ----------- | ------------------------------------------- |
| subjectType | Type du sujet : user ou group               |
| role        | Niveau d'accès partagé : read, write, admin |
| createdAt   | Date de création                            |
| updatedAt   | Date de mise à jour                         |

---

## Associations et cardinalités

| Association                 | Entité A      | Card. A | Card. B | Entité B       | Attributs            |
| --------------------------- | ------------- | ------- | ------- | -------------- | -------------------- |
| possède profil personnel    | User          | 1,1     | 0,1     | StaffProfile   | —                    |
| possède profil parent       | User          | 1,1     | 0,1     | ParentProfile  | —                    |
| possède profil élève        | User          | 1,1     | 0,1     | StudentProfile | —                    |
| est parent de               | ParentProfile | 0,N     | 0,N     | StudentProfile | —                    |
| dirige (prof principal)     | User          | 0,N     | 1,1     | Class          | —                    |
| contient                    | Year          | 1,1     | 1,N     | Class          | —                    |
| est inscrit dans            | User          | 0,N     | 0,N     | Class          | createdAt, updatedAt |
| comprend                    | Class         | 1,1     | 0,N     | Lecture        | —                    |
| dispense                    | User          | 0,N     | 1,1     | Lecture        | —                    |
| contenu dans (dossier)      | Document      | 0,N     | 0,1     | Document       | —                    |
| dépose                      | User          | 1,1     | 0,N     | Document       | —                    |
| associé à une classe        | Document      | 0,N     | 0,1     | Class          | —                    |
| associé à un cours          | Document      | 0,N     | 0,1     | Lecture        | —                    |
| associé à une année         | Document      | 0,N     | 0,1     | Year           | —                    |
| définit les droits          | Document      | 1,1     | 0,N     | Permission     | —                    |
| accordée à un utilisateur   | Permission    | 0,N     | 0,1     | User           | —                    |
| accordée à un groupe        | Permission    | 0,N     | 0,1     | Group          | —                    |
| partagé via                 | Document      | 1,1     | 0,N     | DocumentShare  | —                    |
| partagé avec un utilisateur | DocumentShare | 0,N     | 0,1     | User           | —                    |
| partagé avec un groupe      | DocumentShare | 0,N     | 0,1     | Group          | —                    |
| composé de                  | Group         | 0,N     | 0,N     | User           | —                    |
| associé à une classe        | Group         | 0,N     | 0,1     | Class          | —                    |
| associé à une année         | Group         | 0,N     | 0,1     | Year           | —                    |

> **Note — associations polymorphiques** : `Permission` et `DocumentShare` référencent soit un `User`, soit un `Group` via le champ `subjectType`. Dans le MCD, cela se traduit par deux associations optionnelles distinctes (0,1 vers User ET 0,1 vers Group), dont une seule est active à la fois.
