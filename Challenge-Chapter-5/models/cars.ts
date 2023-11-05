import { Model, ModelObject } from "objection";

type size = "Small" | "Medium" | "Large";

export class CarsModel extends Model {
  id!: number;
  Name!: string;
  Cost!: string;
  Size!: size;

  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
