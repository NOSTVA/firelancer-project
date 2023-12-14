import { TCreateUserDto, TCreateUserResult, TGetUserDto, TLoginUserResult, TUserDto } from "../domain/user";

export interface IUserRepository {
  save(user: TCreateUserDto): Promise<TCreateUserResult>;
  findById(id: string): Promise<TUserDto | undefined>;
  findByEmail(email: string): Promise<TLoginUserResult | undefined>;
}
