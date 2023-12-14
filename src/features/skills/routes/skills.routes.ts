import { FastifyInstance } from "fastify";
import { SkillsRepository } from "../SkillsRepository";
import { GetSkillsController } from "../controllers/GetSkillsController";
import { GetSkillsUseCase } from "../usecases/GetSkillsUseCase";
import { $ref, schemas } from "../domain/skill.schema";

const skillsRepo = new SkillsRepository();
const getSkillsController = new GetSkillsController(new GetSkillsUseCase(skillsRepo));

export default async function (app: FastifyInstance) {
  schemas.map((s) => app.addSchema(s));

  app.get(
    "/",
    {
      schema: {
        tags: ["skills"],
        querystring: $ref("SkillsQueryParams"),
      },
    },
    getSkillsController.handle
  );
}
