# Dictionnaire des données — Collège La Boussole

---

## User

| Champ        | Type                                       | Description                                                             |
| ------------ | ------------------------------------------ | ----------------------------------------------------------------------- |
| \_id         | ObjectId                                   | Identifiant unique de l'utilisateur, généré automatiquement             |
| email        | String                                     | Adresse email de l'utilisateur, utilisée comme identifiant de connexion |
| passwordHash | String                                     | Mot de passe de l'utilisateur stocké sous forme de hash (bcrypt)        |
| role         | Enum[admin, staff, parent, student, other] | Rôle de l'utilisateur dans le système, détermine ses droits d'accès     |
| isActive     | Boolean                                    | Indique si le compte est actif et peut se connecter                     |
| isVerified   | Boolean                                    | Indique si l'adresse email a été vérifiée                               |
| settings     | Object                                     | Paramètres personnalisés de l'utilisateur (préférences, notifications…) |
| lastLoginAt  | Date                                       | Date et heure de la dernière connexion                                  |
| createdAt    | Date                                       | Date de création du compte                                              |
| updatedAt    | Date                                       | Date de la dernière mise à jour du compte                               |

---

## StaffProfile

| Champ  | Type                               | Description                                      |
| ------ | ---------------------------------- | ------------------------------------------------ |
| \_id   | ObjectId                           | Identifiant unique du profil membre du personnel |
| userId | ObjectId                           | Référence vers le compte utilisateur associé     |
| role   | Enum[admin, owner, teacher, other] | Rôle au sein de l'établissement                  |

---

## ParentProfile

| Champ       | Type       | Description                                             |
| ----------- | ---------- | ------------------------------------------------------- |
| \_id        | ObjectId   | Identifiant unique du profil parent                     |
| userId      | ObjectId   | Référence vers le compte utilisateur associé            |
| childrenIds | [ObjectId] | Liste des identifiants des élèves rattachés à ce parent |

---

## StudentProfile

| Champ  | Type     | Description                                  |
| ------ | -------- | -------------------------------------------- |
| \_id   | ObjectId | Identifiant unique du profil élève           |
| userId | ObjectId | Référence vers le compte utilisateur associé |

---

## Document

