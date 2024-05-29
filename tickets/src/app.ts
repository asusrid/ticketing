import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@asr_microservices/common";
import { createTicketRouter } from "./routes/new";

const app = express();
// use nginx proxy and trust connections from it
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    // dont encrypt cookie
    signed: false,
    // only accept https connections for cookies
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(createTicketRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
