'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const del = require('del');

let location = {
  server: [
    'src/app/app.js',
    'src/app/config/**/*.js',
    'src/app/routes/**/*.js'    
  ],
  client: [
    'src/app/public/**/*.js'
  ],
  html: [
    'src/**/*.jade'
  ],
  css: [
    'src/app/public/**/*.scss'
  ],
  build: 'build'
};

let options = {
  server: { base: 'src' },
  client: { base: 'src' },
  css: { base: 'src' }
}

gulp.task('default', ['clean:app', 'build:server', 'build:client', 'build:html', 'build:css']);

gulp.task('watch', () => {
  gulp.watch(location.server, ['build:server']);
  gulp.watch(location.client, ['build:client']);
  gulp.watch(location.html, ['build:html']);
  gulp.watch(location.css, ['build:css']);
});

gulp.task('build:server', () => {
  gulp.src(location.server, options.server)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(location.build));
});

gulp.task('build:client', () => {
  gulp.src(location.client, options.client)
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest(location.build));
});

gulp.task('build:html', () => {
  gulp.src(location.html)
    .pipe(gulp.dest(location.build));
});

gulp.task('build:css', () => {
  gulp.src(location.css, options.css)
    .pipe(sass())
    .pipe(gulp.dest(location.build));
});

gulp.task('clean:app', () => {
  del([location.build]);
});
