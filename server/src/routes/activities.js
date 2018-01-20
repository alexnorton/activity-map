const ensureAuthenticated = require('../helpers/ensureAuthenticated');
const strava = require('strava-v3');

const { Activity, User } = require('../model');

module.exports = (app) => {
  app.get('/activities', ensureAuthenticated, (req, res) => {
    req.user.getActivities()
      .then((activities) => {
        res.json(activities);
      });
  });

  app.get('/activities/strava', ensureAuthenticated, (req, res) => {
    strava.athlete.listActivities(
      {
        access_token: req.user.json.token
      },
      (error, result) => {
        if (error) {
          res.status(500).json({ error });
          return;
        }
        res.json(result);
      }
    );
  });

  app.get('/activities/:activityId', ensureAuthenticated, (req, res) => {
    const activityId = parseInt(req.params.activityId, 10);
    Activity.findById(activityId)
      .then((activity) => {
        if (!activity) {
          return new Promise((resolve, reject) => {
            strava.activities.get(
              {
                id: activityId,
                access_token: req.user.json.token
              },
              (error, result) => {
                if (error) {
                  reject(error);
                }
                resolve(result);
              }
            );
          }).then(stravaActvity =>
            Activity.create({ id: stravaActvity.id, json: stravaActvity, userId: req.user.id })
          );
        }
        return activity;
      })
      .then((activity) => {
        res.json(activity);
      });
  });
};
