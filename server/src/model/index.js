const Sequelize = require('sequelize');

const config = require('../../config');

const sequelize = new Sequelize(config.DATABASE_URI, {
  operatorsAliases: false,
});

const Activity = sequelize.define('activity', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  json: {
    type: Sequelize.JSONB
  },
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  json: {
    type: Sequelize.JSONB,
  },
});

User.activities = User.hasMany(Activity);
Activity.user = Activity.belongsTo(User);

module.exports = {
  Activity,
  User,
};
