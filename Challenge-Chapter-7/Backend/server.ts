import express, { Express } from "express";
import path from "path";
import cors from "cors";

import ApiLogin from "./routes/api/ApiAuth";

import ApiCars from "./routes/api/ApiCars";

import ApiOrders from "./routes/api/ApiOrders";

const { PORT = 8000 } = process.env;
const PUBLIC_DIR = path.join(__dirname, "public");

class Server {
  private app: Express;
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.static(PUBLIC_DIR));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use("/api/auth", ApiLogin.routes());
    this.app.use("/api/cars", ApiCars.routes());
    this.app.use("/api/orders", ApiOrders.routes());
  }
  run() {
    this.app.listen(PORT, () => {
      console.log("Server running on http://localhost:%s", PORT);
    });
  }
}

new Server().run();
