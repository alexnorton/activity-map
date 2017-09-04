const express = require('express');
const session = require('express-session');
const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const strava = require('strava-v3');

const config = require('../config.json');

const port = process.env.PORT || 3000;

const app = express();

app.use(session({
  secret: 'keyboard cat',
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new StravaStrategy(
    {
      clientID: config.STRAVA_CLIENT_ID,
      clientSecret: config.STRAVA_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/strava/callback',
    },
    ((accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }),
  ),
);

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/login');
};

app.get('/', (req, res) => {
  res.json(req.user);
});

app.get('/status', (req, res) => {
  res.send('OK');
});

app.get(
  '/auth/strava',
  passport.authenticate('strava', { scope: ['public'] }),
);

app.get(
  '/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  },
);

app.get('/account', ensureAuthenticated, (req, res) => {
  res.json(req.user);
});

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

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}/`);
});
