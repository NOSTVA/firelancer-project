import type { IUseCase } from "@shared/IUseCase";
import { TCreateUserDto, TCreateUserResult } from "../domain/user";
import { IUserRepository } from "../interfaces/IUserRepository";

export class CreateUserUseCase implements IUseCase<TCreateUserDto, TCreateUserResult> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: TCreateUserDto): Promise<TCreateUserResult> => {
    const result = await this._userRepo.save(input);

    return result;
  };
}
