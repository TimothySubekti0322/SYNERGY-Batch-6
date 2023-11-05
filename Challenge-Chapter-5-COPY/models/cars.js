import { Model } from "objection";
export class CarsModel extends Model {
    static get tableName() {
        return "cars";
    }
}
