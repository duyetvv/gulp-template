var $           = require('gulp-load-plugins')();
var del         = require('del');
var gulp        = require('gulp');
var seqence     = require('run-sequence');
var browserSync = require('browser-sync');


var config = {
  root: 'app',
  origin: {
    assets: 'app/assets',
    js    : ['app/js/**/*.js', 'app/js/*.js', '!app/js/_lib/*.js'],
    jsLib : ['app/js/_lib/*.js'],
    styles: ['app/styles/*.scss'],
    views : [
      'app/views/*.pug',
      'app/views/**/*.pug',
      '!app/views/_core/**/*.pug'
    ]
  },
  dest: {
    views: 'public',
    styles: 'public/styles',
    js: 'public/js'
  },
  watching: {
    js: ['app/js/**/*.js', 'app/js/*.js'],
    styles:  ['app/styles/*.scss', 'app/styles/**/*.scss'],
    views: ['app/views/*.pug', 'app/views/**/*.pug']
  }
}
