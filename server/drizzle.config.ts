import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
    migrations: {
        table: 'my-drizzle-migrations-table',
        schema: 'my-drizzle-migrations-schema'
    },
    verbose: true,
    strict: true
})