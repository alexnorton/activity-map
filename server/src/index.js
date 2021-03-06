const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const StravaStrategy = require('passport-strava-oauth2').Strategy;
const PgSession = require('connect-pg-simple')(session);

const { User } = require('./model');

const config = require('../config.json');

const port = process.env.PORT || 3001;

const app = express();

app.use(morgan('dev'));

app.use(
  session({
    store: new PgSession({
      conString: config.DATABASE_URI
    }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  User.findByPk(user)
    .then((result) => {
      done(null, result);
    })
    .catch((error) => {
      done(error);
    });
});

passport.use(
  new StravaStrategy(
    {
      clientID: config.STRAVA_CLIENT_ID,
      clientSecret: config.STRAVA_CLIENT_SECRET,
      callbackURL: `http://localhost:${port}/user/login/callback`
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }
  )
);

require('./routes/activities')(app);
require('./routes/status')(app);
require('./routes/user')(app);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}/`);
});
