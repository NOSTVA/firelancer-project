import {
  TCreateUserDto,
  TCreateUserResult,
  TGetUserDto,
  TGetUserResultDto,
  TLoginUserResult,
  TUserDto,
} from "../domain/user";

export interface IUserRepository {
  save(user: TCreateUserDto): Promise<TCreateUserResult>;
  find(opts: TGetUserDto): Promise<TGetUserResultDto[]>;
  findById(id: string): Promise<TUserDto | undefined>;
  findByEmail(email: string): Promise<TLoginUserResult | undefined>;
}
