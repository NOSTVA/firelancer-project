import { IUseCase } from "@shared/IUseCase";
import { TUpdateUserDto } from "../domain/user";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UpdateUserUseCase implements IUseCase<{ userId: string; data: TUpdateUserDto }, boolean> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: { userId: string; data: TUpdateUserDto }): Promise<boolean> => {
    const result = await this._userRepo.update(input.userId, input.data);
    return result;
  };
}
