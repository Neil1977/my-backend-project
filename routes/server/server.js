require('dotenv').config();
const express = require('express');
const routes = require('../routes');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const { auth, requiresAuth } = require('express-openid-connect');

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.JWT_SECRET || 'default_secret',
  baseURL: 'http://localhost:3000',
  clientID: 'uoV8TW1fofgs6bCpDM2xOGlZSDpIPTIG',
  issuerBaseURL: 'https://dev-zel8ugr8zgj0slv2.us.auth0.com',
};

app.use(express.json());
app.use(cors());

// Add authentication middleware using express-openid-connect
app.use(auth(config));

app.get('/', (req, res) => {
  // Check if the user is authenticated and send an appropriate response
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Create a new SQLite database instance
const db = new sqlite3.Database('./database.sqlite');

app.post('/register', async (req, res) => {
  // ...rest of the code
});

app.post('/login', (req, res) => {
  // ...rest of the code
});

app.get('/protected', requiresAuth(), (req, res) => {
  // ...rest of the code
});

// Initialize the database and start the server
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});

module.exports = app;

