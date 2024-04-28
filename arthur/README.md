[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/FtN3xYxl)
# Projet Spotify  
## Consignes
Ce projet à pour but de développer une application mobile utilisant l'API Spotify.  Le sujet laisse libre cours à notre imagination en terme de fonctionnalités.  
## Choix du groupe  
Nous avons décidé de travailler sur une application qui aiderait l'utilisateur à évaluer et améliorer l'originalité des morceaux qu'il écoute.  
En effet, nous estimons que malgré le large choix proposé par les plateformes de streaming, le fonctionnement de celle ci incite les utilisateurs à écouter les sons les plus populaires, manquant ainsi tout un pan de la création musical. 
L'application est nommée d'après l'un de nos camarades, réputé pour ses goûts musicaux éclectiques.  
## Fonctionnalités
Sur cette application, l'utilisateur peut :   
- Se connecter / Se deconnecter  
- Consulter ses playlists  
- Consulter le score d'originalité de chacune  
- Consulter pour chaque playlist une recommandation pour améliorer son score d'originalité en fonction des sons de celle ci. (cette fonction n'est pas effective dans la version finale. cf note de fin)    
- Consulter son score d'originalité générale  
- Consulter les 5 sons les plus populaires parmi ses sons préférés  
- Consulter les 5 sons les moins populaires parmi ses sons préférés  
## Plan de l'application  
3 pages principales :  
- Page de connexion  
- Page tribunal 
- Pages du compte
   
Chaque page principale est accessible depuis la navbar et un retour est possible entre chaque page.  
## Note sur les problèmes rencontrés  
En fin de projet, les requêtes de recommandation affichaient des erreurs 429 (trop grand nombre de requêtes en un laps de temps). Le souci est qu'après vérification sur le header de l'erreur, le Retry_After est de 30 000s. Cela veut dire que pour pouvoir refaire une requête, il faut attendre plus de 8h (sur les autres fonctions, il semblerait que le Retry_After soit de 30s). Nous n'avons donc pas pu correctement implémenter cette fonctionnalité.   Cependant, la fonction à l'origine de la requête marchait bien, seul le format de sortie était à régler. 

## Guide de déploiement Netlify

Voici les étapes que nous avons suivis pour déployer l'application

1. Créez un compte sur [Netlify](https://www.netlify.com/).
2. Connectez votre compte GitHub à Netlify en cliquant sur "New site from Git" sur votre tableau de bord Netlify.
3. Sélectionnez votre dépôt GitHub contenant votre projet.
4. Configurez les paramètres de construction de votre site :
  - Sélectionnez le branch à déployer.
  - Spécifiez le répertoire de construction (par exemple, "dist" ou "public").
  - Ajoutez les commandes de construction si nécessaire.
5. Cliquez sur "Deploy site" pour lancer le déploiement initial.
6. Attendez que Netlify construise et déploie votre site.
7. Une fois le déploiement terminé, votre site sera accessible via une URL générée par Netlify.
8. Vous pouvez personnaliser davantage les paramètres de déploiement dans les options Netlify, tels que les variables d'environnement, les redirections, etc.
9. Pour déployer de nouvelles versions de votre site, il vous suffit de pousser vos modifications vers la branche sélectionnée lors de la configuration du déploiement.

Le lien de l'application déployée est https://arthurtrial.netlify.app/