// authorizationMiddleware.js
// Middleware to protect routes and prevent unauthorized access

const jwt = require('jsonwebtoken');

// Middleware function to authenticate and authorize the request
function authenticateToken(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token to the request object
    req.user = decodedToken;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = {
  authenticateToken,
};
