Chatbot MVP Deployment Guide

Bienvenue dans le guide de déploiement de votre Chatbot MVP ! Ce document récapitule toutes les étapes nécessaires pour créer, dockeriser, déployer et sécuriser votre chatbot intelligent utilisant l'API OpenAI sur une VM Google Cloud Platform (GCP).

Avant de commencer, assurez-vous d'avoir les éléments suivants :

    Compte Google Cloud Platform (GCP) avec une VM configurée.
    Accès SSH à votre VM GCP.
    Node.js et npm installés sur votre machine locale.
    Docker installé sur votre machine locale et votre VM GCP.
    Git (optionnel) pour la gestion de version.
    Postman pour tester les API.

Configuration de l'Environnement Local

    Cloner le Répertoire du Projet :

git clone https://github.com/votre-utilisateur/votre-repo.git
cd votre-repo

Créer et Configurer le Fichier .env :

Créez un fichier .env à la racine du projet avec les variables d'environnement suivantes :

PORT=your_port
OPENAI_API_KEY=your_openai_api_key_here
API_KEY=your_simple_api_key_here

Installer les Dépendances :

    npm install

Développement de l'Application Backend

    Structure du Projet :

chatbot-mvp/
├── index.js
├── package.json
├── Dockerfile
├── .dockerignore
├── .env
└── README.md
