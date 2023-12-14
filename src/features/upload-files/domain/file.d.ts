import { GetUploadFileDto, UploadFileDto, UploadFileResult } from "@features/users/domain/user";
import { z } from "zod";

export type TUploadFileDto = z.infer<typeof UploadFileDto>;

export type TUploadFileResult = z.infer<typeof UploadFileResult>;

export type TGetUploadFileDto = z.infer<typeof GetUploadFileDto>;

export type TFileDto = z.infer<typeof FileDto>;
