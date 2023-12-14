import type { IUseCase } from "@shared/IUseCase";
import { TGetUserDto, TUserDto } from "../domain/user";
import { IUserRepository } from "../interfaces/IUserRepository";

export class GetUserUseCase implements IUseCase<TGetUserDto, TUserDto> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: TGetUserDto): Promise<TUserDto> => {
    const result = await this._userRepo.find(input);

    if (!result) {
      throw new Error("user not found");
    }

    return result;
  };
}
