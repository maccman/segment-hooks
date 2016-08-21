'use strict';

/**
 * Module dependencies.
 */

let Hook = require('../models/hook');

exports.list = function* () {
  let hooks = yield Hook.findAll();

  yield this.render('hooks/list', {hooks: hooks});
};

exports.add = function* () {
  let hook = yield Hook.create(this.request.body);

  this.redirect('/hooks');
};

exports.test = function* () {
  let hook = yield Hook.findById(this.params.id);

  console.log('Executing:', hook.script);

  try {
    let result = yield hook.test();
    console.log(result)
    this.body = result + '';
  } catch (err) {
    console.error(err);
    this.body = err + '';
  }

  this.status = 200;
};

exports.update = function* () {
  let hook = yield Hook.findById(this.params.id);

  yield hook.update(this.request.body);

  this.redirect('/hooks');
};

exports.destroy = function* () {
  let hook = yield Hook.findById(this.params.id);
  yield hook.destroy()
  this.redirect('/hooks');
};
