import request from "supertest";
import { app } from "../../app";

it("response with details about current user", async () => {
  const signupRes = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test1.com",
      password: "password",
    })
    .expect(201);
  const cookie = signupRes.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    // to set headers
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test1.com");
});
