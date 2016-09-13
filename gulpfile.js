//You should save the package.json file and whenever you need to start working you just do npm install to pull in your node modules.

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
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    //less = require('gulp-less'),
    sass = require('gulp-sass');

   // Define base folders
var src = 'src/',
    dest = 'dest/';

// Concatenate & Minify JS
gulp.task('scripts', function () {
   gulp.src(src +'/js/*.js')
      .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") })) //ловим ошибки
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(dest + '/script'))
});

//Compile and minimize less
gulp.task('less', function () {
  return gulp.src([src + 'less/*.less', '!' + src + 'less/inc/*.less'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") })) //ловим ошибки
    .pipe(less())
  	.pipe(rename({suffix: '.min'}))
  	.pipe(minifyCss())
    .pipe(gulp.dest(dest + '/css'));
});

gulp.task('sass', function () {
  return gulp.src([src + 'scss/*.scss', '!' + src + 'scss/inc/*.scss'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") })) //ловим ошибки
    .pipe(sass())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss())
    .pipe(gulp.dest(dest + '/css'));
});

//Compile Jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src([src + 'jade/**/*.jade', '!' + src + 'jade/inc/*.jade'])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error %>") })) //ловим ошибки
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

gulp.task('watch', function () {
    // Watch .js files
    gulp.watch(src + 'script/*.js', ['scripts']);
    // Watch .jade files
    gulp.watch(src + 'jade/*.jade', ['jade']);
    // Watch .less files
    gulp.watch(src + 'scss/*.scss', ['sass']);
});