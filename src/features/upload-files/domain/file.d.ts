import z from "zod";
import {
  CreateUploadFileDto,
  CreateUploadFileResultDto,
  GetUploadFileDto,
  GetUploadFileResultDto,
} from "./file.schema";

export type TCreateUploadFileDto = z.infer<typeof CreateUploadFileDto>;

export type TCreateUploadFileResultDto = z.infer<typeof CreateUploadFileResultDto>;

export type TGetUploadFileDto = z.infer<typeof GetUploadFileDto>;

export type GetUploadFileResultDto = z.infer<typeof GetUploadFileResultDto>;
