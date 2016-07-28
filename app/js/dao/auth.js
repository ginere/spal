/**
 * This handle the server comunications. The server response are parsed and the error are
 * showed to the user.
 * also transform the jquery promises into the Q ones
 */
'use strict';
console.log("Loading file:dao/auth.js ...");

// -*- javascript -*- 
// DO NOT MODIFY this files
//
/*global sessionStorage: false, console: false, alert: false, $: false,window: false,jQuery:false,document:false,location:false,debugger:false,navigator:false */


var $ = require('jquery');
var $Q = require('q');
var core = require('../lib/core');
var log=require('../lib/log');
var ajax=require('./ajax');

var SINGLETON={};

// The promise retuns the user Id if the user is logged
SINGLETON.isUserLogged=function(){

	return $Q($.ajax({
		url: core.getServiceUrl('/services/video/prod/auth/isUserLogged'),
		xhrFields: {
			withCredentials: true
		},
		dataType: "json",
		cache:false,
		crossDomain:true}));
	
};


SINGLETON.logout=function(userId,password){
	return  $Q($.ajax({
		url: core.getServiceUrl('/services/video/admin/auth/logout'),
		xhrFields: {
			withCredentials: true
		},
		dataType: "json",
		cache:false,
		crossDomain:true
	}));	
};


SINGLETON.login=function(userId,password){
	return $Q($.ajax({
		url: core.getServiceUrl('/services/video/admin/auth/login'),
		data:{
			id:userId,
			password:password
		},
		xhrFields: {
			withCredentials: true
		},
		dataType: "json",
		cache:false,
		crossDomain:true
	}));	
};

SINGLETON.createAccount=function(userId,password,email){
	return ajax.json("/s/auth/c",
					 "Create Account",
					 {
						 userId:userId,
						 password:password,
						 email:email
					 });
};


module.exports=SINGLETON;
