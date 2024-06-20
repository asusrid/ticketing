import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if ticket not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
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
