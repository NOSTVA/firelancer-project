import type { SwaggerOptions } from "@fastify/swagger";
import type { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { SwaggerTheme } from "swagger-themes";

const theme = new SwaggerTheme("v3");
const content = theme.getBuffer("dark");

export const swaggerConfig = {
  swagger: {
    info: {
      title: "Firelancer API",
      version: "1.0.0",
    },
    consumes: ["application/json", "multipart/form-data"],
    securityDefinitions: {
      cookieAuth: {
        type: "apiKey",
        name: "session",
        in: "cookie",
      },
    },
  },
} satisfies SwaggerOptions;

export const swaggerUiConfig = {
  routePrefix: "/documentation",
  theme: {
    css: [{ filename: "theme.css", content: content }],
  },
} satisfies FastifySwaggerUiOptions;
