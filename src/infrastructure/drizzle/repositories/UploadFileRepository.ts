import { IUploadFileRepository } from "@application/interfaces/IUploadFileRepository";
import { TFileDto, TGetUploadFileDto, TUploadFileDto, TUploadFileResult } from "@domain/types/file";

export class UploadFileRepository implements IUploadFileRepository {
  public async save(file: TUploadFileDto): Promise<TUploadFileResult> {
    throw new Error("method not implemented");
  }

  public async find(opts: TGetUploadFileDto): Promise<TFileDto | undefined> {
    throw new Error("method not implemented");
  }
}
