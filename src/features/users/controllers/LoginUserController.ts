import { FastifyReply, FastifyRequest } from "fastify";
import { LoginUserUseCase } from "../usecases/LoginUserUseCase";
import { TLoginUserDto } from "../domain/user";

export class LoginUserController {
  public constructor(private readonly _useCase: LoginUserUseCase) {}

  public handle = async (req: FastifyRequest<{ Body: TLoginUserDto }>, res: FastifyReply): Promise<void> => {
    const result = await this._useCase.execute(req.body);
    res.code(201).send(result);
  };
}
