import { eq } from "drizzle-orm";
import { IUserRepository } from "@application/interfaces/IUserRepository";
import { users } from "@infrastructure/drizzle/data-access/schema";
import { db } from "@infrastructure/drizzle/data-access/db";
import { TCreateUserDto, TCreateUserResult, TGetUserDto, TUserDto } from "@domain/types/user";

export class UserRepository implements IUserRepository {
  public async save(user: TCreateUserDto): Promise<TCreateUserResult> {
    try {
      const result = await db.insert(users).values(user).returning({ id: users.id });
      return result[0];
    } catch (err: any) {
      if (err.code === "23505") {
        throw new Error("User already exists");
      }
      throw new Error("Failed to create user");
    }
  }

  public async find(opts: TGetUserDto): Promise<TUserDto | undefined> {
    const result = await db.select({ id: users.id, username: users.username }).from(users).where(eq(users.id, opts.id));
    return result[0];
  }
}
