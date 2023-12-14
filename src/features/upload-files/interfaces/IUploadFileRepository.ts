import { TCreateUploadFileDto, TCreateUploadFileResultDto } from "../domain/file";

export interface IUploadFileRepository {
  save(file: TCreateUploadFileDto): Promise<TCreateUploadFileResultDto>;
}
