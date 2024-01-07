import App from "../../server";

import request from "supertest";

import path from "path";

// Model
import Cars from "../../models/Cars";

const app = App;

describe("API Cars Test", () => {
  let newId = 1;
  let token = "";
  describe("GET /api/cars", () => {
    it("Authorized User - Get all cars", async () => {
      const resLogin = await request(app).post("/api/auth/login").send({
        email: "superadmin@gmail.com",
        password: "superadmin",
      });
      token = resLogin.body.token;
      const response = await request(app)
        .get("/api/cars")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Data Found");
      expect(response.body).toHaveProperty("data");
    });

    it("Unauthorized User - Get all cars", async () => {
      const response = await request(app).get("/api/cars");
      expect(response.status).toBe(401);
    });

    it("no token provided - Get all cars", async () => {
      const response = await request(app)
        .get("/api/cars")
        .set("Authorization", `bearer `);
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual(
        "Access denied. No token provided."
      );
    });

    it("Access Denied for non superadmin and admin- Get all cars", async () => {
      const resLogin = await request(app).post("/api/auth/login").send({
        email: "member1@gmail.com",
        password: "member1",
      });
      const token = resLogin.body.token;
      const response = await request(app)
        .get("/api/cars")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual("Access denied. Not authorized.");
    });
  });

  describe("GET /api/cars/available", () => {
    it("Authorized User - Get all available cars", async () => {
      const response = await request(app)
        .get("/api/cars/available")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Data Found");
      expect(response.body).toHaveProperty("data");
    });

    it("wrong token - Get all available cars", async () => {
      const response = await request(app)
        .get("/api/cars/available")
        .set("Authorization", `bearer abc`);
      expect(response.status).toBe(400);
    });

    it("Unauthorized User - Get all available cars", async () => {
      const response = await request(app).get("/api/cars/available");
      expect(response.status).toBe(401);
    });
  });

  describe("POST /api/cars", () => {
    it("Authorized User - Create car", async () => {
      const picture = path.resolve(__dirname, "./test-image.png");
      const response = await request(app)
        .post("/api/cars")
        .set("Authorization", `bearer ${token}`)
        .field("name", "BMW")
        .field("cost", 1000000)
        .field("size", "Medium")
        .attach("photo", picture);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Success");
      const newCarId = await Cars.getHighestId();
      newId = newCarId;
    }, 10000);
  });

  describe("GET /api/cars/:id", () => {
    it("Authorized User - Get car by id", async () => {
      const response = await request(app)
        .get(`/api/cars/${newId}`)
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Data Found");
      expect(response.body).toHaveProperty("data");
    });

    it("Unauthorized User - Get car by id", async () => {
      const response = await request(app).get(`/api/cars/${newId}`);
      expect(response.status).toBe(401);
    });
  });

  describe("PUT /api/cars/:id", () => {
    it("Authorized User - Update car by id", async () => {
      const response = await request(app)
        .put(`/api/cars/${newId}`)
        .set("Authorization", `bearer ${token}`)
        .send({
          cost: 800000,
        });
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Success");
    });
  });

  describe("DELETE /api/cars/:id", () => {
    it("Authorized User - Delete car by id", async () => {
      const response = await request(app)
        .delete(`/api/cars/${newId}`)
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Success");
    });
  });
});
