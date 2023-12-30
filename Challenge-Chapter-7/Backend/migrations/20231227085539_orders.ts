import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("orders", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("user_email").notNullable();
    table.string("car", 255).notNullable();
    table.string("start_rent", 255).notNullable();
    table.string("finish_rent", 255).notNullable();
    table.integer("price", 255).notNullable();
    table.string("status", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("orders");
}
