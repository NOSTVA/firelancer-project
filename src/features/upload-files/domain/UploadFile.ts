import { env } from "@config/env";
import fs from "fs";
import path from "path";

const OUT_DIR = env.PUBLIC_DIR;
const IMAGES_DIR = path.join(OUT_DIR, "images");
const VIDEOS_DIR = path.join(OUT_DIR, "videos");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  fs.mkdirSync(VIDEOS_DIR, { recursive: true });
}

export class UploadFile {
  public readonly out_dir = OUT_DIR;
  public readonly img_dir = IMAGES_DIR;
  public readonly vid_dir = VIDEOS_DIR;
  public readonly video_mimetypes = ["video/mp4", "video/webm", "video/ogg"];
  public readonly image_mimetypes = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

  public constructor(
    public readonly data: Buffer,
    public readonly mimetype: string,
    public readonly filename: string
  ) {}

  public upload = async (): Promise<{ filename: string }> => {
    const filename = `${this.filename}.${this.mimetype.split("/")[1]}`;

    if (this.image_mimetypes.includes(this.mimetype)) {
      fs.writeFileSync(path.join(this.img_dir, filename), this.data);
      return { filename };
    }

    if (this.video_mimetypes.includes(this.mimetype)) {
      fs.writeFileSync(path.join(this.vid_dir, filename), this.data);
      return { filename };
    }

    throw new Error(`Invalid file MIME type: ${this.mimetype}`);
  };
}
