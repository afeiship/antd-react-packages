(function() {
  'use strict';

  const gulp = require('gulp');
  const fs = require('fs');

  //import
  fs.readdirSync('./build').map(function(file) {
    require('./build/' + file);
  });

  const seriesTasks = gulp.series(['clean', 'scripts:cjs', 'scripts:esm']);

  gulp.task('default', seriesTasks);
  gulp.task('watch', () => gulp.watch(['./src/lib/**'], seriesTasks));
})();
