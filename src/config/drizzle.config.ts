import type { Config } from "drizzle-kit";
import { env } from "@config/env";

export default {
  schema: "./src/infrastructure/drizzle/schema.ts",
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
