# TodoList

TodoList est l'application Node/TypeScript développée en live coding au cours de l'émission "L'Atelier du Code".

D'un point de vue fonctionnel, il s'agit d'un projet basique de gestion de choses à faire (a.k.a. des Todos).

L'application, son architecture et son infrastructure sont considérées sous un angle transactionnel/CRUD (vs. évènementiel ou temps réel).

L'objectif du projet est de montrer la mise en place, le développement, le déploiement, l'industrialisation et la gestion d'une application Web dans les conditions proches d'un cadre professionnel.

### Liens

- [Démo](https://todolist.osc-fr1.scalingo.io/todos)
- [Twitch](https://twitch.tv/jeremybuget)
- [YouTube](https://www.youtube.com/channel/UCCA8eDqAjDSsWPUftDzWozA)
- [GitHub](https://github.com/jbuget/todolist)

### Technologies

- Node/npm
- TypeScript/ts-node
- ESLint
- Jest/ts-jest
- Fastify
- Dotenv
- PostgreSQL
- Prisma
- Docker/Compose
- Scalingo

### Méthodologies et philosophies

- Extreme Programming
- TDD
- Software Craftsmanship
- CI/CD
- Clean Code
- MD10

## Installation

### Prérequis
Le projet nécessite les outils / programmes suivants : 
- Git v2.33.0
- Node (npm) v14.18.1 (v6.14.15) or superior ; v16.13.0 (v8.1.0) recommandée
- Docker v20.10.8 or superior

Les versions indiquées sont celles utilisées dans le cadre du développement de l'application. Il est possible qu'elle fonctionne avec des versions différentes, mais ce n'est pas garantit. 

### Étapes

```
git clone git@github.com:jbuget/todolist.git
cd todolist
cp sample.env .env
docker compose up -d
npm install
npm run db:reset
npm lint
npm test
npm start
```

> ⚠️ Si la commande `docker compose up -d` ne fonctionne pas (car ancienne version de Docker ou version pour Linux), essayer la commande `docker-compose up -d` 

### Configuration

Il est possible de paramétrer certains aspects de l'application (logger, base de données) via des variables d'environnement.

Le moyen le plus simple est de renseigner/modifier celles-ci depuis le fichier .env propre à votre environnement.

## Licence

Ce logiciel est développé et distribué sous licence [AGPL v3](https://fr.wikipedia.org/wiki/GNU_Affero_General_Public_License).
