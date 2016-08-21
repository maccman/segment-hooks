var requests = require('requests');
var mailer   = require('./mailer');

module.exports = function(source, event) {
  eval(source);
};
