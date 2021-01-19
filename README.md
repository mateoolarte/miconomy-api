# API Finance app

[![Codeship Status for mateoolarte/finance-api](https://app.codeship.com/projects/36a86f59-d2f7-4271-b018-5d581e8e01a6/status?branch=master)](https://app.codeship.com/projects/424353)

Here you can find the backend api of Finance app. Built with Nodejs & GraphQL

## Features

- Apollo server: A GraphQL server library.
- Nexus: Code-first library to generate schema for GraphQL servers
- Prisma: Next generation of ORM to work with DB
- Postgres: Database provider
- Heroku: Platform as a Service to deploy
- Typescript: Programming language with static typings
- Jest: Test runner
- Git hooks with Husky and Linted staged: To help checking test and formatters before a commit

## Prerequisites

- Yarn
- NodeJS version 15.0.1

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

### Sync and create migrations for development server

```bash
yarn migrate:dev
```

### Sync and create migrations for production/staging server

In this case, before run this command we should un/comment on the `.env` the right DB provider

```bash
yarn migrate
```

### Sync and generate schema

```bash
yarn generate
```

### Run tests

```bash
yarn test
```
