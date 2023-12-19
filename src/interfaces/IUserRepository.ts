import {
  TCreateUserDto,
  TCreateUserResult,
  TGetUserDto,
  TGetUserResultDto,
  TLoginUserResult,
  TUpdateUserDto,
  TUserDto,
} from "../features/users/domain/user";

export interface IUserRepository {
  create(user: TCreateUserDto): Promise<TCreateUserResult>;
  get(opts: TGetUserDto): Promise<TGetUserResultDto[]>;
  getById(user_id: string): Promise<TUserDto | undefined>;
  getByEmail(email: string): Promise<TLoginUserResult | undefined>;
  update(user_id: string, opts: TUpdateUserDto): Promise<boolean>;
  setSkills(user_id: string, skills: Set<string>): Promise<boolean>;
}
