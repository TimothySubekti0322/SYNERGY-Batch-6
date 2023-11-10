import express, { Express, Response, Request } from "express";
import knex from "knex";
import { CarsModel, Cars } from "./models/cars";
import { Model, NotFoundError } from "objection";
import path from "path";
import bodyParser from "body-parser";
import "dotenv/config";
import storage from "./config/storage";
import upload from "./config/upload";

// instantiate express
const app: Express = express();

// define port
const PORT: number = 8000;

// define static directory
const PUBLIC_DIR: string = path.join(__dirname, "public");
app.use(express.static(PUBLIC_DIR));

// set view engine ejs
app.set("view engine", "ejs");

// define knex instance
const knexInstance = knex({
  client: process.env.DB_CLIENT,
  connection: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
});

interface IParams {
  id: string;
}

Model.knex(knexInstance);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Global variabel
var messageStatus: string = "";

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/addCar", (req: Request, res: Response) => {
  res.render("addCar");
});

app.get("/status", (req: Request, res: Response) => {
  const message = messageStatus;
  messageStatus = "";
  return res.json({ message: message });
});

app.get("/edit/:id", async (req: Request<IParams>, res: Response) => {
  const id = req.params.id;
  const car = await CarsModel.query().findById(id).throwIfNotFound();
  res.render("editCar", { car: car });
});

app.get("/api/cars", async (_, res: Response) => {
  const cars = await CarsModel.query();
  return res.json(cars);
});

app.post(
  "/api/cars",
  upload.single("photo"),
  async (req: Request<{}, {}, Cars>, res: Response) => {
    try {
      if (!req.file) throw new Error("No file uploaded.");

      const fileBase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${fileBase64}`;

      const uploadResponse = await storage.uploader.upload(file);

      console.log(uploadResponse);

      const carData = {
        ...req.body,
        imageurl: uploadResponse.url,
      };

      console.log(carData);
      // console.log(body);
      const car = await CarsModel.query().insert(carData).returning("*");
      messageStatus = car ? "Data Berhasil Disimpan" : "Data Gagal Disimpan";
      // return res.json(car);
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to upload file and save data" });
    }
  }
);

app.patch(
  "/api/cars/:id",
  upload.single("photo"),
  async (req: Request<{ id: string }, {}, Partial<Cars>>, res: Response) => {
    try {
      const carData = {
        ...req.body,
      };
      console.log(carData);
      if (req.file) {
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;

        const uploadResponse = await storage.uploader.upload(file);
        carData.imageurl = uploadResponse.url;
      }
      const id = req.params.id;
      const car = await CarsModel.query()
        .where({ id })
        .patch(carData)
        .throwIfNotFound()
        .returning("*");
      messageStatus = car ? "Data Berhasil Diupdate" : "Data Gagal Diupdate";
      console.log(messageStatus);
      res.json(car);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to upload file and save data" });
    }
  }
);

app.delete("/api/cars/:id", async (req: Request<IParams>, res: Response) => {
  const id = req.params.id;
  const cars = await CarsModel.query()
    .where({ id })
    .del()
    .throwIfNotFound()
    .returning("*");
  if (cars) {
    messageStatus = "Data Berhasil Dihapus";
  } else {
    messageStatus = "Data Gagal Dihapus";
  }
  return res.json({ message: "Success delete articles" });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
