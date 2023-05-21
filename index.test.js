const request = require("supertest");
const app = require("./index");

describe("POST /calculate-net-worth", () => {
  it("should calculate net worth and return the result", async () => {
    const requestBody = {
      assets: [
        { amount: "1000.00" },
        { amount: "2000.00" },
        { amount: "3000.00" },
      ],
      liabilities: [{ amount: "500.00" }, { amount: "1000.00" }],
      currency: "USD",
    };

    const expectedResponse = {
      assets: "6000.00",
      liabilities: "1500.00",
      netWorth: "4500.00",
      conversion: "4500.00",
      currency: "USD",
    };

    const response = await request(app)
      .post("/calculate-net-worth")
      .send(requestBody)
      .expect(200);

    expect(response.body).toEqual(expectedResponse);
  });

  it("should return an error if missing parameters", async () => {
    const requestBody = {};

    const expectedResponse = {
      error: "Missing parameters",
    };

    const response = await request(app)
      .post("/calculate-net-worth")
      .send(requestBody)
      .expect(400);

    expect(response.body).toEqual(expectedResponse);
  });

  it("should handle currency conversion correctly", async () => {
    const requestBody = {
      assets: [{ amount: "6000.00" }],
      liabilities: [{ amount: "0.00" }],
      currency: "EUR",
    };

    const response = await request(app)
      .post("/calculate-net-worth")
      .send(requestBody);

    expect(response.statusCode).toBe(200);
    expect(response.body.currency).toBe("EUR");
  });
});
