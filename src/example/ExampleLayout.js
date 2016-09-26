/**
 * This is an example layout
 * 
 */
'use strict';

var log=require('../log.js');

var AbstractLayout=require('../AbstractLayout');

var SINGLETON=new AbstractLayout("example-layout");

SINGLETON.layout=
    "<html>"+
    "<title>Demo spal</title>"+
    "  <body class="+SINGLETON.id+">"+
    "  </body>"+
    "</html>";


module.exports=SINGLETON;
