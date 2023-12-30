import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

class Media {
  private _upload;
  private _storage;
  constructor() {
    this._upload = multer({ storage: multer.memoryStorage() });
    this._storage = cloudinary.config({
      cloud_name: "dlx2svkha",
      api_key: "458633577437133",
      api_secret: "FOaAHXuklKCqV0W1C6bgtXDhqhA",
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
