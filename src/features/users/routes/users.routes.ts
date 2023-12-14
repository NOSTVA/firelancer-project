import { FastifyInstance } from "fastify";
import { UserRepository } from "../UserRepository";
import { $ref, schemas } from "../domain/user.schema";
import { GetUserUseCase } from "../usecases/GetUserUseCase";
import { GetUserController } from "../controllers/GetUserController";
import { EditProfilePictureController } from "../controllers/EditProfilePictureController";
import { UpdateUserUseCase } from "../usecases/UpdateUserUseCase";
import { UploadFileUseCase } from "@features/upload-files/usecases/UploadFileUseCase";
import { UploadFileRepository } from "@features/upload-files/UploadFileRepository";

const userRepo = new UserRepository();
const fileRepo = new UploadFileRepository();

const getUserController = new GetUserController(new GetUserUseCase(userRepo));

const editProfilePictureController = new EditProfilePictureController(
  new UpdateUserUseCase(userRepo),
  new UploadFileUseCase(fileRepo)
);

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

  app.put(
    "/self/profile_picture",
    {
      preValidation: [app.authenticate_user],
      schema: {
        tags: ["users"],
        security: [{ cookieAuth: [] }],
        summary: "Upload user profile picture",
        consumes: ["multipart/form-data"],
        body: {
          type: "object",
          required: ["profile_picture"],
          properties: {
            profile_picture: { isFile: true },
          },
        },
      },
    },
    editProfilePictureController.handle
  );
}
