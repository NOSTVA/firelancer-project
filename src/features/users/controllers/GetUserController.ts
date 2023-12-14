import type { FastifyReply, FastifyRequest } from "fastify";
import { GetUserUseCase } from "../usecases/GetUserUseCase";
import { TGetUserDto } from "../domain/user";

export class GetUserController {
  public constructor(private readonly _useCase: GetUserUseCase) {}

  public handle = async (req: FastifyRequest<{ Querystring: TGetUserDto }>, res: FastifyReply) => {
    const result = await this._useCase.execute(req.query);
    res.code(200).send(result);
  };
}
