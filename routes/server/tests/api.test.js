const request = require('supertest');
const server = require('../../server/server');

// ...

// Test case for protected routes
describe('Protected Routes', () => {
  let authToken;

  // Set up authentication token before each test
  beforeEach((done) => {
    const user = {
      email: 'test@example.com',
      password: 'test123',
    };

    // Make a POST request to the login endpoint to get the authentication token
    request(server)
      .post('/login')
      .send(user)
      .end((err, response) => {
        if (err) {
          done(err);
        } else {
          // Store the authentication token for future use
          authToken = response.body.token;
          done();
        }
      });
  });

  // Close the server after all tests are done
  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  // Test getting a protected resource when authorized
  it('should get a protected resource when authorized', (done) => {
    // Make a GET request to the protected endpoint with the authorization token
    request(server)
      .get('/protected')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});

