/**
 * SAPL demo
 */
'use strict';

var spa=SPA;
//var spa=require('spa');

spa.setNatigationAlert(true);
//spa.setApplicationRoot("");

var errorPage=require('./errorPage');
spa.subscrivePage("error",errorPage);

spa.start(errorPage);



