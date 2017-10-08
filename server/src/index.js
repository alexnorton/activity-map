const express = require('express');
const session = require('express-session');
const passport = require('passport');
const StravaStrategy = require('passport-strava-oauth2').Strategy;

const User = require('./model/User');

const config = require('../config.json');

const port = process.env.PORT || 3000;

const app = express();

app.use(session({
  secret: config.SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.findById(user)
    .then((result) => {
      done(null, result);
    }).catch((error) => {
      done(error);
    });
});

passport.use(
  new StravaStrategy(
    {
      clientID: config.STRAVA_CLIENT_ID,
      clientSecret: config.STRAVA_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/user/login/callback',
    },
    ((accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    })
  )
);

require('./routes/activities')(app);
require('./routes/status')(app);
require('./routes/user')(app);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}/`);
});
