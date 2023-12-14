import { IUploadFileRepository } from "./interfaces/IUploadFileRepository";
import { TFileDto, TGetUploadFileDto, TUploadFileDto, TUploadFileResult } from "./domain/file";

export class UploadFileRepository implements IUploadFileRepository {
  public async save(file: TUploadFileDto): Promise<TUploadFileResult> {
    throw new Error("method not implemented");
  }

  public async find(opts: TGetUploadFileDto): Promise<TFileDto | undefined> {
    throw new Error("method not implemented");
  }
}
