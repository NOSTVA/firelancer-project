import z from "zod";
import {
  CreateUserDto,
  CreateUserResult,
  GetUserDto,
  LoginUserDto,
  LoginUserResult,
  UserDto,
} from "@features/users/domain/user.schema";

export type TCreateUserDto = z.infer<typeof CreateUserDto>;

export type TCreateUserResult = z.infer<typeof CreateUserResult>;

export type TGetUserDto = z.infer<typeof GetUserDto>;

export type TUserDto = z.infer<typeof UserDto>;

export type TLoginUserDto = z.infer<typeof LoginUserDto>;

export type TLoginUserResult = z.infer<typeof LoginUserResult>;
