import { IUseCase } from "@shared/IUseCase";
import { TCreateUploadFileDto, TCreateUploadFileResultDto } from "../domain/file";
import { IUploadFileRepository } from "../interfaces/IUploadFileRepository";

export class UploadFileUseCase implements IUseCase<TCreateUploadFileDto, TCreateUploadFileResultDto> {
  public constructor(private readonly _fileRepo: IUploadFileRepository) {}

  public execute = async (input: TCreateUploadFileDto): Promise<TCreateUploadFileResultDto> => {
    const result = await this._fileRepo.save(input);
    return result;
  };
}
