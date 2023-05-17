// Import dependencies
const express = require("express");
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
      try {
        // Generate a JWT token using Auth0
        const token = jwt.sign(
          { sub: req.oidc.user.sub }, // Include the user's sub (subject) identifier in the token
          "fcc5709a62306ca14fac1dfc7ca83884ec29317febd2a427810415a9235e60b8",
          { expiresIn: "1h" } // Set the token expiration time
        );

        // Store the JWT token in a secure HTTP-only cookie
        res.cookie("token", token, { httpOnly: true });

        // Redirect to the specified page after successful callback
        res.redirect("/dashboard");
      } catch (error) {
        console.error("Error generating JWT token:", error);
        // Handle the error
        res.status(500).send("Error generating JWT token");
      }
    },
  });
});

// Export the router
module.exports = router;
