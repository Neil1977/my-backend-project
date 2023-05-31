const express = require("express");
const jwt = require("jsonwebtoken");
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
    afterCallback: "/dashboard",
    failureRedirect: "/login",
    successCallback: async (req, res) => {
      try {
        // Generate a JWT token using Auth0
        const token = jwt.sign(
          { sub: req.oidc.user.sub },
          process.env.JWT_SECRET || "default_secret",
          { expiresIn: "1h" }
        );

        // Store the JWT token in a secure HTTP-only cookie
        res.cookie("token", token, { httpOnly: true });

        // Redirect to the specified page after successful callback
        res.redirect("/dashboard");
      } catch (error) {
        console.error("Error generating JWT token:", error);
        res.status(500).send("Error generating JWT token");
      }
    },
  });
});

module.exports = router;
