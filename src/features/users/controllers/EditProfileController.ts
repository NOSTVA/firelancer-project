import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUserUseCase } from "../usecases/UpdateUserUseCase";

export class EditProfileController {
  public constructor(private readonly _useCase: UpdateUserUseCase) {}

  public handle = async (req: FastifyRequest<{ Body: { title: string; description: string } }>, res: FastifyReply) => {
    if (!req.user?.id) throw new Error("User does not exist");

    const result = await this._useCase.execute({ userId: req.user.id, data: req.body });
    res.code(200).send({ success: result });
  };
}
