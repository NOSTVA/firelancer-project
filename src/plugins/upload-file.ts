import type { FastifyInstance } from "fastify";
import type { MultipartFile } from "@fastify/multipart";
import fs from "fs";
import path from "path";
import fp from "fastify-plugin";
import { TCreateUploadFileDto } from "@features/upload-files/domain/file";

export default fp(async function (app: FastifyInstance) {
  app.register(import("@fastify/multipart"), { attachFieldsToBody: true });

  const OUT_DIR = ".public";
  const IMAGES_DIR = path.join(OUT_DIR, "images");
  const VIDEOS_DIR = path.join(OUT_DIR, "videos");
  const IMAGE_MIMETYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    fs.mkdirSync(VIDEOS_DIR, { recursive: true });
  }

  app.decorateReply("upload", async function (opts: { type: "image"; file: MultipartFile; filename: string }) {
    if (opts.file.type !== "file") {
      this.code(400);
      throw new Error(`Unallowed file type: ${opts.file.type}`);
    }

    const filename = `${opts.filename}.${opts.file.mimetype.split("/")[1]}`;
    const filePath = path.join(IMAGES_DIR, filename);

    if (opts.type === "image" && IMAGE_MIMETYPES.includes(opts.file.mimetype)) {
      fs.writeFileSync(filePath, await opts.file.toBuffer());
      return {
        filename: filename,
        url: filePath,
      };
    }

    this.code(400);
    throw new Error(`Invalid file MIME type: ${opts.file.mimetype}`);
  });
});

declare module "fastify" {
  interface FastifyReply {
    upload: (opts: { type: "image"; file: MultipartFile; filename: string }) => Promise<TCreateUploadFileDto>;
  }
}
