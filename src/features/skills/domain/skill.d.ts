import z from "zod";
import { GetSkillsDto, GetSkillsResultDto } from "./skill.schema";

export type TGetSkillsDto = z.infer<typeof GetSkillsDto>;
export type TGetSkillsResultDto = z.infer<typeof GetSkillsResultDto>;
