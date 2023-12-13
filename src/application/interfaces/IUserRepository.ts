import { TCreateUserDto, TCreateUserResult, TGetUserDto, TUserDto } from "@domain/types/user";

export interface IUserRepository {
  save(user: TCreateUserDto): Promise<TCreateUserResult>;
  find(opts: TGetUserDto): Promise<TUserDto | undefined>;
}
