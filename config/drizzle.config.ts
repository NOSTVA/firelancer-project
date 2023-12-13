import type { Config } from "drizzle-kit";
import { env } from "./env";

export default {
  schema: "./src/infrastructure/drizzle/data-access/schema.ts",
  out: "./.migrations",
  driver: "pg",
  dbCredentials: {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DATABASE,
  },
} satisfies Config;
