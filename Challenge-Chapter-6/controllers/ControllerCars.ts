import { Request, Response } from "express";
import { IRestController } from "../interfaces/IRest";
import ServiceCars from "../services/ServiceCars";
import authToken from "../function/authToken";

class ControllerCars implements IRestController {
  constructor() {}

  async list(req: Request, res: Response) {
    try {
      const response = await ServiceCars.list();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const response = await ServiceCars.show(req.params.id);
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
      const email = tokenPayload.data.email;
      req.body.created_by = email;
      req.body.updated_by = email;

      const Date = getCurrentDate();

      req.body.created_at = Date;
      req.body.updated_at = Date;

      const response = await ServiceCars.create(req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const tokenPayload = await authToken(req, res);
      const email = tokenPayload.data.email;
      const response = await ServiceCars.remove(req.params.id, email);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const tokenPayload = await authToken(req, res);
      const email = tokenPayload.data.email;
      req.body.updated_by = email;

      const Date = getCurrentDate();
      req.body.updated_at = Date;

      const response = await ServiceCars.update(req.params.id, req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }

  async available(req: Request, res: Response) {
    try {
      const response = await ServiceCars.available();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({
        data: error,
      });
    }
  }
}

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default new ControllerCars();
