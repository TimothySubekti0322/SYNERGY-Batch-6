import { Knex } from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.integer("cost").notNullable();
    table.enum("size", ["Small", "Medium", "Large"]).notNullable();
    table.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    table.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable("cars");
}
