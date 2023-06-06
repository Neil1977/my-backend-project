const express = require('express');
const router = express.Router();

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
  });
});

module.exports = router;
