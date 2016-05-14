'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const webpack = require('gulp-webpack');
const jade = require('gulp-jade');

let webpackTask = () => {
  return gulp.src('./src/website/js/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('./build/website'));
};
gulp.task('webpack', webpackTask);

let jadeTask = () => {
  return gulp.src('./src/website/html/**/*.jade')
    .pipe(jade({}))
    .pipe(gulp.dest('./build/website/html'));
}
gulp.task('jade', jadeTask);

gulp.task('watch', () => {
  watch(['./src/website/js/**/*.js', './src/website/css/**/*.css'], webpackTask);
  watch('./src/website/html/**/*.jade', jadeTask);
})
