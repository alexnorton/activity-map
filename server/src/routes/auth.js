const passport = require('passport');

const User = require('../model/User');

module.exports = (app) => {
  app.get(
    '/auth/strava',
    passport.authenticate('strava', { scope: ['public'] })
  );

  app.get(
    '/auth/strava/callback',
    passport.authenticate('strava', { failureRedirect: '/login' }),
    (req, res) => {
      User.upsert({
        id: req.user.id,
        json: req.user,
      }).then(() => {
        res.redirect('/account');
      });
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
