module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send('OK');
  });
};
