import { FastifyInstance } from "fastify";
import { UserRepository } from "../UserRepository";
import { EditProfilePictureController } from "../controllers/EditProfilePictureController";
import { UpdateUserUseCase } from "../usecases/UpdateUserUseCase";
import { UploadFileUseCase } from "@features/upload-files/usecases/UploadFileUseCase";
import { UploadFileRepository } from "@features/upload-files/UploadFileRepository";
import { EditProfileController } from "../controllers/EditProfileController";
import { UpdateUserSkillsController } from "../controllers/UpdateUserSkillsController";
import { UpdateUserSkillsUseCase } from "../usecases/UpdateUserSkillsUseCase";

const userRepo = new UserRepository();
const fileRepo = new UploadFileRepository();

const updateUserUseCase = new UpdateUserUseCase(userRepo);
const uploadFileUseCase = new UploadFileUseCase(fileRepo);
const updateUserSkillsUseCase = new UpdateUserSkillsUseCase(userRepo);

const editProfilePictureController = new EditProfilePictureController(updateUserUseCase, uploadFileUseCase);
const editProfileController = new EditProfileController(updateUserUseCase);
const updateUserSkillsController = new UpdateUserSkillsController(updateUserSkillsUseCase);

export default async function (app: FastifyInstance): Promise<void> {
  app.addHook("preValidation", app.authenticate_user);

  app.put(
    "/profile_picture",
    {
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

  app.put(
    "/profile",
    {
      schema: {
        tags: ["users"],
        security: [{ cookieAuth: [] }],
        summary: "Edit user profile picture",
        body: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
          },
        },
      },
    },
    editProfileController.handle
  );

  app.put(
    "/skills",
    {
      schema: {
        tags: ["users"],
        security: [{ cookieAuth: [] }],
        summary: "Edit user skills",
        body: {
          type: "object",
          required: ["skills"],
          properties: {
            skills: { type: "array", items: { type: "string", format: "uuid" }, minItems: 1 },
          },
        },
      },
    },
    updateUserSkillsController.handle
  );
}
