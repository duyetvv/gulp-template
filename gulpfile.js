var $           = require('gulp-load-plugins')();
var del         = require('del');
var gulp        = require('gulp');
var seqence     = require('run-sequence');
var requireDir  = require('require-dir');
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
    js: 'public/js',
    assets: 'public'
  },
  watching: {
    js: ['app/js/**/*.js', 'app/js/*.js'],
    styles:  ['app/styles/*.scss', 'app/styles/**/*.scss'],
    views: ['app/views/*.pug', 'app/views/**/*.pug']
  }
}

gulp.task('pug', function() {
  return gulp.src(config.origin.views)
    .pipe($.changed('pug', {extension: '.pug'}))
    .pipe($.pug({pretty: true}))
    .pipe(gulp.dest(config.dest.views))
    .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src(config.origin.styles)
    .pipe($.changed('sass', {extension: '.scss'}))
    .pipe($.sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(config.dest.styles))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src(config.origin.js)
    .pipe($.changed('js', {extension: '.js'}))
    .pipe($.concat('app.js'))
    .pipe(gulp.dest(config.dest.js))
    .pipe(browserSync.stream());
});

gulp.task('jslib', function () {
  return gulp.src(config.origin.jsLib)
    .pipe($.changed('jslib', {extension: '.js'}))
    .pipe($.concat('lib.js'))
    .pipe(gulp.dest(config.dest.js))
    .pipe(browserSync.stream());
});

gulp.task('copy', function() {
  return gulp.src(config.origin.assets)
    .pipe($.imagemin([
      $.imagemin.gifsicle({interlaced: true}),
      $.imagemin.jpegtran({progressive: true}),
      $.imagemin.optipng({optimizationLevel: 5}),
      $.imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest(config.dest.assets));
});

gulp.task('setVariables', function() {
  global.isMin = true;
});

gulp.task('clean', del.bind(null, ['public']));

gulp.task('serve', ['pug', 'sass', 'jslib', 'js', 'copy']);

gulp.task('default', ['serve'], function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });

  gulp.watch(config.watching.views, ['pug']);
  gulp.watch(config.watching.styles, ['sass']);
  gulp.watch(config.watching.js, ['js']);
});

gulp.task('build', function() {
  seqence('setVariables', 'clean', 'serve');
});
