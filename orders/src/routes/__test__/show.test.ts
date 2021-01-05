import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("fetch the order", async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: "title",
    price: 10,
  });
  await ticket.save();

  const user = global.signup();

  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch an order
  const { body: fetchOrder } = await request(app)
    .get(`/api/order/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  expect(fetchOrder.id).toEqual(order.id);
});

it("Error: User unable to fetch another user order", async () => {
  // create a ticket
  const ticket = Ticket.build({
    title: "title",
    price: 10,
  });
  await ticket.save();

  const user = global.signup();

  // make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // make request to fetch an order
  await request(app)
    .get(`/api/order/${order.id}`)
    .set("Cookie", global.signup())
    .send()
    .expect(401);
});
