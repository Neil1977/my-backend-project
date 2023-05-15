// middleware for authenticating JWT tokens
function authenticateToken(req, res, next) {
  // retrieve the authorization header from the request
  const authHeader = req.headers["authorization"];
  // extract the token from the authorization header
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    // if there is no token provided,
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
