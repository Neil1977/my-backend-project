// Import required modules
const express = require("express"); // framework to build the RESTful API
const cors = require("cors"); // allows cross-origin requests
const bcrypt = require("bcrypt"); // for password hashing
const jwt = require("jsonwebtoken"); // for user authentication
const sqlite3 = require("sqlite3").verbose(); // SQLite database library
require("dotenv").config(); // read .env file variables

// initialize the Express app
const app = express();

// middleware
app.use(express.json()); // parse incoming JSON payloads
app.use(cors()); // enable cross-origin resource sharing

// create a connection to the database
const db = new sqlite3.Database("./database.sqlite");

// endpoint for user registration
app.post("/register", async (req, res) => {
  // retrieve the email and password from the request body
  const { email, password } = req.body;

  // hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert the new user into the database
  db.run(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err) => {
      if (err) {
        // if there was an error inserting the user into the database,
        // send a 500 response with a generic error message
        return res.status(500).send("An error occurred");
      }

      // if the user was successfully inserted into the database,
      // send a 201 response with a success message
      res.status(201).send("User created");
    }
  );
});

// endpoint for user authentication
app.post("/login", async (req, res) => {
  // retrieve the email and password from the request body
  const { email, password } = req.body;

  // retrieve the user from the database based on the email
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
    if (err) {
      // if there was an error retrieving the user from the database,
      // send a 500 response with a generic error message
      return res.status(500).send("An error occurred");
    }

    if (!row) {
      // if the user does not exist in the database,
      // send a 401 response with an authentication error message
      return res.status(401).send("Email or password is incorrect");
    }

    // compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, row.password);

    if (!passwordMatch) {
      // if the provided password does not match the hashed password in the database,
      // send a 401 response with an authentication error message
      return res.status(401).send("Email or password is incorrect");
    }

    // create a JWT token with the user ID and email as the payload
    const token = jwt.sign(
      { id: row.id, email: row.email },
      process.env.JWT_SECRET
    );

    // send a 200 response with the JWT token as the payload
    res.status(200).send({ token });
  });
});

// middleware for authenticating JWT tokens
function authenticateToken(req, res, next) {
  // retrieve the authorization header from the request
  const authHeader = req.headers["authorization"];
  // extract the token from the authorization header
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    // if there is no token provided
    // send a 401 response with an authentication error message
    return res.status(401).send("No token provided");
  }

  // verify the JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // if the token verification fails,
      // send a 403 response with an error message
      return res.status(403).send("Invalid token");
    }

    // if the token is valid,
    // store the authenticated user in the request object and move to the next middleware
    req.user = user;
    next();
  });
}

// protected route example
app.get("/protected", authenticateToken, (req, res) => {
  // access the authenticated user from req.user
  const { id, email } = req.user;

  // respond with a protected message
  res.send(`Protected route accessed by user ${email}`);
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
