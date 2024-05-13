// route.js
const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/login', (req, res) => {
  // Send the login HTML file
  res.sendFile(path.join(__dirname, 'public', 'login', 'index.html'));
});

module.exports = router;
