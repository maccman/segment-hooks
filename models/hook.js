'use strict';

const db = require('../common/db');
const Sequelize = require('sequelize');
const eventEval = require('../common/eval');

var Hook = db.define('hooks', {
  name:   Sequelize.STRING,
  event:  Sequelize.STRING,
  script: Sequelize.STRING,
}, {
  underscore: true,
  underscoredAll: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',

  instanceMethods: {
    process: function (event) {
      eventEval(this.script, event);
    }
  }
});

Hook.sync();

module.exports = Hook;
