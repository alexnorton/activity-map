const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/status', (req, res) => {
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}/`);
});
