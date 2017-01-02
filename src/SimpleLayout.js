/**
 * This implements a render function that render the content passed to the render function.
 * Into the selector passed in th constructor of the Layout.
 */
'use strict';

var Error=require('./error');
var log=require('./log');
var $ = require('jquery');
var $Q = require('q');

var AbstractLayout=require('./AbstractLayout');

// function wait(time){
//     var deferred = Q.defer();
//     Q.when(promise, deferred.resolve);
//     delay(ms).then(function () {
//         deferred.reject(new Error("Timed out"));
//     });
//     return deferred.promise;
// }

var SINGLETON=function(layoutId,selector){

    var that=new AbstractLayout(layoutId);
    
	that.selector=selector;
	
    that.render=function(page,content){
		return that.renderIntoElement(page,selector,content);
// 		return that.renderIntoElement(page,selector,content).then(function(value) {
// 			return $Q.resolve(value);			
// 		});
    }
    
	return that;	
};


module.exports=SINGLETON;

