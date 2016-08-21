'use strict';

const Hook = require('../models/hook');

exports.process = function* () {
  var event = this.request.body;

  var query = {type: event.type};

  if (event.event) {
    Object.assign(query, {event: event.event});
  }

  var hooks = yield Hook.findAll({where: query});

  hooks.forEach(function* (hook){
    yield hook.process(event);
  });

  this.status = 200;
};
