import { project_skills, skill_categories, skills } from "@infrastructure/drizzle/schema";
import { TGetSkillsDto, TGetSkillsResultDto } from "./domain/skill";
import { ISkillsRepository } from "./interfaces/ISkillsRepository";
import { eq, sql } from "drizzle-orm";
import { db } from "@infrastructure/drizzle/db";

export class SkillsRepository implements ISkillsRepository {
  public async find(opts: TGetSkillsDto): Promise<TGetSkillsResultDto[]> {
    const query = db
      .select({
        id: skills.id,
        name: skills.name,
        ...(opts.category
          ? {
              category: {
                id: skill_categories.id,
                name: skill_categories.name,
              },
            }
          : {}),
        ...(opts.active_projects_count
          ? {
              active_projects_count: sql<number>`(select count(distinct ${project_skills.project_id}) from ${project_skills} join ${skills} on ${project_skills.skill_id} = ${skills.id})`,
            }
          : {}),
      })
      .from(skills)
      .$dynamic();

    if (opts.category) {
      query.leftJoin(skill_categories, eq(skills.category_id, skill_categories.id));
    }

    const results = await query.execute();
    return results;
  }
}
