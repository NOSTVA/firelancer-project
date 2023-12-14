import z from "zod";

export const CreateUploadFileDto = z.object({
  filename: z.string(),
  url: z.string(),
});

export const CreateUploadFileResultDto = z.object({
  id: z.string().uuid(),
  filename: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const GetUploadFileDto = z.object({
  id: z.string().uuid(),
});

export const GetUploadFileResultDto = z.object({
  id: z.string().uuid(),
  filename: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
