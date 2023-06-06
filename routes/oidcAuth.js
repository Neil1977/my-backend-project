const express = require('express');
const jwt = require('jsonwebtoken');
const { auth } = require('express-openid-connect');
const router = express.Router();

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:4002',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

// Route handler for /login
router.get('/login', (req, res) => {
  req.oidc.login({ returnTo: 'http://localhost:4002/dashboard' });
});

// Route handler for /logout
router.get('/logout', (req, res) => {
  req.oidc.logout({ returnTo: 'http://localhost:4002/' });
});

// Route handler for /callback
router.get('/callback', (req, res) => {
  req.oidc.callback({
    afterCallback: 'http://localhost:4002/dashboard',
    failureRedirect: 'http://localhost:4002/login',
    async afterCallback(req, res) {
      try {
        // Generate JWT token using Auth0
        const token = await jwt.sign(
          { sub: req.oidc.user.sub },
          process.env.JWT_SECRET || 'default_secret'
        );
        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true });
        res.redirect('http://localhost:4002/dashboard');
      } catch (error) {
        console.error('Error generating JWT token:', error);
        res.redirect('http://localhost:4002/login');
      }
    },
  });
});

module.exports = router;
