import type { FastifyReply, FastifyRequest } from "fastify";
import { GetUserUseCase } from "@application/usecases/users/GetUserUseCase";

export class GetUserController {
  public constructor(private readonly _useCase: GetUserUseCase) {}

  public handle = async (req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) => {
    const result = await this._useCase.execute({ id: req.params.id });
    res.code(200).send(result);
  };
}
