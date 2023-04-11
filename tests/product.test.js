const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");
require("dotenv").config();

jest.setTimeout(300000);

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST /user/login", () => {
  it("should login user", async () => {
    const res = (await request(app).post("/user/login")).send({
      email: "bob@gmail.com",
      password: "bob",
    });
    expect(res.statusCode).toBe(200);
  });
});
