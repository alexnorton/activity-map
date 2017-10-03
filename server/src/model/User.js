const Sequelize = require('sequelize');

const sequelize = require('./init');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  json: {
    type: Sequelize.JSONB,
  },
});

module.exports = User;
