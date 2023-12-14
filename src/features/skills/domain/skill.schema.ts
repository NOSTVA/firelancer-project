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

export const Skill = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: Category.nullable().optional(),
  active_projects_count: z.number().optional(),
});

// JSON SCHEMAS
export const { schemas, $ref } = buildJsonSchemas(
  {
    SkillsQueryParams: GetSkillsDto,
    Skills: z.array(Skill),
  },
  { $id: "skills-schemas" }
);
