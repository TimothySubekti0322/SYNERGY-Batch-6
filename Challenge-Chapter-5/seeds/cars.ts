import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      name: "Avanza",
      cost: 100000,
      size: "Medium",
      imageurl: "/images/car.png",
    },
    {
      name: "Xenia",
      cost: 120000,
      size: "Medium",
      imageurl: "/images/car.png",
    },
    {
      name: "calya",
      cost: 110000,
      size: "Small",
      imageurl: "/images/car.png",
    },
    {
      name: "Fortuner",
      cost: 200000,
      size: "Large",
      imageurl: "/images/car.png",
    },
  ]);
}
