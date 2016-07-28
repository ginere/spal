'use strict';

var gulp = require('gulp');

gulp.task('clean', require('./tasks/clean'));
gulp.task('ejs-html',require("./tasks/ejs-html"));
gulp.task('ejs-js',require("./tasks/ejs-js"));

gulp.task('fonts', require('./tasks/fonts'));

gulp.task('styles', require('./tasks/styles'));

gulp.task('browserSync', require('./tasks/browserSync'));
gulp.task('watch', ['browserSync'], require('./tasks/watch'));

gulp.task('browserify', require('./tasks/browserify'));

gulp.task('jshint',require("./tasks/jshint"));

var runSequence = require('run-sequence');

gulp.task('default', ['clean'],function(cb) {

    cb = cb || function() {};

    runSequence([
		'ejs-html',
		'ejs-js',
	    'styles', 
	    'fonts', 
	    'jshint',
	    'browserify'
    ], 'watch', cb);
});
