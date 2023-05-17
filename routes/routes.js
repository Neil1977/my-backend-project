const express = require("express");
const router = express.Router();
const middleware = require("../path/to/middleware.js");

// Define your routes here
router.get("/dashboard", middleware, (req, res) => {
  // Route logic goes here
});

// Export the router
module.exports = router;
