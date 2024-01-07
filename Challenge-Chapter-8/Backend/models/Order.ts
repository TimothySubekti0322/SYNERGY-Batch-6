import database from "../config/database";

interface IOrder {
  id: string;
  user_email: string;
  car: string;
  start_rent: string;
  finish_rent: string;
  price: number;
  status: string;
}

class Order {
  constructor() {}
  async create(payload: IOrder) {
    try {
      const data = await database("orders").insert(payload);
      if (data) {
        return { message: "Success", status: 201 };
      }
      return { message: "Failed", status: 500 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async list() {
    try {
      const data = await database.select("*").from("orders");

      if (data.length === 0) {
        return { message: "Data not found", data: [], status: 404 };
      }
      return { message: "Data Found", data: data, status: 200 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async show(id: string) {
    try {
      const data = await database.select("*").from("orders").where("id", id);
      if (data.length === 0) {
        return { message: "Data not found", data: [], status: 404 };
      }
      return { message: "Data Found", data: data, status: 200 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async remove(id: string) {
    try {
      const data = await database("orders").where("id", id).del();
      if (data) {
        return { message: "Success", status: 200 };
      }
      return { message: "Failed", status: 500 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async update(id: string, payload: any) {
    try {
      const data = await database("orders").where("id", id).update(payload);
      if (data) {
        return { message: "Success", status: 200 };
      }
      return { message: "Failed", status: 500 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async getHighestId() {
    try {
      const data = await database
        .select("*")
        .from("orders")
        .orderBy("id", "desc")
        .limit(1);
      return data[0].id;
    } catch (error) {
      return { message: error, status: 500 };
    }
  }
}

export default new Order();
export { IOrder };
