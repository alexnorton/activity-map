const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/strava',
    passport.authenticate('strava', { scope: ['public'] })
  );

  app.get(
    '/auth/strava/callback',
    passport.authenticate('strava', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
