import { FastifyInstance } from "fastify";
import { UserRepository } from "../../../repositories/UserRepository";
import { $ref, schemas } from "../domain/user.schema";
import { GetUserUseCase } from "../usecases/GetUserUseCase";
import { GetUserController } from "../controllers/GetUserController";

const userRepo = new UserRepository();

const getUserController = new GetUserController(new GetUserUseCase(userRepo));

export default async function (app: FastifyInstance): Promise<void> {
  schemas.map((s) => app.addSchema(s));

  app.get(
    "/",
    {
      schema: {
        tags: ["users"],
        querystring: $ref("GetUserQueryParams"),
      },
    },
    getUserController.handle
  );

  app.register(import("./self.routes"), { prefix: "self" });
}
