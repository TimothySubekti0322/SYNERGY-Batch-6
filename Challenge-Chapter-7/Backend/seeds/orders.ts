import { Knex } from "knex";
import { finished } from "stream";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("orders").del();

  // Inserts seed entries
  await knex("orders").insert([
    {
      id: 1,
      user_email: "member1@gmail.com",
      car: "Lamborgini",
      start_rent: "06/06/2023",
      finish_rent: "12/06/2023",
      price: 5400000,
      status: "finished",
    },
    {
      id: 2,
      user_email: "member1@gmail.com",
      car: "Ferrari",
      start_rent: "01/01/2024",
      finish_rent: "31/01/2024",
      price: 24800000,
      status: "rented",
    },
    {
      id: 3,
      user_email: "member1@gmail.com",
      car: "Agya",
      start_rent: "24/12/2023",
      finish_rent: "25/12/2023",
      price: 150000,
      status: "finisihed",
    },
  ]);
}
