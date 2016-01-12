'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

let serverFiles = [
  'src/**/*.js'
];

let htmlFiles = [
  'src/**/*.jade'
];

gulp.task('default', ['clean:app', 'build:server', 'build:html']);

gulp.task('build:server', () => {
  gulp.src(serverFiles)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build:html', () => {
  gulp.src(htmlFiles)
    .pipe(gulp.dest('build'));
});

gulp.task('clean:app', () => {
  del(['build']);
});
