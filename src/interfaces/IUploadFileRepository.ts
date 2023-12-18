import { TCreateUploadFileDto, TCreateUploadFileResultDto } from "../features/upload-files/domain/file";

export interface IUploadFileRepository {
  save(file: TCreateUploadFileDto): Promise<TCreateUploadFileResultDto>;
}
