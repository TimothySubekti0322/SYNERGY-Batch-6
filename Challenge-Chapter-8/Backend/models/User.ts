import { TParams } from "../interfaces/IRest";
import database from "../config/database";

type Role = "superadmin" | "admin" | "member";

interface IUser {
  // id: string;
  email: string;
  username: string;
  password: string;
  role: Role;
}

class User {
  constructor() {}
  async create(payload: IUser) {
    try {
      const data = await database("users").insert(payload);
      if (!data) {
        return { message: "Failed add new user", status: 500 };
      }
      return { message: "Success add new user", status: 200 };
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async list(params?: TParams) {
    const data = await database.select("*").from("users");
    return data as IUser[];
  }

  async show(email: string) {
    try {
      const data = await database
        .select("*")
        .from("users")
        .where("email", email);
      if (data.length === 0) {
        return { message: "Data not found", data: "", status: 404 };
      }
      return { message: "Data Found", data: data, status: 200 };
    } catch (error) {
      return { message: error, data: "", status: 400 };
    }
  }
}

export default new User();
export { IUser };
