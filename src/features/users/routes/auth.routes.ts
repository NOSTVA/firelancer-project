import { FastifyInstance } from "fastify";
import { UserRepository } from "../../../repositories/UserRepository";
import { CreateUserController } from "../controllers/CreateUserController";
import { CreateUserUseCase } from "../usecases/CreateUserUseCase";
import { $ref, schemas } from "../domain/user.schema";
import passport from "@fastify/passport";

const userRepo = new UserRepository();
const createUserController = new CreateUserController(new CreateUserUseCase(userRepo));

export default async function (app: FastifyInstance): Promise<void> {
  schemas.map((s) => app.addSchema(s));

  app.post(
    "/register",
    {
      schema: {
        tags: ["auth"],
        body: $ref("CreateUser"),
      },
    },
    createUserController.handle
  );

  app.post(
    "/login",
    {
      preValidation: [passport.authenticate("local")],
      schema: {
        tags: ["auth"],
        body: $ref("LoginUser"),
      },
    },
    () => "logged in successfully"
  );
}
