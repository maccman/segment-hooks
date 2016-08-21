'use strict';

/**
 * Module dependencies.
 */

var version = require('./package.json').version;
var path = require('path');

var config = {
  version: version,
  debug: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 7001,

  grant: {
    enabled: !!process.env.GOOGLE_KEY,
    server: {
      protocol: "https",
      host: process.env.GOOGLE_CALLBACK
    },
    google: {
      key: process.env.GOOGLE_KEY,
      secret: process.env.GOOGLE_SECRET,
      callback: "/sessions/create",
      custom_params: {
        hd: process.env.GOOGLE_DOMAIN,
        access_type: "online"
      },
      scope: [
        "email",
        "profile"
      ]
    }
  }
};

module.exports = config;
