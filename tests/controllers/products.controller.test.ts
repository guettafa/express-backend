import app from "../../src/index";
import request from "supertest";

var token_gestionnaire = "";
var token_employee = "";

const API_ENDPOINT = "/api/v2/products/";

beforeAll( async () => {

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
  
  it("Should not add a new product - 403 because is employee only", async () => {
    await post_product(403, false); 
  });
  
  // it("Should add a new product - 201 Product is created", async () => {
  //   await post_product(201, true);
  // });
});
  
  
describe("GET Products", () => {
  
  it("Should not retrieve the product because it dosnt't exist - 404 no product found", async () => {
    await get_product(404, true, true, "abcdefghijklmnopqrstuv");
  })

  it("Should not retrieve all products - 401 because there's no token", async () => {
    await get_product(401, false, false); // has no token
  });
  
  it("Should retrieve all products - 200 because token is valid", async () => {
    await get_product(200, false, true); // has token and is an employee 
  });
  
  it("Should retrieve the product with title swagman - 200 because have token", async () => {
    await get_product(200, false, true, "swagman"); // has token and is a gestionnaire
  });
  
  it("Should not retrieve the product with title swagman - 401 because no token", async () => {
    await get_product(401, false, false, "swagman"); // has no token
  });
});

describe("DELETE Product", () => {
  
  it("Should delete the product associated with the title - ", () => {
    delete_product(204, true, 'swagman');
  })
});


// Method for tests
const post_product = async (expected_status: number, isGestionnaire: boolean) => {
  await request(app)
    .post(API_ENDPOINT)
    .set("Authorization", 'Bearer ' + (isGestionnaire ? token_gestionnaire : token_employee))
    .send(
      {
        "title": "swagman",
        "description": "my product",
        "quantity": 5,
        "category": "BestProduct",
        "price": 12.5 
      }
    ).expect(expected_status);
}


const get_product = async (expected_status: number, isGestionnaire: boolean, hasToken: boolean, title: string = "") => {
  const res = await request(app)
    .get(API_ENDPOINT + title).set("Authorization", 'Bearer ' + (hasToken ? (isGestionnaire ? token_gestionnaire : token_employee) : ""))
    .expect(expected_status); 
  return res;
}

const put_product = async (expected_status: number, isGestionnaire: boolean) => {
  // do something
} 

const delete_product = async (expected_status: number, isGestionnaire: boolean, title: string) => {
  const ENDPOINT = API_ENDPOINT + title;

  await request(app)
    .delete(ENDPOINT)
    .set("Authorization", "Bearer" + (isGestionnaire ? token_gestionnaire : token_employee))
    .expect(expected_status);
  
  const res = await get_product(404, true, true, title);

  expect(res.body).toBe(null);
}