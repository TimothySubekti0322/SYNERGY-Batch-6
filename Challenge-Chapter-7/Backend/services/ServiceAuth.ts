import {
  TParams,
  messageObject,
  messageObjectWithData,
} from "../interfaces/IRest";
import User, { IUser } from "../models/User";
import bcrypt from "bcrypt";
import "dotenv/config";

interface ILoginPayload {
  email: string;
  password: string;
}

class ServiceAuth {
  constructor() {}

  async login(payload: ILoginPayload): Promise<messageObjectWithData> {
    try {
      const response = await User.show(payload.email);

      // Error
      if (response.status !== 200) {
        return {
          message: response.message,
          data: response.data,
          status: response.status,
        };
      }

      // Email Found, then Check Password
      const isPasswordMatch = await bcrypt.compare(
        payload.password,
        response.data[0].password
      );
      if (!isPasswordMatch) {
        return { message: "Wrong Password", data: null, status: 400 };
      }
      return { message: "Login Success", data: response.data, status: 200 };
    } catch (error: any) {
      return { message: error, data: "", status: 500 };
    }
  }

  async register(payload: IUser): Promise<messageObject> {
    try {
      // Hash the password
      const saltRounds = 10; // Customize according to security needs
      const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

      // Replace the plain text password with the hashed password
      payload.password = hashedPassword;

      const response = await User.create(payload);

      // Error
      if (response.status !== 200) {
        return {
          message: response.message,
          status: response.status,
        };
      }
      return response;
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async registerAdmin(payload: IUser): Promise<messageObject> {
    try {
      // Hash the password
      const saltRounds = 10; // Customize according to security needs
      const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

      // Replace the plain text password with the hashed password
      payload.password = hashedPassword;

      const response = await User.create(payload);

      // Error
      if (response.status !== 200) {
        return {
          message: response.message,
          status: response.status,
        };
      }
      return response;
    } catch (error) {
      return { message: error, status: 500 };
    }
  }

  async profile(email: string): Promise<messageObjectWithData> {
    const response = await User.show(email);

    // Error
    if (response.status !== 200) {
      return {
        message: response.message,
        data: response.data,
        status: response.status,
      };
    }

    return { message: "Data Found", data: response.data, status: 200 };
  }
  catch(error: any) {
    return { message: error, data: "", status: 500 };
  }
}

export default new ServiceAuth();
