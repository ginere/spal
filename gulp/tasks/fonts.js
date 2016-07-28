'use strict';

var config = require('../config');
var gulp = require('gulp');

function fontsGulp() {

	// images
	gulp.src(['node_modules/gentelella/production/images/*'])
	    .pipe(gulp.dest(config.dist + '/images'));

	// images
	gulp.src(['app/images/*'])
	    .pipe(gulp.dest(config.dist + '/images'));

    // Font
	return gulp.src(['node_modules/gentelella/vendors/font-awesome/fonts/*','node_modules/gentelella/vendors/bootstrap/fonts/*'])
	    .pipe(gulp.dest(config.dist + '/fonts'));
}

module.exports = fontsGulp;
