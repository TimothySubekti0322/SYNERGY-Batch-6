import App from "../../server";

import request from "supertest";

// Model
import Order from "../../models/Order";

const app = App;

describe("API Order Test", () => {
  let newId = 0;
  let token = "";
  describe("GET /api/orders", () => {
    it("Authorized User - Get all order", async () => {
      const resLogin = await request(app).post("/api/auth/login").send({
        email: "superadmin@gmail.com",
        password: "superadmin",
      });
      token = resLogin.body.token;
      const response = await request(app)
        .get("/api/orders")
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it("Unauthorized User - Get all order", async () => {
      const response = await request(app)
        .get("/api/orders")
        .set("Authorization", `bearer `);
      expect(response.status).not.toBe(200);
    });
  });

  describe("POST /api/orders", () => {
    it("Authorized User - Create order", async () => {
      const response = await request(app)
        .post("/api/orders")
        .set("Authorization", `bearer ${token}`)
        .send({
          car: "BMW",
          start_rent: "28/12/2023",
          finish_rent: "28/12/2023",
          price: 1000000,
        });
      expect(response.body.status).toBe(201);
      expect(response.body.message).toEqual("Success");
      const newOrderId = await Order.getHighestId();
      newId = newOrderId;
    });
  });

  describe("GET /api/orders/:id", () => {
    it("Authorized User - Get order by id", async () => {
      const response = await request(app).get(`/api/orders/${newId}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual("Data Found");
    });
  });

  describe("PUT /api/orders/:id", () => {
    it("Authorized User - Update order", async () => {
      const response = await request(app)
        .put(`/api/orders/${newId}`)
        .set("Authorization", `bearer ${token}`)
        .send({
          car: "BMW",
          start_rent: "28/12/2023",
          finish_rent: "29/12/2023",
          price: 2000000,
        });
      expect(response.status).toBe(200);
    });
  });

  describe("DELETE /api/orders/:id", () => {
    it("Authorized User - Delete order", async () => {
      const response = await request(app)
        .delete(`/api/orders/${newId}`)
        .set("Authorization", `bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