| Champ              | Type               | Description                                                         |
| ------------------ | ------------------ | ------------------------------------------------------------------- |
| \_id               | ObjectId           | Identifiant unique du document ou du dossier                        |
| titre              | String             | Nom du fichier ou du dossier                                        |
| url                | String             | Chemin d'accès ou URL de stockage du fichier                        |
| type               | Enum[file, folder] | Type de l'élément : fichier ou dossier                              |
| folderId           | ObjectId \| null   | Identifiant du dossier parent (null si l'élément est à la racine)   |
| ownerDocumentId    | ObjectId           | Identifiant du propriétaire du document                             |
| uploadedBy         | ObjectId           | Identifiant de l'utilisateur ayant déposé le document               |
| permissions        | List\<Permission\> | Liste des permissions spécifiques associées au document             |
| inheritPermissions | Boolean            | Indique si le document hérite des permissions de son dossier parent |
| classId            | ObjectId \| null   | Référence vers une classe concernée (si applicable)                 |
| lectureId          | ObjectId \| null   | Référence vers un cours concerné (si applicable)                    |
| yearId             | ObjectId \| null   | Référence vers une année scolaire (si applicable)                   |
| tags               | List\<String\>     | Liste de mots-clés pour la recherche et le classement               |
| createdAt          | Date               | Date de création du document                                        |
| updatedAt          | Date               | Date de la dernière mise à jour du document                         |

---

## Lecture

| Champ     | Type                                                  | Description                                       |
| --------- | ----------------------------------------------------- | ------------------------------------------------- |
| \_id      | ObjectId                                              | Identifiant unique du cours                       |
| name      | String                                                | Intitulé du cours ou de la séance                 |
| classId   | ObjectId                                              | Référence vers la classe concernée par ce cours   |
| teacherId | ObjectId                                              | Référence vers l'enseignant qui dispense le cours |
| day       | Enum[lundi, mardi, mercredi, jeudi, vendredi, samedi] | Jour de la semaine auquel le cours a lieu         |
| startTime | String                                                | Heure de début du cours (format HH:mm)            |
| endTime   | String                                                | Heure de fin du cours (format HH:mm)              |
| createdAt | Date                                                  | Date de création du cours                         |
| updatedAt | Date                                                  | Date de la dernière mise à jour du cours          |

---

## Year

| Champ     | Type                           | Description                                              |
| --------- | ------------------------------ | -------------------------------------------------------- |
| \_id      | ObjectId                       | Identifiant unique de l'année scolaire                   |
| name      | String                         | Intitulé de l'année scolaire (ex. 2025-2026)             |
| startDate | Date                           | Date de début de l'année scolaire                        |
| endDate   | Date                           | Date de fin de l'année scolaire                          |
| status    | Enum[active, archived, future] | État de l'année scolaire : en cours, archivée ou à venir |
| createdAt | Date                           | Date de création de l'entrée                             |
| updatedAt | Date                           | Date de la dernière mise à jour de l'entrée              |

---

## Register

| Champ     | Type     | Description                                                |
| --------- | -------- | ---------------------------------------------------------- |
| \_id      | ObjectId | Identifiant unique de l'inscription                        |
| userId    | ObjectId | Référence vers l'utilisateur inscrit (élève)               |
| classId   | ObjectId | Référence vers la classe dans laquelle l'élève est inscrit |
| createdAt | Date     | Date de création de l'inscription                          |
| updatedAt | Date     | Date de la dernière mise à jour de l'inscription           |

---

## Group

| Champ     | Type                                             | Description                                                                           |
| --------- | ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| \_id      | ObjectId                                         | Identifiant unique du groupe                                                          |
| name      | String                                           | Nom du groupe                                                                         |
| type      | Enum[class, staff, parents, year, custom, other] | Catégorie du groupe (classe, personnel, parents, année scolaire, personnalisé, autre) |
| usersIds  | [ObjectId]                                       | Liste des identifiants des utilisateurs membres du groupe                             |
| classId   | ObjectId                                         | Référence vers la classe associée au groupe (si applicable)                           |
| yearId    | ObjectId                                         | Référence vers l'année scolaire associée au groupe (si applicable)                    |
| createdAt | Date                                             | Date de création du groupe                                                            |
| updatedAt | Date                                             | Date de la dernière mise à jour du groupe                                             |

---

## Class

| Champ     | Type     | Description                                                     |
| --------- | -------- | --------------------------------------------------------------- |
| \_id      | ObjectId | Identifiant unique de la classe                                 |
| name      | String   | Nom de la classe (ex. 6ème A)                                   |
| yearId    | ObjectId | Référence vers l'année scolaire à laquelle appartient la classe |
| teacherId | ObjectId | Référence vers l'enseignant principal de la classe              |
| createdAt | Date     | Date de création de la classe                                   |
| updatedAt | Date     | Date de la dernière mise à jour de la classe                    |

---

## Permission

| Champ       | Type                     | Description                                                           |
| ----------- | ------------------------ | --------------------------------------------------------------------- |
| \_id        | ObjectId                 | Identifiant unique de la permission                                   |
| subjectType | Enum[user, group]        | Type du sujet auquel la permission s'applique : utilisateur ou groupe |
| subjectId   | ObjectId                 | Identifiant du sujet concerné (utilisateur ou groupe)                 |
| role        | Enum[read, write, admin] | Niveau d'accès accordé : lecture, écriture ou administration          |
| createdAt   | Date                     | Date de création de la permission                                     |
| updatedAt   | Date                     | Date de la dernière mise à jour de la permission                      |

---

## DocumentShare

| Champ       | Type                     | Description                                                            |
| ----------- | ------------------------ | ---------------------------------------------------------------------- |
| \_id        | ObjectId                 | Identifiant unique du partage                                          |
| documentId  | ObjectId                 | Référence vers le document partagé                                     |
| subjectType | Enum[user, group]        | Type du sujet avec qui le document est partagé : utilisateur ou groupe |
| subjectId   | ObjectId                 | Identifiant du sujet concerné (utilisateur ou groupe)                  |
| role        | Enum[read, write, admin] | Niveau d'accès accordé pour ce partage                                 |
| createdAt   | Date                     | Date de création du partage                                            |
| updatedAt   | Date                     | Date de la dernière mise à jour du partage                             |
