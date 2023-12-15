import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

export const GetSkillsDto = z.object({
  category: z.boolean().default(false).optional(),
  active_projects_count: z.boolean().default(false).optional(),
});

export const Category = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export const GetSkillsResultDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: Category.nullable().optional(),
  active_projects_count: z.number().optional(),
});

export const UserSkillDto = z.object({
  user_id: z.string().uuid(),
  skill_id: z.string(),
});

// JSON SCHEMAS
export const { schemas, $ref } = buildJsonSchemas(
  {
    SkillsQueryParams: GetSkillsDto,
    Skills: z.array(GetSkillsResultDto),
    UserSkill: UserSkillDto,
  },
  { $id: "skills-schemas" }
);
