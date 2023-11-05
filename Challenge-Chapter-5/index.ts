import express, { Express, Response, Request } from "express";
import knex from "knex";
import { CarsModel, Cars } from "./models/cars";
import { Model, NotFoundError } from "objection";
import path from "path";
import bodyParser from "body-parser";
import "dotenv/config";

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
  // console.log(car);
  res.render("editCar", { car: car });
});

app.get("/api/cars", async (_, res: Response) => {
  const cars = await CarsModel.query();
  return res.json(cars);
});

app.post("/api/cars", async (req: Request<{}, {}, Cars>, res: Response) => {
  const body = req.body;
  // console.log(body);
  const car = await CarsModel.query().insert(body).returning("*");
  if (car) {
    messageStatus = "Data Berhasil Disimpan";
  } else {
    messageStatus = "Data Gagal Disimpan";
  }
  // return res.json(car);
  res.redirect("/");
});

app.patch(
  "/api/cars/:id",
  async (req: Request<IParams, {}, Partial<Cars>>, res: Response) => {
    const body = req.body;
    const id = req.params.id;
    const cars = await CarsModel.query()
      .where({ id })
      .patch(body)
      .throwIfNotFound()
      .returning("*");
    if (cars) {
      messageStatus = "Data Berhasil Diupdate";
    } else {
      messageStatus = "Data Gagal Diupdate";
    }
    return res.json(cars);
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
