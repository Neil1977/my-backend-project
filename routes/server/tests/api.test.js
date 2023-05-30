const request = require("supertest");
const app = require("../../server/server"); // Update the path to reflect the correct location of server.js

// Setup and teardown for each test
beforeEach(() => {
  // Add any setup logic here if needed
});

afterEach(() => {
  // Add any teardown logic here if needed
});

describe("Authentication", () => {
  it("should authenticate a user and return a JWT token", async () => {
    // Mock a user object with necessary details
    const user = {
      email: "test@example.com",
      password: "test123",
    };

    // Send a POST request to the login endpoint
    const response = await request(app).post("/login").send(user);

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Assert that the response body contains the JWT token
    expect(response.body).toHaveProperty("token");
  });

  // Add more test cases for authentication if needed
});

describe("Protected Routes", () => {
  let authToken;

  beforeEach(async () => {
    // Mock an authenticated user and get the JWT token
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "test123" });

    authToken = response.body.token;
  });

  it("should get a protected resource when authorized", async () => {
    // Send a GET request to a protected route with the JWT token
    const response = await request(app)
      .get("/protected")
      .set("Authorization", `Bearer ${authToken}`);

    // Assert that the response status is 200 (OK)
    expect(response.status).toBe(200);

    // Add more assertions for the response body if needed
  });

  // Add more test cases for authorized and unauthorized requests
});
