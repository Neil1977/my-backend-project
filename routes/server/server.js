// Import required modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { auth, requiresAuth } = require('express-openid-connect');

const app = express();

// Configuration for Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.JWT_SECRET || 'default_secret',
  baseURL: 'http://localhost', // Remove the port number here
  clientID: 'uoV8TW1fofgs6bCpDM2xOGlZSDpIPTIG',
  issuerBaseURL: 'https://dev-zel8ugr8zgj0slv2.us.auth0.com',
};

// Enable JSON body parsing and CORS
app.use(express.json());
app.use(cors());

// Add authentication middleware using express-openid-connect
app.use(auth(config));

// Home route
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Create a new SQLite database instance
const db = new sqlite3.Database('./database.sqlite');

// Register route
app.post('/register', async (req, res) => {
  // ...rest of the code
});

// Login route
app.post('/login', (req, res) => {
  // ...rest of the code
});

// Protected route
app.get('/protected', requiresAuth(), (req, res) => {
  // ...rest of the code
});

// ...
// Initialize the database and start the servers
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');

  const server1 = app.listen(4000, () => {
    console.log('Server 1 is running on port 4000');
  });

  const server2 = app.listen(4001, () => {
    console.log('Server 2 is running on port 4001');
  });

  // Export the server instances
  module.exports = {
    server1,
    server2,
    close: (callback) => {
      server1.close(() => {
        server2.close(callback);
      });
    },
  };
});
