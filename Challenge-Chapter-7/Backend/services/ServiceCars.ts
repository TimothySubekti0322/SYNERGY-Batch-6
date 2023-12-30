import { TParams } from "../interfaces/IRest";
import Cars, { ICars } from "../models/Cars";
import storage from "../config/storage";

class ServiceCars {
  constructor() {}

  async create(payload: ICars, reqfile: any) {
    try {
      const fileBase64 = reqfile.buffer.toString("base64");
      const file = `data:${reqfile.mimetype};base64,${fileBase64}`;

      const uploadResponse = await storage.uploader.upload(file);

      console.log(uploadResponse);

      const imageUrl: string = uploadResponse.url;
      const response = await Cars.create(payload, imageUrl);
      return response;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }

  async list(params?: TParams) {
    try {
      const response = await Cars.list();
      return response;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string, email: string) {
    try {
      const response = await Cars.remove(id, email);
      return response;
    } catch (error) {
      return error;
    }
  }

  async show(id: string) {
    try {
      const response = await Cars.show(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, payload: any, reqfile: any) {
    try {
      if (reqfile) {
        const fileBase64 = reqfile.buffer.toString("base64");
        const file = `data:${reqfile.mimetype};base64,${fileBase64}`;

        const uploadResponse = await storage.uploader.upload(file);

        console.log(uploadResponse);

        const imageUrl: string = uploadResponse.url;
        payload.imageUrl = imageUrl;
      }
      const response = await Cars.update(id, payload);
      return response;
    } catch (error) {
      return error;
    }
  }

  async available() {
    try {
      const params: TParams = { search: "available", page: 1, size: 10 };
      const response = await Cars.list(params);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceCars();
