const request = require("supertest");
const app = require("../server");

describe("Auth tests", () => {
  it("Should load login page", async () => {
    const res = await request(app).get("/login");
    expect(res.statusCode).toBe(200);
  });
});
