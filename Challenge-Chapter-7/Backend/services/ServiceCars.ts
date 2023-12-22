import { TParams } from "../interfaces/IRest";
import Cars, { ICars } from "../models/Cars";

class ServiceBooks {
  constructor() {}

  async create(payload: ICars) {
    try {
      const response = await Cars.create(payload);
      return response;
    } catch (error) {
      return error;
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

  async update(id: string, payload: any) {
    try {
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

export default new ServiceBooks();
