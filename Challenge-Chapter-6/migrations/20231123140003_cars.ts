import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.integer("cost").notNullable();
    table.enum("size", ["Small", "Medium", "Large"]).notNullable();
    table.boolean("available").notNullable();
    table.boolean("published").defaultTo(true);
    table.string("created_at", 255).notNullable();
    table.string("created_by", 255).notNullable();
    table.string("updated_at", 255).notNullable();
    table.string("updated_by", 255).notNullable();
    table.string("deleted_by", 255).defaultTo(null);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
