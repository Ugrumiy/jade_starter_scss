//npm install gulp -g
//npm install gulp --save-dev
//npm install --save-dev browser-sync
//npm install gulp-less gulp-minify-css gulp-rename gulp-uglify gulp-jade --save-dev
//npm install gulp-sass gulp-minify-css gulp-rename gulp-uglify gulp-jade --save-dev

// Include gulp
var gulp = require('gulp');

// Include plugins
var uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    path = require('path'),
    browserSync = require('browser-sync');
    reload = browserSync.reload,
    //less = require('gulp-less'),
    sass = require('gulp-sass');

   // Define base folders
var src = 'src/',
    dest = 'build/';

// Concatenate & Minify JS
gulp.task('scripts', function () {
   gulp.src(src +'/js/*.js')
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(dest + '/script'))
});

//Compile and minimize less
gulp.task('less', function () {
  return gulp.src([src + 'less/*.less', '!' + src + 'less/inc/*.less'])
    .pipe(less())
  	.pipe(rename({suffix: '.min'}))
  	.pipe(minifyCss())
    .pipe(gulp.dest(dest + '/css'));
});

gulp.task('sass', function () {
  return gulp.src([src + 'scss/*.scss', '!' + src + 'scss/inc/*.scss'])
    .pipe(sass())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest(dest + '/css'));
});

//Compile Jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src([src + 'jade/**/*.jade', '!' + src + 'jade/inc/*.jade'])
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest(dest))
});

gulp.task('browser-sync', function () {
   var files = [
      src + '*.html',
      src + 'css/*.css',
      //src + 'app/assets/imgs/**/*.png',
      src + 'script/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: dest
      }
   });
});

gulp.task('default', ['less', 'jade','scripts', 'browser-sync'], function () {
    // Watch .js files
    gulp.watch(src + 'script/*.js', ['scripts']).on('change', reload);
    // Watch .jade files
    gulp.watch(src + '*.jade', ['jade']).on('change', reload);
    // Watch .less files
    gulp.watch(src + 'less/*.less', ['less']).on('change', reload);
});

