const User = require('../model/User');
const ensureAuthenticated = require('../helpers/ensureAuthenticated');

module.exports = (app) => {
  app.get('/account', ensureAuthenticated, (req, res) => {
    User.findCreateFind({
      where: { id: req.user.id },
      defaults: { json: req.user },
    }).then((user) => {
      res.json(user);
    });
  });
};
