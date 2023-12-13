import { TFileDto, TGetUploadFileDto, TUploadFileDto, TUploadFileResult } from "@domain/types/file";

export interface IUploadFileRepository {
  save(file: TUploadFileDto): Promise<TUploadFileResult>;
  find(opts: TGetUploadFileDto): Promise<TFileDto | undefined>;
}
