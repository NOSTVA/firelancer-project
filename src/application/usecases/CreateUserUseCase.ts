import type { IUseCase } from "@shared/types";
import type { IUserRepository } from "@application/interfaces/IUserRepository";
import type { TCreateUserDto, TCreateUserResult } from "@shared/types/user";
import { User } from "@domain/User";

export class CreateUserUseCase implements IUseCase<TCreateUserDto, TCreateUserResult> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: TCreateUserDto): Promise<TCreateUserResult> => {
    const user = new User(input.username);
    const result = await this._userRepo.save(user);

    if (!result) {
      throw new Error("Could not save user");
    }

    return {
      user_id: user.id,
    };
  };
}
