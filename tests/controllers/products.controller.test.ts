import { before } from "node:test";
import app from "../../src/index";
import request from "supertest";

var token_gestionnaire = "";
var token_employee = "";

const API_ENDPOINT = "/api/v2/products/";

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

describe("POST Products", () => {
 
  it("Should not add a new product - 403 because is employee only", () => {
    request(app)
      .post(API_ENDPOINT).set("Authorization", 'Bearer ' + token_employee)
      .send(
        {
          "title": "swagman",
          "description": "my product",
          "quantity": 5,
          "category": "BestProduct",
          "price": 12.5
        }
      ).expect(403)
  });

  it("Should add a new product - 200 Product is created", () => {
    request(app)
      .post(API_ENDPOINT).set("Authorization", 'Bearer ' + token_gestionnaire)
      .send(
        {
          "title": "swagman",
          "description": "my product",
          "quantity": 5,
          "category": "BestProduct",
          "price": 12.5
        })
      .expect(200)
  });
});


describe("GET Products", () => {

  it("Should not retrieve all products - 401 because there's no token", async () => {
    request(app)
      .get(API_ENDPOINT)
      .expect(401); // Because there's no token
  });

  it("Should retrieve all products - 200 because token is valid", () => {
    request(app)
      .get(API_ENDPOINT).set("Authorization", 'Bearer ' + token_gestionnaire)
      .expect(200); // Because token should be valid
  });

  it("Should retrieve the product with title swagman - 200 because is gestionnaire", () => {
    request(app)
      .get(API_ENDPOINT + "swagman").set("Authorization", 'Bearer ' + token_gestionnaire)
      .expect(200)
  });

  it("Should not retrieve the product with title swagman - 403 because is employee", () => {
    request(app)
      .get(API_ENDPOINT + "swagman").set("Authorization", 'Bearer ' + token_employee)
      .expect(403)
  });
});