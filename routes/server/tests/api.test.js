// Import the 'supertest' library to make HTTP requests
const request = require('supertest');
const app = require('../../server');


describe('Authentication', () => {
  it('should authenticate a user and return a JWT token', (done) => {
    // Mock a user object with necessary details
    const user = {
      email: 'test@example.com',
      password: 'test123',
    };

    // Send a POST request to the login endpoint
    request(app)
      .post('/login')
      .send(user)
      .expect(200)
      .end((err, response) => {
        if (err) return done(err); // Pass the error to 'done'
        expect(response.body).toHaveProperty('token');
        done(); // Call 'done' to indicate that the test is complete
      });
  });

  // Add more test cases for authentication if needed
});

describe('Protected Routes', () => {
  let authToken;

  beforeEach((done) => {
    // Mock an authenticated user and get the JWT token
    request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'test123' })
      .end((err, response) => {
        if (err) return done(err); // Pass the error to 'done'
        authToken = response.body.token;
        done(); // Call 'done' to indicate that the setup is complete
      });
  });

  it('should get a protected resource when authorized', (done) => {
    // Send a GET request to a protected route with the JWT token
    request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, response) => {
        if (err) return done(err); // Pass the error to 'done'
        // Add more assertions for the response body if needed
        done(); // Call 'done' to indicate that the test is complete
      });
  });

  // Add more test cases for authorized and unauthorized requests
});

module.exports = app;
