const passport = require('passport');

const ensureAuthenticated = require('../helpers/ensureAuthenticated');
const { User } = require('../model');

module.exports = (app) => {
  app.get('/user', ensureAuthenticated, (req, res) => {
    res.send(req.user);
  });

  app.get(
    '/user/login',
    passport.authenticate('strava', { scope: ['public'] })
  );

  app.get(
    '/user/login/callback',
    passport.authenticate('strava', { failureRedirect: '/login' }),
    (req, res) => {
      User.upsert({
        id: req.user.id,
        json: req.user,
      }).then(() => {
        res.redirect('http://localhost:3000/home');
      });
    }
  );

  app.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};
