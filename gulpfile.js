'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const browserify = require('browserify');

let serverFiles = [
  'src/app/app.js',
  'src/app/config/**/*.js',
  'src/app/routes/**/*.js'
];

let serverOptions = { base: 'src'};

let clientFiles = [
  'src/app/public/**/*.js'
];

let clientOptions = { base: 'src'};

let htmlFiles = [
  'src/**/*.jade'
];

gulp.task('default', ['clean:app', 'build:server', 'build:client', 'build:html']);

gulp.task('watch', () => {
  gulp.watch(clientFiles, ['build:client']);
});

gulp.task('build:server', () => {
  gulp.src(serverFiles, serverOptions)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build:client', () => {
  gulp.src(clientFiles, clientOptions)
    .pipe(babel({
      presets: ['es2015', 'react']
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
