import fs from "fs";
import path from "path";

export class UploadFile {
  public readonly out_dir = ".public";
  public readonly img_dir = "images";
  public readonly vid_dir = "videos";
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
      fs.writeFileSync(path.join(this.out_dir, this.img_dir, filename), this.data);
      return { filename };
    }

    if (this.video_mimetypes.includes(this.mimetype)) {
      fs.writeFileSync(path.join(this.out_dir, this.vid_dir, filename), this.data);
      return { filename };
    }

    throw new Error(`Invalid file MIME type: ${this.mimetype}`);
  };
}
