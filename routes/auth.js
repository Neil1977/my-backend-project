// Import the Express framework
const express = require("express");

// Import the jsonwebtoken library
const jwt = require("jsonwebtoken");

// Create a new instance of the Express router
const router = express.Router();

// Route handler for /login
router.get("/login", (req, res) => {
  req.oidc.login({ returnTo: "/dashboard" });
  // Redirect the user to the Auth0 login page
});

// Route handler for /logout
router.get("/logout", (req, res) => {
  req.oidc.logout({ returnTo: "/" });
  // Clear the user session and redirect to the home page
});

// Route handler for /callback
router.get("/callback", (req, res) => {
  // Complete the authentication flow and retrieve user information
  req.oidc.callback({
    afterCallback: "/dashboard", // Redirecting to the specified page after successful callback
    failureRedirect: "/login", // Redirecting to the specified page in case of authentication failure
    successCallback: async (req, res) => {
      // Generate a JWT token using Auth0
      const token = jwt.sign(
        { sub: req.oidc.user.sub }, // Include the user's sub (subject) identifier in the token
        process.env.JWT_SECRET, // Use the JWT_SECRET from the environment variables
        { expiresIn: "1h" } // Set the token expiration time
      );

      // Store the JWT token in a secure HTTP-only cookie
      res.cookie("token", token, { httpOnly: true });

      // Redirect to the specified page after successful callback
      res.redirect("/dashboard");
    },
  });
});

// Export the router
module.exports = router;
