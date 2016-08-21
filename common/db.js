'use strict';

var Sequelize = require('sequelize')

module.exports = new Sequelize(process.env.DATABASE_URL);
