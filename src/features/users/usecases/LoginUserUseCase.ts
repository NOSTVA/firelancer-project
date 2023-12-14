import { IUseCase } from "@shared/IUseCase";
import { TLoginUserDto, TUserDto } from "../domain/user";
import { IUserRepository } from "../interfaces/IUserRepository";

export class LoginUserUseCase implements IUseCase<TLoginUserDto, TUserDto | boolean> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: TLoginUserDto): Promise<TUserDto | boolean> => {
    const user = await this._userRepo.findByEmail(input.email);

    if (!user || user.password !== input.password) {
      return false;
    }

    return {
      id: user.id,
      username: user.password,
    };
  };
}
