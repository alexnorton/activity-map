const ensureAuthenticated = require('../helpers/ensureAuthenticated');
const strava = require('../helpers/strava');

const { Activity } = require('../model');

module.exports = (app) => {
  app.get('/activities', ensureAuthenticated, async (req, res) => {
    const activities = await req.user.getActivities();

    res.json(activities);
  });

  app.get('/activities/strava', ensureAuthenticated, async (req, res) => {
    const activities = await strava(req.user, 'athlete', 'listActivities', {
      page: parseInt(req.query.page, 10) || 1,
    });

    const activityIds = activities.map(({ id }) => id);

    res.json(activityIds);
  });

  app.get('/activities/:activityId', ensureAuthenticated, async (req, res) => {
    const activityId = parseInt(req.params.activityId, 10);

    let activity = await Activity.findById(activityId);

    if (!activity) {
      const stravaActvity = await strava(req.user, 'activities', 'get', { id: activityId });

      activity = await Activity.create({
        id: stravaActvity.id, json: stravaActvity, userId: req.user.id
      });
    }

    res.json(activity);
  });
};
