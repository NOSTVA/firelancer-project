import type { FastifyInstance } from "fastify";
import { CreateUserUseCase } from "@application/usecases/users/CreateUserUseCase";
import { GetUserUseCase } from "@application/usecases/users/GetUserUseCase";
import { CreateUserController } from "@main/controllers/CreateUserController";
import { GetUserController } from "@main/controllers/GetUserController";
import { UserRepository } from "@infrastructure/drizzle/repositories/UserRepository";
import { $ref, schemas } from "@main/json-schemas/user.schema";

const userRepo = new UserRepository();
const createUserController = new CreateUserController(new CreateUserUseCase(userRepo));
const getUserController = new GetUserController(new GetUserUseCase(userRepo));

export default async function (app: FastifyInstance) {
  schemas.map((s) => app.addSchema(s));

  app.post(
    "/",
    {
      schema: {
        body: $ref("CreateUser"),
      },
    },
    createUserController.handle
  );

  app.get(
    "/:id",
    {
      schema: {
        params: {
          id: { type: "string" },
        },
      },
    },
    getUserController.handle
  );
}
