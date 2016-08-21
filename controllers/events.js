'use strict';

const Hook = require('../models/hook');

exports.process = function* () {
  var event = this.request.body;

  console.log('Processing event', event);

  var query = {type: event.type};

  if (event.event) {
    Object.assign(query, {event: event.event});
  }

  var hooks = yield Hook.findAll({where: query});

  console.log('Found hooks count', hooks.length);

  this.status = 200;

  for (var i = hooks.length - 1; i >= 0; i--) {
    try {
      yield hooks[i].process(event);
    } catch (err) {
      this.body = err + '';
      this.status = 500;
      break;
    }
  }
};
