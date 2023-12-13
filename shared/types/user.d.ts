import z from "zod";
import { CreateUserDto, CreateUserResult, GetUserDto, UserDto } from "../schemas/user.schema";

export type TCreateUserDto = z.infer<typeof CreateUserDto>;

export type TCreateUserResult = z.infer<typeof CreateUserResult>;

export type TGetUserDto = z.infer<typeof GetUserDto>;

export type TUserDto = z.infer<typeof UserDto>;
