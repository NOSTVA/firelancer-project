import z from "zod";
import { envSchema } from "env-schema";
import { zodToJsonSchema } from "zod-to-json-schema";

const schema = z.object({
  HOST: z.string().default("0.0.0.0"),
  PORT: z.number().default(3042),
  POSTGRES_HOST: z.string().default("0.0.0.0"),
  POSTGRES_PORT: z.number().default(5432),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DATABASE: z.string(),
  SESSION_COOKIE_MAX_AGE: z.number().default(60 * 60 * 24 * 30),
  PUBLIC_DIR: z.string().default("public"),
});

export const env = envSchema<z.infer<typeof schema>>({
  schema: zodToJsonSchema(schema),
  dotenv: true,
});
