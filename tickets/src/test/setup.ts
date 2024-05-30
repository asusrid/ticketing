import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

// this will be used in all test files, and only affect test files
declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "sajbsjas";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  // build a jwt payload: {id,email}
  const payload = {
    id: "873hdbd",
    email: "test@test.com",
  };
  // create a jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build session object {jwt: MY_JWT}
  const session = { jwt: token };
  // turn that session into json
  const sessionJSON = JSON.stringify(session);
  // take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return the string express:sess... It must be an array as supertest expects cookies to be in an array
  return [`session=${base64}`];
};
