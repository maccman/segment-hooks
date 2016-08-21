'use strict';

const Hook = require('../models/hook');

exports.process = function* () {
  var event = this.request.body;
  var hooks = yield Hook.findAll({where: {event: event.type}});

  hooks.forEach(function* (hook){
    yield hook.process(event);
  });

  this.status = 200;
};
