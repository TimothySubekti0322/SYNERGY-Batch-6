import { IRestModel, TParams } from "../interfaces/IRest";
import database from "../config/database";

type size = "Small" | "Medium" | "Large";

interface ICars {
  name: string;
  cost: number;
  size: size;
  available: boolean;
  published: boolean;
  start_rent: string;
  end_rent: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

interface payloads {
  name: string;
  cost: number;
  size: size;
  available: boolean;
  published: boolean;
  start_rent: string;
  end_rent: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  photo: any;
}

class Cars {
  constructor() {}
  async create(payload: ICars, imageUrl: string) {
    try {
      const id = await this.getHighestId();

      const newData = {
        id: id + 1,
        ...payload,
        imageUrl: imageUrl,
      };
      const data = await database("cars").insert(newData);
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
        .update({ published: false, deleted_by: email });
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

  async update(id: string, payload: payloads) {
    try {
      const { photo: photo, ...payloads } = payload;
      const data = await database("cars").where("id", id).update(payloads);
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
        .from("cars")
        .orderBy("id", "desc")
        .limit(1);
      return data[0].id;
    } catch (error) {
      return { message: error, status: 500 };
    }
  }
}

export default new Cars();
export { ICars };
