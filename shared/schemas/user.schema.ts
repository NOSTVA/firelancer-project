import z from "zod";

export const CreateUserDto = z.object({
  username: z.string(),
});

export const CreateUserResult = z.object({
  user_id: z.string().uuid(),
});

export const GetUserDto = z.object({
  id: z.string().uuid(),
});

export const UserDto = z.object({
  user_id: z.string().uuid(),
  username: z.string(),
});
