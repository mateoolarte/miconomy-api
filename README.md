# Miconomy API

Here you can find the backend api. Built with Nodejs, GraphQL and Prisma ORM.

## Features

- Apollo server: A GraphQL server library.
- Nexus: Code-first library to generate schema for GraphQL servers
- Prisma: Next generation of ORM to work with DB
- Postgres: Database provider
- Heroku: Platform as a Service to deploy
- Typescript: Programming language with typings
- Jest: Test runner
- Git hooks with Husky and Linted staged: To help checking test and formatters before a commit
- ESLint: Validate the Typescript code style with best practices
- Prettier: Formatter files with configured options

## Prerequisites

- Yarn
- NodeJS >= 16

## Installation

- Clone this repo
- Run on terminal `yarn` to install dependencies
- Create a `.env` file and ask a teammate to share the content
- Run on terminal `yarn dev` and start rocking

## Available commands

### Run development server

```bash
yarn dev
```

### Generate production server

```bash
yarn build
```

### Run a production server

```bash
yarn start
```

### Run a GUI app to manage database models

```bash
yarn studio
```

### Sync migrations for development server

```bash
yarn migrate:dev
```

**Note:** You should ensure to have the right credentials for the database on `.env` file.

### Create migrations for development server

```bash
yarn migrate:dev --name NAME_OF_MIGRATION
```

**Note:** You should ensure to have the right credentials for the database on `.env` file.

### Sync migrations for production/staging server

In this case, before run this command we should un/comment on the `.env` the right DB provider env

```bash
yarn migrate
```

### Sync and generate prisma client from schema.prisma file

```bash
yarn generate:prisma
```

### Sync and generate nexus typings from schema.ts file

```bash
yarn generate:nexus
```

### Sync and generate prisma client and nexus typings code

```bash
yarn generate
```

### Clean production folder

```bash
yarn clean
```

### Run tests

```bash
yarn test
```

### Run watching tests

```bash
yarn test:watch
```

### Run linter on js and ts files

```bash
yarn lint
```

### Run formatter on src folder

```bash
yarn fmt
```

### Run formatter and linter

```bash
yarn pretty
```
