const ensureAuthenticated = require('../helpers/ensureAuthenticated');

module.exports = (app) => {
  app.get('/account', ensureAuthenticated, (req, res) => {
    res.send(req.user);
  });
};
