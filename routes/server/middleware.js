const jwt = require("jsonwebtoken"); // Importing the jsonwebtoken library using the require function. This allows you to use the functionality provided by the library for token verification and decoding.
const express = require("express"); // Importing the Express framework.

// Other dependencies
// Add any other dependencies you may need for your middleware.

// Define the middleware function
const middleware = (req, res, next) => {
  // Extract the token from the request headers
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    // Token not found, send a 401 Unauthorized response
    return res.status(401).json({ message: "No token found" });
  }

  try {
    // Verify and decode the token using the JWT_SECRET from the environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add the decoded token to the request object for further use
    req.decodedToken = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // Token verification failed, send a 401 Unauthorized response
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = middleware; // Exporting the middleware function so that it can be used in other files that require it.