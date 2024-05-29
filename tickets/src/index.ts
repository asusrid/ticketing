import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY cannot be found");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!");
  });
};

start();
