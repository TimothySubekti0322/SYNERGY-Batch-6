import Orders, { IOrder } from "../models/Order";

class ServiceOrder {
  constructor() {}

  async create(payload: IOrder) {
    try {
      const response = await Orders.create(payload);
      return response;
    } catch (error) {
      return error;
    }
  }

  async list() {
    try {
      const response = await Orders.list();
      return response;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const response = await Orders.remove(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async show(id: string) {
    try {
      const response = await Orders.show(id);
      return response;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, payload: any) {
    try {
      const response = await Orders.update(id, payload);
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default new ServiceOrder();
