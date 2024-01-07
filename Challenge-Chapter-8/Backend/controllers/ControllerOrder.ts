import { Request, Response } from "express";
import { IRestController } from "../interfaces/IRest";
import ServiceOrder from "../services/ServiceOrder";
import authToken from "../function/authToken";

class ControllerOrder implements IRestController {
  constructor() {}

  async list(req: Request, res: Response) {
    try {
      const auth = await authToken(req, res);
      if (auth.status !== 200) {
        return res.status(auth.status).json({
          data: auth,
        });
      }
      const response = await ServiceOrder.list();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const response = await ServiceOrder.show(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const tokenPayload = await authToken(req, res);
      req.body.user_email = tokenPayload.data.email;
      req.body.status = "rented"
      const response = await ServiceOrder.create(req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const auth = await authToken(req, res);
      if (auth.status !== 200) {
        return res.status(auth.status).json({
          data: auth,
        });
      }
      const response = await ServiceOrder.remove(req.params.id);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const auth = await authToken(req, res);
      if (auth.status !== 200) {
        return res.status(auth.status).json({
          data: auth,
        });
      }
      const response = await ServiceOrder.update(req.params.id, req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }
}

export default new ControllerOrder();
