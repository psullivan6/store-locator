var config = require('../config');
var del    = require('del');
var gulp   = require('gulp');

gulp.task('clean', function (callback) {
  return del(config.paths.clean, callback);
});

gulp.task('superclean', function (callback) {
  return del(config.paths.superclean, callback);
});