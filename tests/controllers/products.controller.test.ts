import app from "../../src/index";
import supertest from "supertest";

it("Should return all products from mongodb collection", async () => {
  const res = await supertest(app).get("/api/v2/products/");
  expect(res.status).toBe(403);
});