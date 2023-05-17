// Import dependencies
const express = require("express");

// Create a new instance of the Express router
const router = express.Router();

// Route handler for /login
router.get("/login", (req, res) => {
  // Redirect the user to the Auth0 login page
  req.oidc.login({ returnTo: "/dashboard" });
});

// Route handler for /logout
router.get("/logout", (req, res) => {
  // Clear the user session and redirect to the home page
  req.oidc.logout({ returnTo: "/" });
});

// Route handler for /callback
router.get("/callback", (req, res) => {
  // Complete the authentication flow and retrieve user information
  req.oidc.callback({
    afterCallback: "/dashboard",
    failureRedirect: "/login",
  });
});

// Export the router
module.exports = router;
