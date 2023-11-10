import { Model, ModelObject } from "objection";

type size = "Small" | "Medium" | "Large";

export class CarsModel extends Model {
  id!: number;
  name!: string;
  cost!: string;
  size!: size;
  imageurl!: string;

  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
