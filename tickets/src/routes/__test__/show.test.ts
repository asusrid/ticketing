import request from "supertest";
import { app } from "../../app";

it("returns a 404 if ticket not found", async () => {
  await request(app).get("/api/tickets/asasbjbj").send().expect(404);
});

it("returns the ticket if found", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title: "example",
      price: 10,
    })
    .expect(201);

  const ticket = await request(app)
    .get(`/api/tickets${response.body.id}`)
    .send()
    .expect(200);

  expect(ticket.body.title).toEqual("example");
  expect(ticket.body.price).toEqual(10);
});
