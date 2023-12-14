import { db } from "@infrastructure/drizzle/db";
import { TCreateUploadFileDto, TCreateUploadFileResultDto } from "./domain/file";
import { IUploadFileRepository } from "./interfaces/IUploadFileRepository";
import { files } from "@infrastructure/drizzle/schema";

export class UploadFileRepository implements IUploadFileRepository {
  public async save(file: TCreateUploadFileDto): Promise<TCreateUploadFileResultDto> {
    const result = await db.insert(files).values(file).returning();
    return result[0];
  }
}
