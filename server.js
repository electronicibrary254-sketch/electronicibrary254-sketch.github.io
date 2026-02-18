// simple backend for handling contact form submissions
// run with `node server.js` (or `npm start` after installing deps)

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// parse form bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve static site files (index.html, css/, js/, papers/ etc)
app.use(express.static(path.join(__dirname)));

// contact form endpoint
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact submission:', { name, email, message });

  // persist message to a simple log file for later review
  const line = `${new Date().toISOString()} | ${name || 'unknown'} <${
    email || 'no-email'
  }> | ${message || ''}\n`;
  fs.appendFile('contacts.txt', line, err => {
    if (err) console.error('Failed to save contact message:', err);
  });

  // respond with JSON as the frontend expects
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Julisha Library backend running on port ${PORT}`);
});
