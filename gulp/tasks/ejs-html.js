'use strict';

var config = require('../config');
var meta = require(config.meta);

var gulp = require('gulp');
var gutil = require('gulp-util');
var ejs = require("gulp-ejs");
var gulpif       = require('gulp-if');

var browserSync  = require('browser-sync');

var handleErrors = require('../util/handleErrors');

function fontsGulp() {

	return gulp.src("app/ejs/*.html")
		.pipe(ejs({
			config:config,
			meta:meta
		}).on('error', handleErrors))
		.pipe(gulp.dest(config.dist).on('error', handleErrors))
	    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));
	
}

module.exports = fontsGulp;
