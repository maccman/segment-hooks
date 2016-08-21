let request = require('co-request');
let mailer  = require('./mailer');

module.exports = function* (source, event) {
  return eval(source);
};
