import { CreateUserDto } from "@domain/schemas/user.schema";
import { buildJsonSchemas } from "fastify-zod";

export const { schemas, $ref } = buildJsonSchemas(
  {
    CreateUser: CreateUserDto,
  },
  { $id: "users-schema" }
);
