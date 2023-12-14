import path from "path";
import fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import closeWithGrace from "close-with-grace";
import { swaggerConfig, swaggerUiConfig } from "@config/swagger";

export interface ServerConfig extends FastifyPluginOptions {
  logger?: any;
}

export class Server {
  public static async build(opts: ServerConfig): Promise<FastifyInstance> {
    const app = fastify({
      ...opts,
      ajv: {
        plugins: [(await import("@fastify/multipart")).ajvFilePlugin],
      },
    });

    // SERVE STATIC FILES
    app.register(import("@fastify/static"), {
      root: path.join(__dirname, "../.public"),
      prefix: "/public/",
    });

    // SWAGGER
    app.register(import("@fastify/swagger"), swaggerConfig);
    app.register(import("@fastify/swagger-ui"), swaggerUiConfig);

    // PLUGINS
    app.register(import("@plugins/authentication"));
    app.register(import("@plugins/upload-file"));

    // API
    app.register(import("@features/users/routes/auth.routes"));
    app.register(import("@features/users/routes/users.routes"), { prefix: "users" });
    app.register(import("@features/skills/routes/skills.routes"), { prefix: "skills" });

    // GRACEFUL DISCONNECT
    closeWithGrace({ delay: 30000 }, ({ signal, err }) => {
      if (err) app.log.error(err);
      app.close(() => app.log.error(`Received ${signal} Server closed.`));
    });

    return app;
  }
}
