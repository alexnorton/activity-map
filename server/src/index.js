const express = require('express');
const session = require('express-session');
const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;

const config = require('../config.json');

const PORT = process.env.PORT || 3000;

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
      // asynchronous verification, for effect...
      process.nextTick(() => {
        // To keep the example simple, the user's Strava profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Strava account with a user record in your database,
        // and return that user instead.
        console.log(profile);
        return done(null, profile);
      });
    }),
  ),
);

app.get('/', (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

app.get('/status', (req, res) => {
  res.send('OK');
});

app.get(
  '/auth/strava',
  passport.authenticate('strava', { scope: ['public'] }),
  (req, res) => {
    // The request will be redirected to Strava for authentication, so this
    // function will not be called.
  },
);

app.get(
  '/auth/strava/callback',
  passport.authenticate('strava', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  },
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`App started at http://localhost:${PORT}/`);
});
