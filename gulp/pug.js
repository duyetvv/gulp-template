gulp.task('pug', function() {
  return gulp.src(config.origin.views)
    .pipe($.changed('pug', {extension: '.pug'}))
    .pipe($.pug({pretty: true}))
    .pipe(gulp.dest(config.dest.views))
    .pipe(browserSync.stream());
});
