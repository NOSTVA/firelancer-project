import { TGetSkillsDto, TGetSkillsResultDto } from "../domain/skill";

export interface ISkillsRepository {
  find(opts: TGetSkillsDto): Promise<TGetSkillsResultDto[]>;
}
