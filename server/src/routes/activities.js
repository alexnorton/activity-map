const ensureAuthenticated = require('../helpers/ensureAuthenticated');
const strava = require('strava-v3');

module.exports = (app) => {
  app.get('/activities', ensureAuthenticated, (req, res) => {
    strava.athlete.listActivities({
      access_token: req.user.token,
    }, (error, result, limits) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json(result);
    });
  });
};
