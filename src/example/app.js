/**
 * SAPL demo
 */
'use strict';

var spa=require('../spa');

spa.setNatigationAlert(true);
//spa.setApplicationRoot("");

var errorPage=require('./errorPage');
spa.subscrivePage("error",errorPage);

spa.subscrivePage("example1",require('./example1'));
spa.subscrivePage("page2",require('./page2'));
spa.subscrivePage("example2",require('./example2'));
spa.subscrivePage("page3",require('./page3'));

spa.subscriveWidget("widget1",require('./widget1'));



spa.start(errorPage);



