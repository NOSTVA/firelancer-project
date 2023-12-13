import { GetUploadFileDto, UploadFileDto, UploadFileResult } from "@domain/schemas/file.schema";
import { z } from "zod";

export type TUploadFileDto = z.infer<typeof UploadFileDto>;

export type TUploadFileResult = z.infer<typeof UploadFileResult>;

export type TGetUploadFileDto = z.infer<typeof GetUploadFileDto>;

export type TFileDto = z.infer<typeof FileDto>;
