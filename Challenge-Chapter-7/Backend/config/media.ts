import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

class Media {
  private _upload;
  private _storage;
  constructor() {
    this._upload = multer({ storage: multer.memoryStorage() });
    this._storage = cloudinary.config({
      cloud_name: "dejzl6ltm",
      api_key: "352252394137947",
      api_secret: "Dh-Ln1exdFdPxiwjFlhBhD3o5zU",
    });
  }

  get upload() {
    return this._upload;
  }

  get storage() {
    return this._storage;
  }
}

export default new Media();
