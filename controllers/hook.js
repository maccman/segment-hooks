'use strict';

/**
 * Module dependencies.
 */

var Hook = require('../models/hook');

exports.list = function* () {
  var hooks = yield Hook.findAll();

  yield this.render('hooks/list', {hooks: hooks});
};

exports.show = function* () {
  var hook = yield Hook.findById(this.params.id);

  yield this.render('hooks/show', {hook: hook});
};

exports.new = function* () {
  yield this.render('hooks/new');
};

exports.add = function* () {
  var hook = yield Hook.create(this.request.body);

  this.body   = JSON.stringify(hook);
  this.status = 201;
};

exports.update = function* () {
  var hook = yield Hook.findById(this.params.id);

  yield hook.update(this.request.body);

  this.redirect('/hooks');
};

exports.destroy = function* () {
  var hook = yield Hook.findById(this.params.id);
  yield hook.destroy()
  this.redirect('/hooks');
};
