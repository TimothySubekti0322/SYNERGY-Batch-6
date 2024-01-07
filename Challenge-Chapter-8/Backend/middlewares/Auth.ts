import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

class Auth {
  constructor() {}

  authorizeSuperAdmin(req: Request, res: Response, next: NextFunction) {
    // Check Authorization header
    const header = req.headers.authorization;

    if (!header) {
      return res
        .status(401)
        .send({ message: "Authorization header missing", status: 401 });
    }

    // Retrieve the token from the Authorization header
    const token = header?.split(" ")[1];

    if (!token) {
      return res.status(401).send({ message: "Token Missing", status: 401 });
    }
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

      if (!decoded) {
        return { message: "Invalid token", status: 401 };
      }

      // Check if the role is 'superadmin'
      if (typeof decoded !== "string" && decoded.role === "superadmin") {
        next();
      } else {
        return res
          .status(401)
          .send({ message: "Access denied. Not authorized." });
      }
    } catch (error) {
      res.status(400).send({ message: "Invalid token." });
    }
  }

  authorizeAdminOrSuperAdmin(req: Request, res: Response, next: NextFunction) {
    // Check Authorization header
    const header = req.headers.authorization;

    if (!header) {
      return res
        .status(401)
        .send({ message: "Authorization header missing", status: 401 });
    }

    // Retrieve the token from the Authorization header
    const token = header?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });
    }
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

      if (!decoded) {
        return { message: "Invalid token", status: 401 };
      }

      // Check if the role is 'admin' or 'superadmin'
      if (
        typeof decoded !== "string" &&
        (decoded.role === "admin" || decoded.role === "superadmin")
      ) {
        next();
      } else {
        return res
          .status(401)
          .send({ message: "Access denied. Not authorized." });
      }
    } catch (error) {
      res.status(400).send({ message: "Invalid token." });
    }
  }
}

export default new Auth();
