var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var coffeescript = require('gulp-coffeescript');
var gutil = require('gulp-util');
var mustache = require("gulp-mustache");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

// Static Server + watching scss/html files
gulp.task('serve', function () {

    browserSync.init({
        server: "./"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("src/*.coffee", ['coffee']);
    gulp.watch("templates/*.mustache", ['mustache']);
    gulp.watch("settings.json", ['mustache']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("settings.json").on('change', browserSync.reload);
    
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp
        .src("scss/style.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

gulp.task('coffee', function () {
    gulp
        .src("./src/*.coffee")
        .pipe(coffeescript({
            bare: true
        }).on("error", gutil.log))
        .pipe(uglify())
        .pipe(gulp.dest("./js/"))
        .pipe(browserSync.stream());
});

gulp.task('mustache', function () {
    gulp
        .src("./templates/*.mustache")
        .pipe(mustache("settings.json", {
            extension: ".html"
        }, {}))
        .pipe(gulp.dest("./"))
        .pipe(browserSync.stream());
})
gulp.task('imagemin', () =>
    gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('img/'))
);

gulp.task('default', ['serve']);