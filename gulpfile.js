'use strict';

const gulp = require('gulp');
const webpack = require('gulp-webpack');
const jade = require('gulp-jade');

gulp.task('webpack', () => {
  return gulp.src('./src/website/js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./build/website'));
});

gulp.task('jade', () => {
  return gulp.src('./src/website/html/**/*.jade')
    .pipe(jade({}))
    .pipe(gulp.dest('./build/website/html'));
});
