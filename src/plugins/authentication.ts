import fs from "fs";
import fp from "fastify-plugin";
import passport from "@fastify/passport";
import { env } from "@config/env";
import { TUserDto } from "@features/users/domain/user";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "@features/users/UserRepository";
import { LoginUserUseCase } from "@features/users/usecases/LoginUserUseCase";

const LocalStrategy = require("passport-local");
const loginUserUseCase = new LoginUserUseCase(new UserRepository());
const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email: string, password: string, cb: any) {
    const result = loginUserUseCase.execute({ email, password });
    if (!result) return cb({ message: "Incorrect email or password" }, false);
    return cb(null, result);
  }
);
passport.use("local", localStrategy);
passport.registerUserDeserializer(async (user) => user);
passport.registerUserSerializer(async (user) => user);

export default fp(async function authenticationPlugin(app: FastifyInstance) {
  app.register(import("@fastify/secure-session"), {
    key: fs.readFileSync("./secret-key"),
    cookie: { maxAge: env.SESSION_COOKIE_MAX_AGE },
  });
  app.register(passport.initialize());
  app.register(passport.secureSession());

  app.decorate("authenticate_user", async function (req: FastifyRequest, res: FastifyReply): Promise<void> {
    if (req.isUnauthenticated()) {
      res.code(401);
      throw new Error("You must be logged in to perform this request");
    }
  });
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate_user: <T>(request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface PassportUser extends TUserDto {}
}
