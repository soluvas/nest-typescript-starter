# Soluvas NestJS TypeScript Starter Kit

[**Soluvas NestJS TypeScript Starter Kit**](https://soluvas.com/) (Target Platform) is an open source boilerplate API backend using NestJS framework, including Apollo GraphQL Server and MongoDB support.

## Tech Stack

* Base framework: [NestJS](https://nestjs.com/)
* Language: [TypeScript](http://www.typescriptlang.org/) on [Node.js](https://nodejs.org/en/)
* Web server framework: [Fastify](https://www.fastify.io/)
* GraphQL API Server: [Apollo Server](https://www.apollographql.com/docs/apollo-server/) + [`apollo-server-fastify`](https://www.npmjs.com/package/apollo-server-fastify) + [Relay Connections](https://relay.dev/graphql/connections.htm)
* Database: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) + [Typegoose](https://typegoose.github.io/typegoose/) + [`nestjs-typegoose`](https://www.npmjs.com/package/nestjs-typegoose)
* Linting: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) (NestJS stack)
* Unit Test: [Jest](https://jestjs.io/) + [Supertest](https://www.npmjs.com/package/supertest) (NestJS stack)
* Model/entity helpers: [`class-validator`](https://www.npmjs.com/package/class-validator)

## Setup

1. Configure `.env` using `.env.dev` as template.
2. Run `npm run start:dev`
3. Test by opening the GraphQL Playground at http://localhost:3111/graphql

```gql
{
  hello
  projects {
    pageInfo { hasNextPage, hasPreviousPage, startCursor, endCursor }
    edges { 
      node {
        id, name, slug
      }
      cursor
    }
    aggregate {
      count
    }    
  }
  project(slug: "quakezone") {name}
}
```
  
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Soluvas NestJS Boilerplate is open source, licensed under [Apache License Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Soluvas Open Source Low-Code Application Platform

For more information, check out [**Soluvas Open Source Low-Code Application Platform**](https://soluvas.com/).
