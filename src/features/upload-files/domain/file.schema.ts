import z from "zod";

export const UploadFileDto = z.object({
  filename: z.string(),
  url: z.string(),
});

export const UploadFileResult = z.object({
  id: z.string().uuid(),
  filename: z.string(),
  url: z.string(),
});

export const GetUploadFileDto = z.object({
  id: z.string().uuid(),
});

export const FileDto = z.object({
  id: z.string().uuid(),
  filename: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
