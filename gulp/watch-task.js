'use strict';

var gulp = require('gulp');

function watchGulp() {

	// the hint
	gulp.watch(global.dist_js_sources,    
			   ['scripts']);
	
	gulp.watch([global.src+"/spa.js"],    
			   ['copy-demo-js']);
	

    
	gulp.watch([global.src+"/example/index.html"]
			   ['copy-demo-html']);
	
}

module.exports = watchGulp;
