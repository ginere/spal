/**
 * SAPL demo
 */
'use strict';

var spa=require('../spa');

spa.setNatigationAlert(true);
//spa.setApplicationRoot("");

var errorPage=require('./errorPage');
spa.subscrivePage("error",errorPage);

spa.subscrivePage("index",require('./index'));
spa.subscrivePage("page2",require('./page2'));
spa.subscrivePage("page3",require('./page3'));

spa.start(errorPage);



