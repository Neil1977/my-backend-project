const request = require('supertest');
const app = require('../server');

describe('Authentication', () => {
  it('should authenticate a user and return a JWT token', (done) => {
    const user = {
      email: 'test@example.com',
      password: 'test123',
    };

    // Send a POST request to the '/login' endpoint with the user credentials
    request(app)
      .post('/login')
      .send(user)
      .expect(200) // Expect a 200 response status code
      .expect('Content-Type', /json/) // Expect the response to have JSON content type
      .end((err, response) => {
        if (err) return done(err);
        // Expect the response body to have a 'token' property
        expect(response.body).toHaveProperty('token');
        done();
      });
  });

  // Add more test cases for authentication if needed
});

describe('Protected Routes', () => {
  let authToken;

  beforeEach((done) => {
    const user = {
      email: 'test@example.com',
      password: 'test123',
    };

    // Authenticate a user and obtain the JWT token
    request(app)
      .post('/login')
      .send(user)
      .end((err, response) => {
        if (err) return done(err);
        authToken = response.body.token;
        done();
      });
  });

  it('should get a protected resource when authorized', (done) => {
    // Send a GET request to the '/protected' endpoint with the JWT token in the 'Authorization' header
    request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200) // Expect a 200 response status code
      .expect('Content-Type', /json/) // Expect the response to have JSON content type
      .end((err, response) => {
        if (err) return done(err);
        done();
      });
  });

  // Add more test cases for authorized and unauthorized requests
});

module.exports = app;

