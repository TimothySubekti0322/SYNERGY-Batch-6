import { Request, Response } from "express";
import { messageObjectWithData } from "../interfaces/IRest";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function authToken(
  req: Request,
  res: Response
): Promise<messageObjectWithData> {
  try {
    // Check Authorization header
    const header = req.headers.authorization;

    if (!header) {
      return {
        message: "Authorization header missing",
        data: null,
        status: 401,
      };
    }

    // Retrieve the token from the Authorization header
    const token = header?.split(" ")[1];

    if (!token) {
      return { message: "Token Missing", data: null, status: 401 };
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    if (!decoded) {
      return { message: "Invalid token", data: null, status: 401 };
    }

    return { message: "Valid token", data: decoded, status: 200 };
  } catch (error) {
    return { message: "Invalid token.", data: null, status: 401 };
  }
}

export default authToken;
