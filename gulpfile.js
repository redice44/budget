'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');

let serverFiles = [
  'src/*.js'
];

gulp.task('default', () => {
  return gulp.src(serverFiles)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build'));
});
