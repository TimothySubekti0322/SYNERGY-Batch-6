import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  id!: number;
  title!: string;
  body!: string;
  approved!: boolean;

  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
