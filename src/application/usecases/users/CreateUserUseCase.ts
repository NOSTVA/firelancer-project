import type { IUseCase } from "@shared/IUseCase";
import type { IUserRepository } from "@application/interfaces/IUserRepository";
import type { TCreateUserDto, TCreateUserResult } from "@domain/types/user";

export class CreateUserUseCase implements IUseCase<TCreateUserDto, TCreateUserResult> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: TCreateUserDto): Promise<TCreateUserResult> => {
    const result = await this._userRepo.save(input);

    if (!result) {
      throw new Error("Could not save user");
    }

    return result;
  };
}
