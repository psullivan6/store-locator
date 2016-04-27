var config  = require('../config');
var gulp    = require('gulp');
var pug     = require('gulp-pug');
var utility = require('gulp-util');

gulp.task('html', function() {
  gulp.src(config.paths.html.source)
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(config.paths.html.release))
    .pipe(gulp.dest(config.paths.html.testing));
});