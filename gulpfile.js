 const  gulp= require('gulp');
 const minifyCss = require('gulp-cssmin');
 const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
 const rename = require('gulp-rename');
 const uglify = require('gulp-uglify');
 const livereload = require('gulp-livereload');
 const watch = require('gulp-watch');
 const nodemon = require('gulp-nodemon');
 const exec = require('child_process').exec
gulp.task('nodestart',  (cb) =>
  exec('nodemon app.js',  (err, stdout, stderr) =>
    cb(err)
  )
);
gulp.task('minify-css',function(){
  gulp.src(['../public/content/*.css','./public/content/**/*.css'])
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/dist/css'))
        .pipe(livereload())
});
gulp.task('minify-images',function() {
    gulp.src(['./public/Images/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('./public/dist/img'))
        .pipe(livereload())
});
gulp.task('minify-js',function(){
  gulp.src(['./public/angularapp/*.js','./public/angularapp/**/*.js'])
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest('./public/dist/js'))
  .pipe(livereload())
});
gulp.task('minify-html', function() {
    gulp.src(['./public/Views/TabularReport/*.html','./public/Views/Login/*.html','./public/Views/Home/*.html'])
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/dist/html'))
        .pipe(livereload())
});
gulp.task('minify-js',function(){
  gulp.src(['./public/Scripts/Controllers/*.js','./public/Scripts/AppScripts/**/*.js','./public/Scripts/datepicker/**/*.js','./public/Scripts/ServerScripts/**/*.js'])
  .pipe(uglify())
  .pipe(rename({suffix:'.min'}))
  .pipe(gulp.dest('./public/dist/js'))
  .pipe(livereload())
});

gulp.task('default',['minify-css','nodestart','minify-js','minify-images','minify-html'])
