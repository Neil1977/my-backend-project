const request = require('supertest');
const { server, close } = require('../server/server');

describe('Authentication', () => {
  beforeAll(() => {
    jest.setTimeout(10000);
  });

  afterAll((done) => {
    close(() => {
      done();
    });
  });

  it('should authenticate a user and return a JWT token', (done) => {
    const user = {
      email: 'test@example.com',
      password: 'test123',
    };

    request(server)
      .post('/login')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, response) => {
        if (err) {
          done(err);
        } else {
          expect(response.body).toHaveProperty('token');
          done();
        }
      });
  });
});

describe('Protected Routes', () => {
  let authToken;

  beforeEach((done) => {
    const user = {
      email: 'test@example.com',
      password: 'test123',
    };

    request(server)
      .post('/login')
      .send(user)
      .end((err, response) => {
        if (err) {
          done(err);
        } else {
          authToken = response.body.token;
          done();
        }
      });
  });

  afterAll((done) => {
    close(() => {
      done();
    });
  });

  it('should get a protected resource when authorized', (done) => {
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
