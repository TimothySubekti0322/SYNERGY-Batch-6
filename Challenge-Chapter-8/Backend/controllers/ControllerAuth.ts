import { Request, Response } from "express";
import authToken from "../function/authToken";
import ServiceAuth from "../services/ServiceAuth";
import jwt from "jsonwebtoken";
import "dotenv/config";

class ControllerLogin {
  constructor() {}

  async login(req: Request, res: Response) {
    try {
      const response = await ServiceAuth.login(req.body);

      if (response.status !== 200) {
        return res.status(response.status).json({ message: response.message });
      }

      // Generate Token

      const token = jwt.sign(
        {
          email: response.data[0].email,
          Username: response.data[0].username,
          role: response.data[0].role,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        message: response.message,
        token: token,
        role: response.data[0].role,
      });
    } catch (error) {
      res.status(500).json({
        message: "JWT Error",
      });
    }
  }

  async register(req: Request, res: Response) {
    const role = "member";
    req.body.role = role;
    try {
      const response = await ServiceAuth.register(req.body);

      if (response.status !== 200) {
        return res.status(response.status).json({ message: response.message });
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async registerAdmin(req: Request, res: Response) {
    const role = "admin";
    req.body.role = role;
    try {
      if (!req.body.email || !req.body.username || !req.body.password) {
        return res
          .status(400)
          .json({ message: "Email, Username, and Password is required" });
      }

      const response = await ServiceAuth.registerAdmin(req.body);

      if (response.status !== 200) {
        return res.status(response.status).json({ message: response.message });
      }

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }

  async profile(req: Request, res: Response) {
    try {
      const body = await authToken(req, res);

      if (body.status !== 200) {
        return res.status(body.status).json({ message: body.message });
      }
      const response = await ServiceAuth.profile(body.data.email);

      if (response.status !== 200) {
        return res.status(response.status).json({ message: response.message });
      }

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({
        message: error,
      });
    }
  }
}

export default new ControllerLogin();
