/**
 * The application entry point
 * 
 */
'use strict';
console.log("Loading file:app.js ...");

// -*- javascript -*- 
// DO NOT MODIFY this files
//
/*global sessionStorage: false, console: false, alert: false, $: false,window: false,jQuery:false,document:false,location:false,debugger:false,navigator:false */


var log=require('./lib/log.js');
var spa=require('./lib/spa.js');


log.info("# Subscriving pages:");

var errorPage=require('./pages/errorPage.js');

spa.subscrivePage("error",errorPage);

var indexPage=require('./pages/indexPage.js');
spa.subscrivePage("index",indexPage);

spa.subscrivePage("login",require('./pages/loginPage.js'));

spa.start(errorPage);
