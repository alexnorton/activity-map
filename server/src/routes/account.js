const ensureAuthenticated = require('../helpers/ensureAuthenticated');

module.exports = (app) => {
  app.get('/account', ensureAuthenticated, (req, res) => {
    res.json(req.user);
  });
};
