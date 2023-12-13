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
  id: z.string().uuid(),
});

export const UserDto = z.object({
  id: z.string().uuid(),
  username: z.string(),
});
