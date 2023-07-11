# Miconomy API

Here you can find the backend api. Built with Nodejs, GraphQL and Prisma ORM.

## Features

- Apollo server: A GraphQL server library.
- Nexus: Code-first library to generate schema for GraphQL servers
- Prisma: Next generation of ORM to work with DB
- Postgres: Database provider
- Railway: Platform as a Service to deploy
- Typescript: Programming language with typings
- Jest: Test runner
- Git hooks with Husky and Linted staged: To help checking test and formatters before a commit
- ESLint: Validate the Typescript code style with best practices
- Prettier: Formatter files with configured options

## Used libraries

- Sendgrid: Manage email sending
- Bcrypt: Password hashing
- JWT: JWT token

## Prerequisites

- PNPM
- Latest NodeJS LTS version

## Installation

- Clone this repo
- Run on terminal `pnpm` to install dependencies
- Copy the content from `.env.example` and update the corresponding values
- Run on terminal `pnpm dev` and start building

## Available commands

### Run development server

```bash
pnpm dev
```

### Generate production server

```bash
pnpm build
```

### Run a production server

```bash
pnpm start
```

### Run a GUI app to manage database models

```bash
pnpm studio
```

### Sync migrations for development server

```bash
pnpm migrate:dev
```

**Note:** You should ensure to have the right credentials for the database on `.env` file.

### Create migrations for development server

```bash
pnpm migrate:dev --name NAME_OF_MIGRATION
```

**Note:** You should ensure to have the right credentials for the database on `.env` file.

### Sync migrations for production/staging server

In this case, before run this command we should un/comment on the `.env` the right DB provider env

```bash
pnpm migrate
```

### Sync and generate prisma client from schema.prisma file

```bash
pnpm generate:prisma
```

### Sync and generate nexus typings from schema.ts file

```bash
pnpm generate:nexus
```

### Sync and generate prisma client and nexus typings code

```bash
pnpm generate
```

### Clean production folder

```bash
pnpm clean
```

### Run tests

```bash
pnpm test
```

### Run watching tests

```bash
pnpm test:watch
```

### Run linter on js and ts files

```bash
pnpm lint
```

### Run formatter on src folder

```bash
pnpm fmt
```

### Run formatter and linter

```bash
pnpm pretty
```
