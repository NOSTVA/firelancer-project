import {
  TCreateUserDto,
  TCreateUserResult,
  TGetUserDto,
  TGetUserResultDto,
  TLoginUserResult,
  TUpdateUserDto,
  TUserDto,
} from "../domain/user";

export interface IUserRepository {
  save(user: TCreateUserDto): Promise<TCreateUserResult>;
  find(opts: TGetUserDto): Promise<TGetUserResultDto[]>;
  findById(user_id: string): Promise<TUserDto | undefined>;
  findByEmail(email: string): Promise<TLoginUserResult | undefined>;
  update(user_id: string, opts: TUpdateUserDto): Promise<boolean>;
  setSkills(user_id: string, skills: Set<string>): Promise<boolean>;
}
