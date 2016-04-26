var config  = require('../config');
var express = require('express');
var gulp    = require('gulp');
var utility = require('gulp-util');
require('colors');

var PORT = '8000';

gulp.task('server', function(callback){
  var app = express();
  var ENVIRONMENT = (utility.env.production) ? config.paths.release : config.paths.source;

  app.use('/', express.static(ENVIRONMENT));
  app.use('/images', express.static(ENVIRONMENT));

  app.listen(PORT);
  console.log('Repo live on', 'PORT'.brightYellow, PORT.brightYellow);

  return callback();
});