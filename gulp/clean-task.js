'use strict';

var gulp   = require('gulp');
var del    = require('del');

function clean(cb) {
	return del([global.dist], cb);
}

module.exports = clean;
