import request from "supertest";
import { app } from "../../app";

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signup())
    .send({ title: "new title", price: 10 });
};

it("retrive all tickets", async () => {
  // Create 3 tickets
  await createTicket();
  await createTicket();
  await createTicket();

  // Fetch those created 3 tickets
  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
