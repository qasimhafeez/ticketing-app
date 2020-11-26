import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if id does not exists", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signup())
    .send({ title: "new title", price: 10 })
    .expect(404);
});

it("returns a 401 if unauthorized", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "new title", price: 10 })
    .expect(401);
});

it("returns a 401 if user does not own a ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "new title",
      price: 10,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signup())
    .send({ title: "update title", price: 30 })
    .expect(401);
});

it("returns a 401 if title or price is invalid", async () => {
  // Create a ticket
  const cookie = global.signup();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 10,
    });

  // Check for valid Updation
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: -10,
    })
    .expect(400);
});

it("update ticket for valid inputs", async () => {
  // Create a ticket
  const cookie = global.signup();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 10,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "update title", price: 20 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("update title");
  expect(ticketResponse.body.price).toEqual(20);
});
