import { GetSkillsDto, Skill } from "./skill.schema";

export type TGetSkillsDto = z.infer<typeof GetSkillsDto>;
export type TSkill = z.infer<typeof Skill>;
