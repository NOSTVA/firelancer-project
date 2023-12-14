import type { IUseCase } from "@shared/IUseCase";
import { TGetUserDto, TGetUserResultDto } from "../domain/user";
import { IUserRepository } from "../interfaces/IUserRepository";

export class GetUserUseCase implements IUseCase<TGetUserDto, TGetUserResultDto[]> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: TGetUserDto): Promise<TGetUserResultDto[]> => {
    const result = await this._userRepo.find(input);
    return result;
  };
}
