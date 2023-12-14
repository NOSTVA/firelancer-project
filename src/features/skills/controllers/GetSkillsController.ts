import { FastifyReply, FastifyRequest } from "fastify";
import { GetSkillsUseCase } from "../usecases/GetSkillsUseCase";
import { TGetSkillsDto } from "../domain/skill";

export class GetSkillsController {
  public constructor(private readonly _useCase: GetSkillsUseCase) {}

  public handle = async (req: FastifyRequest<{ Querystring: TGetSkillsDto }>, res: FastifyReply): Promise<void> => {
    const result = await this._useCase.execute(req.query);
    res.code(201).send(result);
  };
}
