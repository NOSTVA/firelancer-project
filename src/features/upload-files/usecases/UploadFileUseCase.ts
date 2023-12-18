import { TCreateUploadFileResultDto } from "../domain/file";
import { IUploadFileRepository } from "../../../interfaces/IUploadFileRepository";
import { UploadFile } from "../domain/UploadFile";

export type TUploadFileDto = {
  data: Buffer;
  mimetype: string;
  filename: string;
};

export class UploadFileUseCase {
  public constructor(private readonly _fileRepo: IUploadFileRepository) {}

  public execute = async (input: TUploadFileDto): Promise<TCreateUploadFileResultDto> => {
    const file = new UploadFile(input.data, input.mimetype, input.filename);
    const { filename } = await file.upload();
    const result = await this._fileRepo.save({ filename, url: filename });
    return result;
  };
}
