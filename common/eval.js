let request = require('co-request');
let sendMail = require('./mailer').sendMail;

module.exports = function* (source, event) {
  return eval(source);
};
