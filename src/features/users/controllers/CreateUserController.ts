import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserUseCase } from "../usecases/CreateUserUseCase";
import { TCreateUserDto } from "../domain/user";

export class CreateUserController {
  public constructor(private readonly _useCase: CreateUserUseCase) {}

  public handle = async (req: FastifyRequest<{ Body: TCreateUserDto }>, res: FastifyReply): Promise<void> => {
    const result = await this._useCase.execute(req.body);
    res.code(201).send(result);
  };
}
