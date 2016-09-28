'use strict';

var gulp = require('gulp');

var jshint = require("gulp-jshint");
var notify = require('gulp-notify');

var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var rename=require('gulp-rename');
                     
var gulp   = require('gulp');
var del    = require('del');

// global.sources_hint=["*.js",
// 					 "gulp/**/*.js",
// 					 "src/**/*.js",
// 					];

global.dist_js_sources=["src/*.js"
					   ];
global.src="src";
global.dist="dist";
global.demoDist="./demo";
global.bower="./bower_components";


gulp.task('jshint-dev', function () {
    return gulp.src(["*.js",
					 "gulp/**/*.js"])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter("default",{verbose:true}))
        .pipe(size())
	;
});

gulp.task('clean',['jshint-dev'], function (cb) {
	return del([global.dist,global.demoDist], cb);
});


// gulp.task('jshint',require("./jshint-task"));
// gulp.task('clean', require('./clean-task'));
gulp.task('watch',['jshint-dev'], require('./watch-task'));

var browserify=require('./browserify-task');
gulp.task('browserify',['jshint-dev'], browserify.browserify);
gulp.task('browserify-watch',['jshint-dev'], browserify["browserify-watch"]);

gulp.task('browsersync',['jshint-dev'], require('./browsersync-task'));



gulp.task('jshint', function () {
    return gulp.src(["src/**/*.js"])
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter("default",{verbose:true}))
        .pipe(size())
	;
});


gulp.task('copy', function () {
    // copy the originals
    return gulp.src([global.src+"/*.js"])
        .pipe(gulp.dest(global.dist))
        .pipe(size())
    ;
});

gulp.task('copy-demo-html',function () {
    // copy the originals
    return gulp.src([global.src+"/example/*.html"])
        .pipe(gulp.dest(global.demoDist))
        .pipe(size())
    ;
});

gulp.task('copy-demo-js',function () {
    return gulp.src([global.dist+"/spa.js"])
        .pipe(gulp.dest(global.demoDist+'/js'))
        .pipe(size())
    
    ;
});

gulp.task('copy-demo-bower',function () {
    return gulp.src([global.bower+'/**'])
        .pipe(gulp.dest(global.demoDist+'/lib'))
        .pipe(size())
    
    ;
});

gulp.task('min', function () {
    // minimize
    return gulp.src(global.src+"/*.js")
		.pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(global.dist))
        .pipe(size())
    ;    
});


// By default ched the boiler plate js
gulp.task('default', ['jshint-dev']);

gulp.task('scripts', ['min','copy']);



//gulp.task('w', ['watch']);

gulp.task('dist',['clean','jshint'],function(cb) {
    
    cb = cb || function() {};
    
    runSequence([
		'scripts'
    ],cb);
    
    
});

gulp.task('demo',['dist'],function(cb) {

    cb = cb || function() {};
    
    runSequence([
        'copy-demo-html',
        'copy-demo-js',
        'copy-demo-bower',
        'browserify'
    ],cb);
    
});

gulp.task('w',['demo','browsersync'],function(cb) {

    cb = cb || function() {};
    
    runSequence([
        'browserify-watch',
        'watch'
    ],cb);
    
});
