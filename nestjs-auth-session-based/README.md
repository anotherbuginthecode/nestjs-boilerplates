<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Overview

This project is a boilerplate for building authentication systems in NestJS using session-based authentication. It leverages modern TypeScript, Drizzle ORM for database management, and includes a modular structure for scalability and maintainability.

## Features

- **Session-based authentication** (no JWT)
- **Modular architecture**: Auth and Users modules
- **Drizzle ORM** for database access and migrations
- **Zod** for schema validation
- **NestJS Interceptors** for error and response handling
- **Environment configuration** via dotenv and @nestjs/config
- **Logging** with nestjs-pino
- **Testing** with Jest and Supertest
- **Database seeding**

## Project Structure

```
├── drizzle.config.ts           # Drizzle ORM config
├── nest-cli.json               # NestJS CLI config
├── package.json                # Project metadata and scripts
├── tsconfig*.json              # TypeScript configs
├── clipboard/                  # (Disabled) seed script
├── drizzle/                    # Drizzle migrations and metadata
│   ├── 0000_stiff_skrulls.sql
│   └── meta/
├── src/
│   ├── app.module.ts           # Root NestJS module
│   ├── main.ts                 # App entrypoint
│   ├── database/               # DB connection and module
│   ├── interceptors/           # Error/response interceptors
│   └── modules/
│       ├── auth/               # Auth module
│       │   ├── api/            # Auth controller
│       │   ├── application/    # DTOs, services, use-cases
│       │   ├── domain/         # Entities, interfaces
│       │   └── infrastructure/ # Mappers, models, repositories
│       └── users/              # Users module (same structure)
├── test/                       # E2E tests and config
```

## Key Modules

### Auth Module

- **Controllers**: `auth.controller.ts` (API endpoints)
- **Services**: `auth.service.ts`, `session.service.ts` (business logic)
- **DTOs**: `login.dto.ts`, `register.dto.ts`
- **Use Cases**: `login.use-case.ts`, `register.use-case.ts`
- **Entities/Interfaces**: Session and session-user domain models
- **Repositories**: Session repository for DB access
- **Mappers**: Session entity <-> DB model

### Users Module

- **Controllers**: `users.controller.ts` (API endpoints)
- **Entities/Interfaces**: User domain model
- **Repositories**: User repository for DB access
- **Mappers**: User entity <-> DB model

### Database

- **Connection**: `database-connection.ts`
- **Module**: `database.module.ts`
- **Schema**: Drizzle ORM schema definitions

### Interceptors

- **Error Handling**: `errors.interceptor.ts`
- **Response Formatting**: `response.interceptor.ts`

## Scripts

- `start:dev` — Start server in watch mode
- `build` — Compile TypeScript
- `test` — Run unit tests
- `test:e2e` — Run end-to-end tests
- `db:generate` — Generate Drizzle migrations
- `db:migrate` — Run DB migrations
- `db:seed` — Seed the database
- `lint` — Run ESLint
- `format` — Format code with Prettier

## Technologies Used

- **NestJS** (core, config, CLI)
- **Drizzle ORM** (migrations, seeding)
- **Zod** (validation)
- **Pino** (logging)
- **Argon2** (password hashing)
- **dotenv** (env config)
- **Jest/Supertest** (testing)
- **TypeScript**

## Getting Started

1. **Install dependencies**:

```sh
pnpm install
```

2. **Configure environment**:

- Create a `.env` file with DB and app settings.

3. **Run migrations**:

```sh
pnpm db:migrate
```

4. **Seed database** (optional):

```sh
pnpm db:seed
```

5. **Start development server**:

```sh
pnpm start:dev
```

## Testing

- **Unit tests**: `pnpm test`
- **E2E tests**: `pnpm test:e2e`

## Customization

- Add new modules under `src/modules/`
- Extend entities, repositories, and services as needed
- Update Drizzle schema for DB changes

## License

UNLICENSED

---

For more details, see the source code and comments in each module.
