import type { IUseCase } from "@shared/types";
import type { TGetUserDto, TUserDto } from "@shared/types/user";
import type { IUserRepository } from "@application/interfaces/IUserRepository";

export class GetUserUseCase implements IUseCase<TGetUserDto, TUserDto> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public execute = async (input: TGetUserDto): Promise<TUserDto> => {
    const user = await this._userRepo.find(input.id);

    if (!user) {
      throw new Error("user not found");
    }

    return {
      user_id: user.id,
      username: user.username,
    };
  };
}
