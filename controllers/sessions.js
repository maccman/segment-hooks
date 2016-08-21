'use strict';

exports.create = function* () {
  this.session.accessToken = this.query.access_token;
  this.redirect('/');
};
