import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      id: 1,
      name: "Lamborgini",
      cost: 900000,
      size: "Medium",
      available: true,
      published: true,
      created_at: "2021-09-01",
      created_by: "superadmin@gmail.com",
      updated_at: "2021-09-01",
      updated_by: "superadmin@gmail.com",
      deleted_by: null,
    },
    {
      id: 2,
      name: "Ferrari",
      cost: 800000,
      size: "Medium",
      available: false,
      published: true,
      created_at: "2021-09-01",
      created_by: "admin1@gmail.com",
      updated_at: "2022-06-12",
      updated_by: "superadmin@gmail.com",
      deleted_by: null,
    },
    {
      id: 3,
      name: "Agya",
      cost: 150000,
      size: "Small",
      available: true,
      published: false,
      created_at: "2023-02-14",
      created_by: "superadmin@gmail.com",
      updated_at: "2023-06-17",
      updated_by: "admin1@gmail.com",
      deleted_by: "admin1@gmail.com",
    },
  ]);
}
