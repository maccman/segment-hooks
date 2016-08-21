'use strict';

/**
 * Module dependencies.
 */

require('dotenv').config({silent: true});

var middlewares = require('koa-middlewares');
var routes = require('./routes');
var config = require('./config');
var path = require('path');
var http = require('http');
var koa = require('koa');
var render = require('koa-ejs');
var override = require('koamethodoverride');

var app = koa();

/**
 * ignore favicon
 */
app.use(middlewares.favicon());

/**
 * response time header
 */
app.use(middlewares.rt());

/**
 * static file server
 */
app.use(middlewares.staticCache(path.join(__dirname, 'public'), {
  buffer: !config.debug,
  maxAge: config.debug ? 0 : 60 * 60 * 24 * 7
}));

app.use(middlewares.bodyParser());
app.use(override());

if (config.debug && process.env.NODE_ENV !== 'test') {
  app.use(middlewares.logger());
}

/**
 * router
 */
app.use(middlewares.router(app));
routes(app);

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false,
  debug: true
});

app = module.exports = http.createServer(app.callback());

if (!module.parent) {
  app.listen(config.port);
  console.log('$ open http://127.0.0.1:' + config.port);
}
