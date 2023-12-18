import { MultipartFile } from "@fastify/multipart";
import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUserUseCase } from "../usecases/UpdateUserUseCase";
import { UploadFileUseCase } from "@features/upload-files/usecases/UploadFileUseCase";

export class EditProfilePictureController {
  public constructor(
    private readonly _updateUserUseCase: UpdateUserUseCase,
    private readonly _uploadFileUseCase: UploadFileUseCase
  ) {}

  public handle = async (req: FastifyRequest<{ Body: { profile_picture: MultipartFile } }>, res: FastifyReply) => {
    if (!req.user?.id) throw new Error("User does not exist");

    const file = await this._uploadFileUseCase.execute({
      data: await req.body.profile_picture.toBuffer(),
      mimetype: req.body.profile_picture.mimetype,
      filename: "ppc_" + req.user.id,
    });

    const result = await this._updateUserUseCase.execute({
      userId: req.user.id,
      data: { profile_picture: file.id },
    });

    res.code(200).send({ success: result });
  };
}
