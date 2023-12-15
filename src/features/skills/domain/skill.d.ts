import z from "zod";
import { GetSkillsDto, GetSkillsResultDto, UserSkillDto } from "./skill.schema";

export type TGetSkillsDto = z.infer<typeof GetSkillsDto>;

export type TGetSkillsResultDto = z.infer<typeof GetSkillsResultDto>;

export type TUserSkillDto = z.infer<typeof UserSkillDto>;
