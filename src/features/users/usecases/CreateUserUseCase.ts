import { TCreateUserDto, TCreateUserResult } from "../domain/user";
import { IUserRepository } from "../../../interfaces/IUserRepository";

export class CreateUserUseCase {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: TCreateUserDto): Promise<TCreateUserResult> => {
    const result = await this._userRepo.save(input);

    return result;
  };
}
