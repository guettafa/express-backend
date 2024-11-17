import app from "../../src/index";
import supertest from "supertest";

describe("Testing Products", () => {

  it("Should be 401 because there's no token", async () => {
    const res = await supertest(app).get("/api/v2/products/");
    expect(res.status).toBe(401);
  });
});