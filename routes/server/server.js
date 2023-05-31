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
  const { email, password } = req.body;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the 'users' table with the hashed password
  db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to register user' });
    } else {
      res.sendStatus(201);
    }
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Retrieve the user from the 'users' table based on the email
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to authenticate user' });
    } else if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // Generate a JWT token
        const token = jwt.sign({ sub: user.id }, config.secret);
        res.json({ token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
});

app.get('/protected', requiresAuth(), (req, res) => {
  // Respond with a protected resource
  res.json({ message: 'This is a protected resource' });
});

// Initialize the database and start the server
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)');

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});

module.exports = app;
