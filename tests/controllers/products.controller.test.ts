import { before } from "node:test";
import app from "../../src/index";
import supertest from "supertest";
import request from "supertest";

var token_gestionnaire = "";
var token_employee = "";

describe("Testing Products", () => {
 
  beforeAll(async () => {

    const res_gest = await request(app)
      .post("/api/v2/auth/login")
      .send({usernameOrEmail: "swag", password: "swag123"}); 

    token_gestionnaire = res_gest.body.token;
      
    const res_empl = await request(app)
      .post("/api/v2/auth/login")
      .send({usernameOrEmail: "coco", password: "coco123"});
      
    token_employee = res_empl.body.token;

    expect(res_empl.status).toBe(200); expect(res_gest.status).toBe(200);
  });

  it("Should try to retrieve all products - 401 because there's no token", async () => {
    request(app)
      .get("/api/v2/products/")
      .expect(401); // Because there's no token
  });

  it("Should try to retrieve all products - 200 because token is valid", () => {
    request(app)
      .get("/api/v2/products/").set("Authorization", 'Bearer ' + token_gestionnaire)
      .expect(200); // Because token should be valid
  });

});