var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable("cars", (table) => {
            table.increments("id").primary();
            table.string("title", 255).notNullable();
            table.text("body").notNullable();
            table.boolean("approved").notNullable().defaultTo(false);
        });
    });
}
export function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("cars");
    });
}
