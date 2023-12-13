import path from "path";
import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import closeWithGrace from "close-with-grace";
import { swaggerConfig, swaggerUiConfig } from "@config/swagger";

export interface ServerConfig extends FastifyPluginOptions {
  logger?: any;
}

export class Server {
  public static async build(opts: ServerConfig): Promise<FastifyInstance> {
    const app = fastify(opts);

    // SERVE STATIC FILES
    app.register(import("@fastify/static"), {
      root: path.join(__dirname, "../../.public"),
      prefix: "/public/",
    });

    // SWAGGER
    app.register(import("@fastify/swagger"), swaggerConfig);
    app.register(import("@fastify/swagger-ui"), swaggerUiConfig);

    // API V1
    app.register(api);
    app.get("/asdasd", () => {});

    // GRACEFUL DISCONNECT
    closeWithGrace({ delay: 30000 }, ({ signal, err }) => {
      if (err) app.log.error(err);
      app.close(() => app.log.error(`Received ${signal} Server closed.`));
    });

    return app;
  }
}
console.log(path.join(__dirname, "routes"));

export async function api(app: FastifyInstance) {
  console.log(path.join(__dirname, "routes"));
  app.register(import("@fastify/autoload"), {
    dir: path.join(__dirname, "routes"),
  });
}
