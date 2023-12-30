import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      email: "superadmin@gmail.com",
      username: "Super Admin",
      password: "$2a$10$krhqliVR7raNBkDm27rTQuOWl7Va5Go0LRHf9pJoybpId6JYoSE8W",
      role: "superadmin",
    },
    {
      email: "admin1@gmail.com",
      username: "Admin 1",
      password: "$2a$10$CjgG/r/AoOKC./Qr8bTJ.uHrW6MlQoclmuV1lnnZJlEriIK3uqREW",
      role: "admin",
    },
    {
      email: "member1@gmail.com",
      username: "Member 1",
      password: "$2a$10$765yR7YLbABVAu9AErf0mOh3AkwnBFwlNmq6258hnCsEDNtDS0Jjm",
      role: "member",
    },
  ]);
}
