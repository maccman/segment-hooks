'use strict';

/**
 * Module dependencies.
 */

var hooks = require('./controllers/hooks');
var events = require('./controllers/events');
var sessions = require('./controllers/sessions');

module.exports = function routes(app) {
  app.get('/', function*(){
    this.redirect('/hooks');
  });
  app.get('/hooks', hooks.list);
  app.post('/hooks', hooks.add);
  app.post('/hooks/:id/test', hooks.test);
  app.put('/hooks/:id', hooks.update);
  app.del('/hooks/:id', hooks.destroy);
  app.post('/events', events.process);
  app.get('/sessions/create', sessions.create);
};
