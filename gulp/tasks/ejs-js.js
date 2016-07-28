'use strict';

var config = require('../config');
var meta = require(config.meta);

var gulp = require('gulp');
var gutil = require('gulp-util');
var ejs = require("gulp-ejs");
var gulpif       = require('gulp-if');


var handleErrors = require('../util/handleErrors');

function fontsGulp() {

	return gulp.src("app/ejs/js/**/*.js")
		.pipe(ejs({
			config:config,
			meta:meta,
			DEBUG:true
		})
	    .on('error', handleErrors))
		.pipe(gulp.dest("app/js/"));

}

module.exports = fontsGulp;
