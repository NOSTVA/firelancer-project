require("module-alias/register");
import { Server } from "Server";
import { logger } from "@config/logger";

export async function main(): Promise<void> {
  const app = await Server.build({
    logger,
  });
  await app.listen({ port: 5000, host: "0.0.0.0" });
}

main();
