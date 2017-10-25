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
