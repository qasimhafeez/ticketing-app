import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Order, OrderStatus } from "../../models/order";
import { Ticket } from "../../models/ticket";

it("returns an error if ticket does not exists", async () => {
  const ticketId = mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signup())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if ticket is already reserved", async () => {
  const ticket = Ticket.build({
    title: "newtitle",
    price: 10,
  });
  await ticket.save();

  const order = Order.build({
    ticket,
    userId: "userid",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signup())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserve a ticket", async () => {
  const ticket = Ticket.build({
    title: "newtitle",
    price: 10,
  });
  await ticket.save();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signup())
    .send({ ticketId: ticket.id })
    .expect(201);
});
