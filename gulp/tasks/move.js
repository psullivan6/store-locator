var config       = require('../config');
var gulp         = require('gulp');
var merge        = require('merge-stream');

gulp.task('move', function(){
  var tasks = config.paths.move.map(function(options){
    return gulp.src(options.source)
      .pipe(gulp.dest(options.release));
  });

  return merge(tasks);
});