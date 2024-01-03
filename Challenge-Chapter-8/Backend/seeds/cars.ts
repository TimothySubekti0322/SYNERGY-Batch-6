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
      imageUrl:
        "https://res.cloudinary.com/dlx2svkha/image/upload/v1703864474/SYNERGY%20CH%207%20sample/hbyljb4nuj0pr6zd4imw.png",
      available: true,
      published: true,
      start_rent: "06/06/2023",
      finish_rent: "12/06/2023",
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
      imageUrl:
        "https://res.cloudinary.com/dlx2svkha/image/upload/v1703864471/SYNERGY%20CH%207%20sample/x6aqq7dyuespe5smluaz.png",
      available: false,
      published: true,
      start_rent: "01/01/2024",
      finish_rent: "31/01/2024",
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
      imageUrl:
        "https://res.cloudinary.com/dlx2svkha/image/upload/v1703864474/SYNERGY%20CH%207%20sample/opdtpkcbmaegnhtjvqnz.png",
      available: true,
      published: false,
      start_rent: "24/12/2023",
      finish_rent: "25/12/2023",
      created_at: "2023-02-14",
      created_by: "superadmin@gmail.com",
      updated_at: "2023-06-17",
      updated_by: "admin1@gmail.com",
      deleted_by: "admin1@gmail.com",
    },
    {
      id: 4,
      name: "innova",
      cost: 300000,
      size: "Medium",
      imageUrl:
        "https://res.cloudinary.com/dlx2svkha/image/upload/v1703864713/SYNERGY%20CH%207%20sample/yzoudxbqknxqjte2zwkp.png",
      available: true,
      published: true,
      start_rent: "",
      finish_rent: "",
      created_at: "2023-02-14",
      created_by: "superadmin@gmail.com",
      updated_at: "2023-06-17",
      updated_by: "admin1@gmail.com",
      deleted_by: "admin1@gmail.com",
    },
  ]);
}
