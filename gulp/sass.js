gulp.task('sass', function() {
  return gulp.src(config.origin.styles)
    .pipe($.changed('sass', {extension: '.scss'}))
    .pipe($.sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(config.dest.styles))
    .pipe(browserSync.stream());
});
