import { TGetSkillsDto, TGetSkillsResultDto } from "../features/skills/domain/skill";

export interface ISkillsRepository {
  getAll(opts: TGetSkillsDto): Promise<TGetSkillsResultDto[]>;
}
