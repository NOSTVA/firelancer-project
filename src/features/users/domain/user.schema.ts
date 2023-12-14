import { GetSkillsResultDto } from "@features/skills/domain/skill.schema";
import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

export const CreateUserDto = z.object({
  user_type: z.enum(["freelancer", "client"]),
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  password: z.string().min(6).max(32),
  email: z.string().email(),
});

export const CreateUserResult = z.object({
  id: z.string().uuid(),
});

export const GetUserDto = z.object({
  users: z.array(z.string().uuid()).min(1),
  avatar: z.boolean().default(false).optional(),
  skills: z.boolean().default(false).optional(),
  status: z.boolean().default(false).optional(),
  title: z.boolean().default(false).optional(),
  description: z.boolean().default(false).optional(),
  profile_picture: z.boolean().default(false).optional(),
});

export const GetUserResultDto = z.object({
  id: z.string().uuid(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  role: z.string(),
  closed: z.boolean(),
  registration_date: z.date(),
  status: z
    .object({
      email_verified: z.boolean(),
      phone_verified: z.boolean(),
    })
    .nullable(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  profile_picture: z.string().nullable(),
  skills: z.array(GetSkillsResultDto).nullable(),
});

export const UserDto = z.object({
  id: z.string().uuid(),
  username: z.string(),
});

export const LoginUserDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const LoginUserResult = z.object({
  ...UserDto.shape,
  password: z.string(),
});

export const UpdateUserDto = z.object({
  username: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.string().optional(),
  closed: z.boolean().optional(),
  email_verified: z.boolean().optional(),
  phone_verified: z.boolean().optional(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  profile_picture: z.string().nullable().optional(),
});

//JSON SCHEMAS
export const { schemas, $ref } = buildJsonSchemas(
  {
    CreateUser: CreateUserDto,
    CreateUserResult: CreateUserResult,
    LoginUser: LoginUserDto,
    GetUserQueryParams: GetUserDto,
    UpdateUser: UpdateUserDto,
  },
  { $id: "users-schema" }
);
