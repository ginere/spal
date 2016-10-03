// https://admit.belgacom.be/eservices/wps/myportal/myProducts/myFon
'use strict';

var gulp = require('gulp');
var size = require('gulp-size');

module.exports = function() {
    // bootstrap
    gulp.src(['node_modules/bootstrap/dist/**/*'],{base:"node_modules/bootstrap/dist"})
    	.pipe(gulp.dest(global.vendors_dist + '/bootstrap'))    
        .pipe(size())
    ;    

//     // fontawesome
//     gulp.src(['node_modules/font-awesome/css/**/*','node_modules/font-awesome/fonts/**/*'],{base:"node_modules/font-awesome"})
//     	.pipe(gulp.dest(global.vendors_dist + '/font-awesome'))
//         .pipe(size())
//     ;    
    

    // jquery
     gulp.src(['node_modules/jquery/dist/**/*'],{base:"node_modules/jquery/dist"})
     	.pipe(gulp.dest(global.vendors_dist + '/jquery'))
        .pipe(size())
    ;    

    // mustache
     gulp.src(['node_modules/mustache/*.js'],{base:"node_modules/mustache"})
     	.pipe(gulp.dest(global.vendors_dist + '/mustache'))
        .pipe(size())
    ;    

//     // normalize.css
//      gulp.src(['node_modules/normalize.css/normalize.css'],{base:"node_modules/normalize.css"})
//      	.pipe(gulp.dest(global.vendors_dist + '/normalize.css'))
//         .pipe(size())
//     ;    

    // q
     gulp.src(['node_modules/q/q.js'],{base:"node_modules/q"})
     	.pipe(gulp.dest(global.vendors_dist + '/q'))        
        .pipe(size(""))
    ;

    
};


