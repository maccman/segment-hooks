'use strict';

/**
 * Module dependencies.
 */

require('dotenv').config({silent: true});

var middlewares = require('koa-middlewares'),
    routes = require('./routes'),
    config = require('./config'),
    path = require('path'),
    http = require('http'),
    koa = require('koa'),
    render = require('koa-ejs'),
    session = require('koa-session'),
    override = require('koamethodoverride'),
    Grant = require('grant-koa'),
    mount = require('koa-mount');

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
 * session
 */
app.keys = ['grant'];
app.use(session(app));

/**
 * oauth
 */
var grant = new Grant(require('./common/auth_config'));
app.use(mount(grant));

/**
 * auth barrier
 */
app.use(function*(next){
  if ( !/^\/hooks/.test(this.request.url) ) return yield next;
  if ( this.session.accessToken ) return yield next;

  this.redirect('/connect/google');
});

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
