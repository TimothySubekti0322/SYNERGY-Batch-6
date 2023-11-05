import { Request, Response } from "express";

const route = {
  getLandingPage(req: Request, res: Response) {
    res.render("index");
  },
};

export default route;
