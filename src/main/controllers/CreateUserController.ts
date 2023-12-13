import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "@application/usecases/CreateUserUseCase";

export class CreateUserController {
  public constructor(private readonly _useCase: CreateUserUseCase) {}

  public handle = async (req: FastifyRequest<{ Body: { username: string } }>, res: FastifyReply): Promise<void> => {
    const result = await this._useCase.execute({
      username: req.body.username,
    });

    res.code(201).send({ user_id: result.user_id });
  };
}
