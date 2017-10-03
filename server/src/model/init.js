const Sequelize = require('sequelize');

const config = require('../../config');

const sequelize = new Sequelize(config.DATABASE_URI);

module.exports = sequelize;
