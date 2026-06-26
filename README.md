# Preorder Manager

This is a Next.js app for managing preorders with Prisma and SQLite.

## Prerequisites

Make sure you have the following installed:

- Node.js 20+
- npm

## 1. Install dependencies

```bash
npm install
```

## 2. Configure the database

This project uses SQLite via Prisma.

Create a local environment file if it does not already exist:

```bash
copy .env.example .env
```

If there is no `.env.example` file, create a new `.env` file with:

```env
DATABASE_URL="file:./dev.db"
```

## 3. Create the database schema

Run Prisma migrations to create the SQLite database:

```bash
npx prisma migrate deploy
```

If you are setting up the project for the first time and want to generate the schema from the current Prisma definition, run:

```bash
npx prisma migrate dev --name init
```

## 4. Seed sample data

Populate the database with sample preorder records:

```bash
npm run seed
```

## 5. Start the app locally

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Useful Prisma commands

- Generate the Prisma client:

```bash
npx prisma generate
```

- Open Prisma Studio:

```bash
npx prisma studio
```

- Reset the database:

```bash
npx prisma migrate reset
```

