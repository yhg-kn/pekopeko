//-------------------------------------------------------------
// Require
var gulp = require('gulp'),
// EJS
    ejs = require('gulp-ejs'),
// SASS
    sass = require('gulp-ruby-sass'),
    csscomb = require('gulp-csscomb'), // CSS プロパティ順序
    pleeease = require('gulp-pleeease'), // Bender Prefix の追加、CSS圧縮
// JS
    uglify  = require("gulp-uglify"), // JS compression
// Other
    plumber = require('gulp-plumber'); // エラーがおきても止めない

// webpack
    const webpackStream = require("webpack-stream");
    const webpack = require("webpack");
    const webpackConfig = require("./webpack.config");

//-------------------------------------------------------------
//EJS compile

// gulp.task("ejs", function() {
//     gulp.resources(
//         ["./resources/**/*.ejs",'!' + "./resources/**/_*.ejs"]
//     )
//         .pipe(ejs({}, {ext:'.html'}))
//         .pipe(gulp.dest("./public_html"))
// });


//-------------------------------------------------------------
//SCSS,SASS compile

gulp.task('sass', function() {
    return sass('./resources/assets/sass', {
        style: 'expanded',
        noCache: true
    })
        .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(plumber()) // エラーがおきても止めない
    .pipe(csscomb()) // CSS property sort
    .pipe(pleeease({
        autoprefixer: {"browsers": ["last 4 versions", 'ie 9', "Android 2.3"]}, // Bender Prefix
        minifier: true,
        mqpacker: true
    }))
    .pipe(gulp.dest('./public/css/'));
});


//-------------------------------------------------------------
//JS compile

gulp.task('webpack', function() {
    return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest("./public/js/"));
});

//-------------------------------------------------------------
// watch EJS,SASS,JS

gulp.task('watch', function() {
  // gulp.watch(['./resources/**/*.ejs'], ['ejs']);
  gulp.watch(['./resources/assets/sass/**/*.scss'], ['sass']);
  gulp.watch(['./resources/assets/js/**/*.js'],['webpack']);
});


//-------------------------------------------------------------
// watchタスクの実行

gulp.task('default', ['watch']);