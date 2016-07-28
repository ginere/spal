/**
 * The application entry point
 * 
 */
'use strict';
<%- include('./snippet/js-head.ejs', {fileName: 'app.js'}); %>

var log=require('./lib/log.js');
var spa=require('./lib/spa.js');


log.info("# Subscriving pages:");

var errorPage=require('./pages/errorPage.js');

spa.subscrivePage("error",errorPage);

var indexPage=require('./pages/indexPage.js');
spa.subscrivePage("index",indexPage);

spa.subscrivePage("login",require('./pages/loginPage.js'));

spa.start(errorPage);
