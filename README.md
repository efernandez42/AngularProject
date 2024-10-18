# OlympicGamesStarter

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

N'oubliez pas d'installer vos node_modules avant de commencer (`npm install`).

## Serveur de développement

Exécutez `ng serve` pour un serveur de développement. Accédez à `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez l'un des fichiers sources.

## Build

Exécutez `ng build` pour générer le projet. Les artefacts de génération seront stockés dans le répertoire `dist/`.

## Par où commencer

Comme vous pouvez le voir, une architecture a déjà été définie pour le projet. Ce n'est qu'une suggestion, vous pouvez choisir d'utiliser la vôtre. L'architecture prédéfinie comprend (en plus de l'architecture angulaire par défaut) les éléments suivants :

- dossier `components` : contient tous les composants réutilisables
- dossier `pages` : contient les composants utilisés pour le routage
- dossier `core` : contient la logique métier (dossiers `services` et `models`)

Je vous suggère de commencer par comprendre ce code de démarrage. Portez une attention particulière à `app-routing.module.ts` et à `olympic.service.ts`.

Une fois maîtrisé, vous devez continuer en créant les interfaces TypeScript dans le dossier `models`. Comme vous pouvez le voir, j'ai déjà créé deux fichiers correspondant aux données incluses dans `olympic.json`. Avec vos interfaces, améliorez le code en remplaçant chaque `any` par l'interface correspondante.

Vous êtes maintenant prêt à implémenter les fonctionnalités demandées.

Bonne chance !