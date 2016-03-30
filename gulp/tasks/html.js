var config  = require('../config');
var gulp    = require('gulp');
var jade    = require('gulp-jade');
var utility = require('gulp-util');

gulp.task('html', function() {
  gulp.src(config.paths.html.source)
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.paths.html.release))
    .pipe(gulp.dest(config.paths.html.testing));
});