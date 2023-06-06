// authorizationMiddleware.js
// Middleware to protect routes and prevent unauthorized access

const jwt = require('jsonwebtoken');

// Middleware function to authenticate and authorize the request
function authenticateToken(req, res, next) {
  // Get the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    // Token not found, send a 401 Unauthorized response
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token using the JWT_SECRET from the environment variables
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token to the request object for further use
    req.user = decodedToken;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // Token verification failed, send a 401 Unauthorized response
    return res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = {
  authenticateToken,
};

