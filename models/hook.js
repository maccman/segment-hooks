'use strict';

const db = require('../common/db');
const Sequelize = require('sequelize');
const eventEval = require('../common/eval');
const testEvent = require('../test/fixtures/event');

let Hook = db.define('hooks', {
  name:   Sequelize.STRING,
  type:   Sequelize.STRING,
  event:  Sequelize.STRING,
  script: Sequelize.STRING,
}, {
  underscore: true,
  underscoredAll: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',

  instanceMethods: {
    process: function* (event, next) {
      return yield eventEval(this.script, event);
    },

    test: function* (next) {
      let event = Object.assign({},
        testEvent,
        {type: this.event}
      );

      return yield this.process(event);
    }
  }
});

Hook.sync();

module.exports = Hook;
