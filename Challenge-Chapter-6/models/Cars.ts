import { IRestModel, TParams } from "../interfaces/IRest";
import database from "../config/database";

type size = "Small" | "Medium" | "Large";

interface ICars {
  name: string;
  cost: number;
  size: size;
  available: boolean;
  published: boolean;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

class Cars {
  constructor() {}
  async create(payload: ICars) {
    try {
      const data = await database("cars").insert(payload);
      if (data) {
        return { message: "Success", status: 200 };
      }
      return { message: "Failed", status: 500 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async list(params?: TParams) {
    try {
      let data = await database
        .select("*")
        .from("cars")
        .where("published", true);

      if (params?.search == "available") {
        data = data.filter((item) => item.available === true);
      }

      if (data.length === 0) {
        return { message: "Data not found", status: 404 };
      }
      return { message: "Data Found", data: data, status: 200 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async remove(id: string, email: string) {
    try {
      const data = await database("cars")
        .where("id", id)
        .update({ published: false, delete_by: email });
      if (data) {
        return { message: "Success", status: 200 };
      }
      return { message: "Failed", status: 500 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async show(id: string) {
    try {
      const data = await database
        .select("*")
        .from("cars")
        .where("id", id)
        .where("published", true);

      if (data.length === 0) {
        return { message: "Data not found", status: 404 };
      }
      return { message: "Data Found", data: data, status: 200 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async update(id: string, payload: ICars) {
    try {
      const data = await database("cars").where("id", id).update(payload);
      if (data) {
        return { message: "Success", status: 200 };
      }
      return { message: "Failed", status: 500 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }
}

export default new Cars();
export { ICars };
