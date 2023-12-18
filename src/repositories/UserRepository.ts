import { eq, inArray } from "drizzle-orm";
import { IUserRepository } from "../interfaces/IUserRepository";
import {
  TCreateUserDto,
  TCreateUserResult,
  TGetUserDto,
  TGetUserResultDto,
  TLoginUserResult,
  TUpdateUserDto,
  TUserDto,
} from "../features/users/domain/user";
import { skill_categories, skills, user_skills, users } from "@infrastructure/drizzle/schema";
import { db } from "@infrastructure/drizzle/db";
import { TUserSkillDto } from "@features/skills/domain/skill";

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

  public async find(opts: TGetUserDto): Promise<TGetUserResultDto[]> {
    let query = db
      .select({
        id: users.id,
        username: users.username,
        first_name: users.first_name,
        last_name: users.last_name,
        email: users.email,
        role: users.user_type,
        closed: users.closed,
        registration_date: users.createdAt,
        ...(opts.title ? { title: users.title } : {}),
        ...(opts.description ? { description: users.description } : {}),
        ...(opts.profile_picture ? { profile_picture: users.profile_picture } : {}),
        ...(opts.status
          ? {
              status: {
                email_verified: users.email_verified,
                phone_verified: users.phone_verified,
              },
            }
          : {}),
        ...(opts.skills
          ? {
              skills: {
                id: skills.id,
                name: skills.name,
              },
              skill_categories: {
                id: skill_categories.id,
                name: skill_categories.name,
              },
            }
          : {}),
      })
      .from(users)
      .where(inArray(users.id, opts.users))
      .$dynamic();

    if (opts.skills) {
      query
        .leftJoin(user_skills, eq(user_skills.user_id, users.id))
        .leftJoin(skills, eq(user_skills.skill_id, skills.id))
        .leftJoin(skill_categories, eq(user_skills.skill_id, skills.id));
    }

    const rows = await query.execute();

    // normalize result
    const result = rows?.reduce<Record<string, TGetUserResultDto>>((acc, row) => {
      const { skills, skill_categories, ...user } = row;
      if (!acc[user.id]) {
        acc[user.id] = {
          ...user,
          status: user.status ?? null,
          title: user.title ?? null,
          description: user.description ?? null,
          profile_picture: user.profile_picture ?? null,
          skills: skills ? [] : null,
        };
      }

      if (skills && skill_categories) {
        // @ts-ignore
        acc[user.id].skills.push({
          ...skills,
          category: skill_categories,
        });
      }

      return acc;
    }, {});

    return Object.values(result);
  }

  public async findById(user_id: string): Promise<TUserDto | undefined> {
    const result = await db.select({ id: users.id, username: users.username }).from(users).where(eq(users.id, user_id));
    return result[0];
  }

  public async findByEmail(email: string): Promise<TLoginUserResult | undefined> {
    const result = await db
      .select({ id: users.id, username: users.username, password: users.password })
      .from(users)
      .where(eq(users.email, email));
    return result[0];
  }

  public async update(user_id: string, opts: TUpdateUserDto): Promise<boolean> {
    await db
      .update(users)
      .set({ ...opts, updatedAt: new Date() })
      .where(eq(users.id, user_id));

    return true;
  }

  public async setSkills(user_id: string, skills: Set<string>): Promise<boolean> {
    const userSkills = [...skills].map<TUserSkillDto>((skill_id) => ({ user_id, skill_id }));

    try {
      await db.transaction(async (tx) => {
        await tx.delete(user_skills).where(eq(user_skills.user_id, user_id));
        await tx.insert(user_skills).values(userSkills);
      });

      return true;
    } catch (err: any) {
      if (err.code === "23503") {
        throw new Error("Invalid skill or user information");
      }
      return false;
    }
  }
}
