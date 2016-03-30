var concat     = require('gulp-concat');
var config     = require('../config');
var gulp       = require('gulp');
var utility    = require('gulp-util');
var minify_js  = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function() {
  return gulp.src(config.paths.js.source)
    .pipe(sourcemaps.init())
      .pipe(concat(config.names.js))
      .pipe(utility.env.production ? minify_js() : utility.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.js.release));
});