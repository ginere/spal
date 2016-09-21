'use strict';

var gulp = require("gulp");
var jshint = require("gulp-jshint");
var notify = require('gulp-notify');

module.exports = function() {

    return gulp.src(global.sources_hint).
		pipe(jshint('.jshintrc')).
		pipe(jshint.reporter("default",{verbose:true}))
	;
};
