import { IUploadFileRepository } from "@application/interfaces/IUploadFileRepository";
import { IUseCase } from "@shared/IUseCase";
import { TUploadFileDto, TUploadFileResult } from "@domain/types/file";

export class UploadFileUseCase implements IUseCase<TUploadFileDto, TUploadFileResult> {
  public constructor(private readonly _fileRepo: IUploadFileRepository) {}

  public execute = async (input: TUploadFileDto): Promise<TUploadFileResult> => {
    const result = await this._fileRepo.save(input);

    if (!result) {
      throw new Error("UploadFile failed");
    }

    return result;
  };
}
