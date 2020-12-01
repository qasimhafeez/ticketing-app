import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("/api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("only access it if use is logged in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("return a status other than 401 if user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("error if invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      price: 10,
    })
    .expect(400);
});

it("error if invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "new title",
      price: -20,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "new title",
    })
    .expect(400);
});

it("check if ticket has valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title: "new title",
      price: 10,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(10);
});

it("Publishes an event", async () => {
  const title = "ajskdla";

  await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({
      title,
      price: 20,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
