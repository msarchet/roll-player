'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const webpack = require('gulp-webpack');
const jade = require('gulp-jade');

let webpackTask = (config) => {
  return gulp.src('./src/website/js/main.js')
    .pipe(webpack(config))
    .pipe(gulp.dest('./build/website'));
};

gulp.task('webpack', () => webpackTask(require('./webpack.config.js')));
gulp.task('webpack-production', () => {
  let wp = require('webpack');
  var config = Object.create(require('./webpack.config.js'));
  config.devtool = '';
  config.plugins = config.plugins.concat([
    new wp.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new wp.optimize.DedupePlugin(),
  ]);
  webpackTask(config);
});

let jadeTask = () => {
  return gulp.src('./src/website/html/**/*.jade')
    .pipe(jade({}))
    .pipe(gulp.dest('./build/website/html'));
}
gulp.task('jade', jadeTask);

gulp.task('watch', () => {
  watch(['./src/website/js/**/*.js', './src/website/css/**/*.css'], () =>  webpackTask(require('./webpack.config.js')));
  watch('./src/website/html/**/*.jade', jadeTask);
})
