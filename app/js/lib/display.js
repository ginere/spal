/**
 * This handle the server comunications. The server response are parsed and the error are
 * showed to the user.
 * also transform the jquery promises into the Q ones
 */
'use strict';
console.log("Loading file:lib/display.js ...");

// -*- javascript -*- 
// DO NOT MODIFY this files
//
/*global sessionStorage: false, console: false, alert: false, $: false,window: false,jQuery:false,document:false,location:false,debugger:false,navigator:false */


var log=require('./log');
var Mustache=require('mustache');

//var Accessor=require('./accessor');
var $ = require('jquery');
var easing=require('../vendor/jquery.easing.1.3');


var SINGLETON={};


var SINGLETON={};

var partials={
//	"list-poster" : "<a data-id='{{id}}' class='list-url'><img data-id='{{id}}' class='poster-medium' alt='{{name}}'><span class='title'>{{name}}</span><span class='year'>{{year}}</span></a>",
//	"list-background-img-src": "/list/{{id}}/background_1080.jpg"
	
};


SINGLETON.encodeURIComponent=function(){
	return function (text, render) {
		var ret=render(text);
		return encodeURIComponent(ret);
		};
};


SINGLETON.help=function(){
	return function (text, render) {
		return encodeURIComponent(render(text));
	};
};



SINGLETON.partials=partials;
SINGLETON.variables={
	"encodeURIComponent":SINGLETON.encodeURIComponent
	,"help":SINGLETON.help
};
	

SINGLETON.addToVariables=function(name,variables){
	SINGLETON.variables[name]=variables;
};


SINGLETON.render=function(template,data){
	
	var object = $.extend({}, data, SINGLETON.variables);
	
	
	return Mustache.render(template, object, SINGLETON.partials);
};


// SINGLETON.template=function(){
// 	$(".tpl").each(function( index ) {
// 		// cojemos el template y aplicamos la seccion ....
// 		// tenemos funciones en los templates para genera los iconos etc ...
// 		// var target=$(this);		
//		
// 		var template=$(this).data("tpl-src");
//
// 		if ($(template).length >0){ // $(undefined) == []
// 			template=$(template).html();
// 		} else {
// 			template=$(this).html();
// 		}
//		
// 		var data= Accessor.getDefault();
// 		// http://coenraets.org/blog/2011/12/tutorial-html-templates-with-mustache-js/
//
// 		var rendered=SINGLETON.render(template,data);
//		
// 		$(this).html(rendered);
//		
// 		if (!$(this).is(":visible")){
// 			$(this).fadeIn(1000);
// 		}
// 	});
//	
// 	$('a.page-scroll').bind('click', function(event) {
// 		var $anchor = $(this);
// 		$('html, body').stop().animate({
// 			scrollTop: $($anchor.attr('href')).offset().top
// 		}, 1300, 'easeInOutExpo');  // jquery.easing -> easeInOutExpo
// 		event.preventDefault();
// 	});
// };

module.exports=SINGLETON;
