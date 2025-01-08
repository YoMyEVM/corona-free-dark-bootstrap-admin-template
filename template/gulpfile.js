const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

// Sass task
gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Serve task using BrowserSync
gulp.task('serve', () => {
  browserSync.init({
    server: './'
  });
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Default task
gulp.task('default', gulp.series('sass', 'serve'));
