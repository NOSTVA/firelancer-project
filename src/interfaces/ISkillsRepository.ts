import { TGetSkillsDto, TGetSkillsResultDto } from "../features/skills/domain/skill";

export interface ISkillsRepository {
  find(opts: TGetSkillsDto): Promise<TGetSkillsResultDto[]>;
}
