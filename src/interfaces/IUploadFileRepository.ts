import { TCreateUploadFileDto, TCreateUploadFileResultDto } from "../features/upload-files/domain/file";

export interface IUploadFileRepository {
  create(file: TCreateUploadFileDto): Promise<TCreateUploadFileResultDto>;
}
