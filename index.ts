require("module-alias/register");
import { env } from "@config/env";
import { Server } from "./src/Server";
import { logger } from "@config/logger";

export async function main(): Promise<void> {
  const app = await Server.build({ logger });
  await app.listen({ port: env.PORT, host: env.HOST });
}

main();
