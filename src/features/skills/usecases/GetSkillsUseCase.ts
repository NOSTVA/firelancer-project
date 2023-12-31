import { TGetSkillsDto, TGetSkillsResultDto } from "../domain/skill";
import { ISkillsRepository } from "../../../interfaces/ISkillsRepository";

export class GetSkillsUseCase {
  public constructor(private readonly _skillsRepo: ISkillsRepository) {}

  public execute = async (input: TGetSkillsDto): Promise<TGetSkillsResultDto[]> => {
    const result = this._skillsRepo.find(input);

    return result;
  };
}
