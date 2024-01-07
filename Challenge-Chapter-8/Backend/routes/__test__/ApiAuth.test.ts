import App from "../../server";

import request from "supertest";

// Model
import User from "../../models/User";

const app = App;

// Login Test
describe("Login", () => {
  it("Login with superadmin account", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "superadmin@gmail.com",
      password: "superadmin",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual("Login Success");
    expect(response.body).toHaveProperty("token");
  });

  it("Login without email", async () => {
    const response = await request(app).post("/api/auth/login").send({
      password: "superadmin",
    });
    expect(response.status).toBe(400);
  });

  it("Login without password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "superadmin@Gmail.com",
    });
    expect(response.status).not.toBe(200);
  });

  it("Login with wrong password", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "superadmin@gmail.com",
      password: "mimin",
    });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Wrong Password");
  });

  it("Login with wrong email", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "dummy@gmail.com",
      password: "dummy",
    });
    expect(response.status).not.toBe(200);
  });
});

// Register Admin
describe("Register Admin", () => {
  it("Auhtorized Admin - Register Admin with valid data", async () => {
    const resLogin = await request(app).post("/api/auth/login").send({
      email: "superadmin@gmail.com",
      password: "superadmin",
    });
    const token = resLogin.body.token;
    const response = await request(app)
      .post("/api/auth/register-admin")
      .set("Authorization", `bearer ${token}`)
      .send({
        email: "newAdmin@gmail.com",
        username: "newAdmin",
        password: "newAdmin",
      });
    expect(response.status).toBe(200);

    const resDelete = await User.remove("newAdmin@gmail.com");
    expect(resDelete.status).toBe(200);
  });

  it("Auhtorized Admin - Register Admin with invalid data", async () => {
    const resLogin = await request(app).post("/api/auth/login").send({
      email: "superadmin@gmail.com",
      password: "superadmin",
    });
    const token = resLogin.body.token;
    const response = await request(app)
      .post("/api/auth/register-admin")
      .set("Authorization", `bearer ${token}`)
      .send({
        email: "newAdmin@gmail.com",
        password: "newAdmin",
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual(
      "Email, Username, and Password is required"
    );
  });

  it("Register Admin without bearer token", async () => {
    const response = await request(app).post("/api/auth/register-admin").send({
      email: "newAdmin@gmail.com",
      username: "newAdmin",
      password: "newAdmin",
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Authorization header missing");
  });

  it("Register Admin without token", async () => {
    const response = await request(app)
      .post("/api/auth/register-admin")
      .set("Authorization", "bearer ")
      .send({
        email: "newAdmin@gmail.com",
        username: "newAdmin",
        password: "newAdmin",
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Token Missing");
  });

  it("Register Admin with invalid bearer token", async () => {
    const response = await request(app)
      .post("/api/auth/register-admin")
      .set("Authorization", "bearer abc")
      .send({
        email: "newAdmin@gmail.com",
        username: "newAdmin",
        password: "newAdmin",
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toEqual("Invalid token.");
  });

  it("Register Admin with bearer token but not admin", async () => {
    const resLogin = await request(app).post("/api/auth/login").send({
      email: "member1@gmail.com",
      password: "member1",
    });
    const token = resLogin.body.token;
    const response = await request(app)
      .post("/api/auth/register-admin")
      .set("Authorization", `bearer ${token}`)
      .send({
        email: "newAdmin@gmail.com",
        username: "newAdmin",
        password: "newAdmin",
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Access denied. Not authorized.");
  });
});

// Register Member
describe("Register Member", () => {
  it("Register Member with valid data", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "newMember@gmail.com",
      username: "newMember",
      password: "newMember",
    });
    expect(response.status).toBe(200);
    const resDelete = await User.remove("newMember@gmail.com");
    expect(resDelete.status).toBe(200);
  });
});

// Profile Endpoint test
describe("Profile", () => {
  it("Authorized user - Get profile data", async () => {
    const resLogin = await request(app).post("/api/auth/login").send({
      email: "superadmin@gmail.com",
      password: "superadmin",
    });
    const token = resLogin.body.token;
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body[0].email).toEqual("superadmin@gmail.com");
  });

  it("Unauthorized user - Get profile data", async () => {
    const response = await request(app).get("/api/auth/profile");
    expect(response.status).toBe(401);
  });
});
