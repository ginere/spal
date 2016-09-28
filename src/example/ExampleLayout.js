/**
 * This is an example layout
 * 
 */
'use strict';

var log=require('../log.js');

var SimpleLayout=require('../SimpleLayout');

var SINGLETON=new SimpleLayout("example-layout","body");

SINGLETON.layout=
    "<html>"+
    "<title>Demo spal</title>"+
    "  <body class="+SINGLETON.id+">"+
    "  </body>"+
    "</html>";



module.exports=SINGLETON;
