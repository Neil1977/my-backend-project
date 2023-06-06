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
  baseURL: 'http://localhost:4000', // Change the port number to 4000
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
// Initialize the database and start the server
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');

  const port = process.argv[2] || 4000;
  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
  // Export the server instance instead of the app
  module.exports = {
    server, // Change 'app' to 'server'
    close: (callback) => {
      server.close(callback);
    },
  };
});




