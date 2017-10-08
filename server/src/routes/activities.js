const ensureAuthenticated = require('../helpers/ensureAuthenticated');
const strava = require('strava-v3');

module.exports = (app) => {
  app.get('/activities', ensureAuthenticated, (req, res) => {
    strava.athlete.listActivities({
      access_token: req.user.json.token,
    }, (error, result, limits) => {
      if (error) {
        res.status(500).json({ error });
        return;
      }
      res.json(result);
    });
  });
};
