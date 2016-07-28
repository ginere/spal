/**
 * This is the error page
 */
'use strict';
console.log("Loading file:pages/login.js ...");

// -*- javascript -*- 
// DO NOT MODIFY this files
//
/*global sessionStorage: false, console: false, alert: false, $: false,window: false,jQuery:false,document:false,location:false,debugger:false,navigator:false */


var $ = require('jquery');
var Page=require('../pages/page');
var Display=require('../lib/display');

// Effects

var SINGLETON={};

SINGLETON.uri=["","index.html"];
SINGLETON.id="page-index";
	
// not init needed
SINGLETON.init=null;

SINGLETON.firstOpen=Page.firstOpen;

// not load needed
SINGLETON.load=null;

SINGLETON.render=function(uri){		
	Page.showPageTemplate(SINGLETON);
	
	
	/* Effects */
	// Effects.ready();

	alert("Index page");
};

SINGLETON.close=Page.close;

module.exports=SINGLETON;
