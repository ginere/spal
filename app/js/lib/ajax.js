/**
 * This handle the server comunications. The server response are parsed and the error are
 * showed to the user.
 * also transform the jquery promises into the Q ones
 */
'use strict';
console.log("Loading file:lib/ajax.js ...");

// -*- javascript -*- 
// DO NOT MODIFY this files
//
/*global sessionStorage: false, console: false, alert: false, $: false,window: false,jQuery:false,document:false,location:false,debugger:false,navigator:false */


var $ = require('jquery');
var $Q = require('q');
var core = require('./core');
var log=require('./log');

var SINGLETON={};


SINGLETON.json=function(uri,title,cache){

	var url=core.getServiceUrl(uri);

	return $Q($.ajax({
		url: url, 
		dataType: "json",
		cache : cache,
		async: true,
		type:'GET'}));
	
};

module.exports=SINGLETON;
