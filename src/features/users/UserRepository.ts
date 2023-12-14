import { eq } from "drizzle-orm";
import { IUserRepository } from "./interfaces/IUserRepository";
import { TCreateUserDto, TCreateUserResult, TGetUserDto, TLoginUserResult, TUserDto } from "./domain/user";
import { user_types, users } from "@infrastructure/drizzle/schema";
import { db } from "@infrastructure/drizzle/db";

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

  public async findById(id: string): Promise<TUserDto | undefined> {
    const result = await db.select({ id: users.id, username: users.username }).from(users).where(eq(users.id, id));
    return result[0];
  }

  public async findByEmail(email: string): Promise<TLoginUserResult | undefined> {
    const result = await db
      .select({ id: users.id, username: users.username, password: users.password })
      .from(users)
      .where(eq(users.email, email));
    return result[0];
  }
}
