import request from "supertest";
import { app } from "../../app";

it("validate the current user by verifying the cookie", async () => {
  const cookie = await global.signup();

  const response = await request(app)
    .get("/api/users/current-user")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("returns null if current user is not authenticated", async () => {
  const response = await request(app)
    .get("api/users/current-user")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
