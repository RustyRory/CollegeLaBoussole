| Collection     | Champ                 | Description                                                     |
| -------------- | --------------------- | --------------------------------------------------------------- |
| Utilisateur    | \_id                  | Identifiant unique MongoDB                                      |
|                | nom                   | Nom de l’utilisateur                                            |
|                | prenom                | Prénom de l’utilisateur                                         |
|                | email                 | Adresse email (unique)                                          |
|                | mot_de_passe          | Mot de passe hashé (auth Node.js / Nextcloud)                   |
|                | role                  | Rôle : Admin / Prof / Eleve / Parent / Donateur                 |
|                | classes               | Liste des classes associées (pour prof/élève)                   |
|                | date_creation         | Date de création du compte                                      |
|                | actif                 | Statut actif/inactif                                            |
|                | deux_facteurs         | Activation 2FA (true/false)                                     |
|                | notifications_enabled | Booléen : l’utilisateur accepte de recevoir les notifications   |
| Classe         | \_id                  | Identifiant unique de la classe                                 |
|                | nom                   | Nom de la classe (ex: 6èmeA)                                    |
|                | id_professeur         | Professeur responsable                                          |
| Document       | \_id                  | Identifiant unique du document                                  |
|                | titre                 | Titre du document                                               |
|                | description           | Description courte                                              |
|                | type                  | Type : pédagogique / administratif / devoir                     |
|                | nextcloud_path        | Chemin ou URL du fichier dans Nextcloud                         |
|                | date_creation         | Date de création                                                |
|                | auteur_id             | Référence à l’utilisateur auteur                                |
|                | version               | Version du document                                             |
|                | classes_partage       | Liste des classes ayant accès                                   |
|                | utilisateurs_partage  | Liste des utilisateurs ayant accès                              |
|                | deleted               | Booléen pour suppression logique                                |
|                | date_suppression      | Date de suppression (optionnel)                                 |
| Devoir         | \_id                  | Identifiant unique du devoir                                    |
|                | document_id           | Référence au document associé                                   |
|                | matiere               | Matière du devoir                                               |
|                | date_limite           | Date limite de remise                                           |
|                | eleve_id              | Élève déposant le devoir                                        |
|                | date_depot            | Date de dépôt                                                   |
|                | statut                | Statut : déposé / modifié / validé                              |
| Permission     | \_id                  | Identifiant unique de la permission                             |
|                | document_id           | Référence au document                                           |
|                | utilisateur_id        | Référence à l’utilisateur                                       |
|                | type                  | Type : lecture / écriture / modification                        |
|                | expiration            | Date d’expiration du partage (optionnelle)                      |
| PageSite       | \_id                  | Identifiant unique de la page                                   |
|                | titre                 | Titre de la page                                                |
|                | slug                  | URL simplifiée (ex: /actualites)                                |
|                | contenu               | Contenu HTML ou texte enrichi                                   |
|                | type_page             | Présentation / Actualité / Contact / Infos pratiques            |
|                | date_creation         | Date de création                                                |
|                | date_modification     | Date dernière modification                                      |
|                | actif                 | Page visible ou non                                             |
| Actualite      | \_id                  | Identifiant unique de l’actualité                               |
|                | titre                 | Titre de l’actualité                                            |
|                | contenu               | Contenu HTML ou texte enrichi                                   |
|                | date_publication      | Date de publication                                             |
|                | auteur_id             | Référence à l’admin auteur                                      |
|                | actif                 | Statut actif/inactif                                            |
|                | audience              | Public / Familles / Enseignants / Donateurs                     |
| ContactMessage | \_id                  | Identifiant unique du message                                   |
|                | nom                   | Nom du contact                                                  |
|                | email                 | Email du contact                                                |
|                | sujet                 | Sujet du message                                                |
|                | message               | Contenu du message                                              |
|                | date_envoi            | Date d’envoi                                                    |
|                | traite                | Message traité ou non                                           |
| Journal        | \_id                  | Identifiant unique                                              |
|                | utilisateur_id        | Qui a généré l’événement                                        |
|                | type_evenement        | Connexion / Dépot / Modification / Suppression / Téléchargement |
|                | description           | Description détaillée                                           |
|                | date                  | Date et heure                                                   |
| Sauvegarde     | \_id                  | Identifiant unique de la sauvegarde                             |
|                | date_sauvegarde       | Date de sauvegarde                                              |
|                | type                  | Automatique / manuelle                                          |
|                | statut                | Réussie / échouée                                               |
|                | chemin                | Chemin du stockage (Nextcloud ou MongoDB)                       |
| Configuration  | \_id                  | Identifiant unique                                              |
|                | cle                   | Clé de configuration (ex: RGPD, accessibilité)                  |
|                | valeur                | Valeur associée                                                 |
|                | description           | Description de l’usage                                          |
| Notification   | \_id                  | Identifiant unique                                              |
|                | utilisateur_id        | Destinataire                                                    |
|                | type                  | Type : info / alerte / rappel                                   |
|                | message               | Contenu                                                         |
|                | lu                    | Booléen                                                         |
|                | date                  | Date d’envoi                                                    |
| MessageInterne | \_id                  | Identifiant unique                                              |
|                | expediteur_id         | Utilisateur qui envoie                                          |
|                | destinataire_id       | Utilisateur ou groupe/classe                                    |
|                | type                  | Message / notification / alerte                                 |
|                | sujet                 | Sujet du message                                                |
|                | contenu               | Contenu du message                                              |
|                | date_envoi            | Date et heure                                                   |
|                | lu                    | Booléen si lu ou non                                            |
| Calendrier     | \_id                  | Identifiant unique                                              |
|                | titre                 | Nom de l’événement                                              |
|                | description           | Description                                                     |
|                | date_debut            | Date et heure début                                             |
|                | date_fin              | Date et heure fin                                               |
|                | classe_id             | Classe concernée (optionnel)                                    |
|                | utilisateur_id        | Responsable (prof/admin)                                        |
|                | type                  | interne / public / donateurs                                    |
| Statistiques   | \_id                  | Identifiant unique                                              |
|                | type                  | Visite / Téléchargement / Connexion                             |
|                | utilisateur_id        | (Optionnel) Référence utilisateur                               |
|                | document_id           | (Optionnel) Référence document                                  |
|                | page_id               | (Optionnel) Référence page site                                 |
|                | valeur                | Nombre ou métrique                                              |
|                | date                  | Date de l’événement                                             |
