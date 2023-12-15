import type { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUserSkillsUseCase } from "../usecases/UpdateUserSkillsUseCase";

export class UpdateUserSkillsController {
  public constructor(private readonly _useCase: UpdateUserSkillsUseCase) {}

  public handle = async (req: FastifyRequest<{ Body: { skills: string[] } }>, res: FastifyReply) => {
    if (!req.user?.id) throw new Error("User does not exist");
    const result = await this._useCase.execute({ userId: req.user.id, data: req.body.skills });
    res.code(200).send({ success: result });
  };
}
