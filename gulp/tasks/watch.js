var config = require('../config');
var gulp   = require('gulp');

gulp.task('watch', function() {
  gulp.watch(config.paths.css.watch, ['css']);
  gulp.watch(config.paths.js.watch, ['js']);
  gulp.watch(config.paths.html.watch, ['html']);
});