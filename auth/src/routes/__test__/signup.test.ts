import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 for invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test-invalid",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 for invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "002",
    })
    .expect(400);
});

it("returns a 400 for missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ password: "test" })
    .expect(400);
});

it("check duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
