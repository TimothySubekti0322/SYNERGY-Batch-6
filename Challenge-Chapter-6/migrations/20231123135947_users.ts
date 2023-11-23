import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.string("email", 255).primary();
    table.string("username", 255).notNullable();
    table.string("password", 255).notNullable();
    table.enum("role", ["superadmin", "admin", "member"]).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
