'use strict';

// https://www.npmjs.com/package/vinyl-source-stream

//var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var source       = require('vinyl-source-stream');
var sourcemaps   = require('gulp-sourcemaps');
var buffer       = require('vinyl-buffer');
//var streamify    = require('gulp-streamify');
var watchify     = require('watchify');
var browserify   = require('browserify');
//var uglify       = require('gulp-uglify');
//var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
//var ngAnnotate   = require('browserify-ngannotate');
var shim         = require('browserify-shim');
//var bundleLogger = require('../util/bundleLogger');
var brfs         = require('brfs');
//var babelify	 = require('babelify');
var notify = require('gulp-notify');

var scriptsEntryPoint='./src/example/example.js';
var dist=global.demoDist;
var scripts='/js';


var gutil        = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;

var bundleLogger={
    start: function() {
        startTime = process.hrtime();
    },
    
    end: function() {
        var taskTime = process.hrtime(startTime);
        var prettyTime = prettyHrtime(taskTime);
        gutil.log(gutil.colors.green('\'Rebundle\''), 'in', gutil.colors.magenta(prettyTime));
    }
};

var handleErrors = function(error) {
    var args = Array.prototype.slice.call(arguments);
    
    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    
    // Keep gulp from hanging on this task
    this.emit('end');    
};

function browserifyBuild(watch) {
	var entry = 'bundle.js';

	var bundler = browserify({
		entries: scriptsEntryPoint,
	    debug: true,
	    cache: {},
	    packageCache: {},
	    fullPaths: true
	}, watchify.args);

	if ( watch ) {
	    bundler = watchify(bundler);
	    bundler.on('update', function() {
	        rebundle();
	    });
	}

	var transforms = [
	    shim,
	    brfs
	];

	transforms.forEach(function(transform) {
	    bundler.transform(transform);
	});

	function rebundle() {
	    var stream = bundler.bundle();
	    // var createSourcemap = global.isProd && config.browserify.sourcemap;
	    bundleLogger.start();
	    return stream.on('error', handleErrors)
	        .pipe(source(entry))
	        .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true, debug:true}))
	        .pipe(sourcemaps.write('./'))
	        .on('end', bundleLogger.end)
	        .pipe(gulp.dest(global.demoDist+'/js'))
	        .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
	}
	return rebundle();
}

// module.exports = function() {
// 	return browserifyBuild();
// };

module.exports = {

    browserify:function() {
	    return browserifyBuild(false);
    },
    "browserify-watch":function() {
	    return browserifyBuild(true);
    }

}
