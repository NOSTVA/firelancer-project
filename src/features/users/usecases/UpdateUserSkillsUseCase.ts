import { IUserRepository } from "../../../interfaces/IUserRepository";

export class UpdateUserSkillsUseCase {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: { userId: string; data: string[] }): Promise<boolean> => {
    const skills = new Set(input.data);
    const result = await this._userRepo.setSkills(input.userId, skills);
    return result;
  };
}
