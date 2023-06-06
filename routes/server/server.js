const express = require('express');
const router = express.Router();

// Route handler for /login
router.get('/login', (req, res) => {
  req.oidc.login({ returnTo: 'http://localhost:YOUR_PORT_NUMBER/dashboard' }); // Replace YOUR_PORT_NUMBER with your desired port number
});

// Route handler for /logout
router.get('/logout', (req, res) => {
  req.oidc.logout({ returnTo: 'http://localhost:YOUR_PORT_NUMBER/' }); // Replace YOUR_PORT_NUMBER with your desired port number
});

// Route handler for /callback
router.get('/callback', (req, res) => {
  req.oidc.callback({
    afterCallback: 'http://localhost:YOUR_PORT_NUMBER/dashboard', // Replace YOUR_PORT_NUMBER with your desired port number
    failureRedirect: 'http://localhost:YOUR_PORT_NUMBER/login', // Replace YOUR_PORT_NUMBER with your desired port number
  });
});

module.exports = router;
