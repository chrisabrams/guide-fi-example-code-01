var connect  = require('connect'),
    express  = require('express'),
    path     = __dirname,
    settings = require('./config/settings');

//Express
var server = module.exports = express.createServer();
require('./config/express')(connect, express, path, server, settings);

//Helpers
require('./lib/helpers')(server);

//Routes
require('./lib/router')(express, path, server, settings);

console.log('Running in ' + (process.env.NODE_ENV || 'development') + ' mode @ ' + settings.uri);