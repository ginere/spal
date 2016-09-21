'use strict';

//var config      = require('../config');
var browserSync = require('browser-sync');
var gulp        = require('gulp');
//var url         = require('url');
//var proxy       = require('proxy-middleware');


var port=3000;
var baseDir='./demo';

module.exports = function () {
//	var proxyOpts = url.parse(config.backendUrl);
//	proxyOpts.route = '/api';

	var browserSyncConfig = {
	    port: port,
	    server: {
	        baseDir: baseDir
	        // middleware: [proxy(proxyOpts)]
	    },
	    logPrefix: 'MY_PREFIX',
	    browser: ["google chrome"],
	    minify: false,
	    notify: false,
	    open: false
	};

	browserSync(browserSyncConfig);
};

