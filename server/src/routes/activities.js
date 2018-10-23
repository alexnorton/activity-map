const Sequelize = require('sequelize');

const ensureAuthenticated = require('../helpers/ensureAuthenticated');
const strava = require('../helpers/strava');

const { Activity } = require('../model');

module.exports = (app) => {
  app.get('/activities', ensureAuthenticated, async (req, res) => {
    const activities = await req.user.getActivities({
      attributes: [
        [Sequelize.literal("json->>'id'"), 'id'],
        [Sequelize.literal("json->>'type'"), 'type'],
        [Sequelize.literal("json->>'name'"), 'name'],
        [Sequelize.literal("json->>'start_date'"), 'start_date'],
        [Sequelize.literal("json->'map'->>'polyline'"), 'polyline']
      ]
    });

    res.json(activities);
  });

  app.get('/activities/strava', ensureAuthenticated, async (req, res) => {
    const activities = await strava(req.user, 'athlete', 'listActivities', {
      page: parseInt(req.query.page, 10) || 1,
      per_page: 100
    });

    const activityIds = activities.map(({ id }) => id);

    res.json(activityIds);
  });

  app.get('/activities/:activityId', ensureAuthenticated, async (req, res) => {
    const activityId = parseInt(req.params.activityId, 10);

    const stravaActvity = await strava(req.user, 'activities', 'get', { id: activityId });

    const [activity] = await Activity.upsert(
      {
        id: stravaActvity.id,
        json: stravaActvity,
        userId: req.user.id
      },
      { returning: true }
    );

    res.json(activity);
  });
};
