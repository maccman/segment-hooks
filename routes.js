'use strict';

/**
 * Module dependencies.
 */

var hook = require('./controllers/hook');
var events = require('./controllers/events');
var sessions = require('./controllers/sessions');

module.exports = function routes(app) {
  app.get('/', function*(){
    this.redirect('/hooks');
  });
  app.get('/hooks', hook.list);
  app.get('/hooks/new', hook.new);
  app.get('/hooks/:id', hook.show);
  app.post('/hooks', hook.add);
  app.put('/hooks/:id', hook.update);
  app.del('/hooks/:id', hook.destroy);
  app.post('/events', events.process);
  app.get('/sessions/create', sessions.create);
};
