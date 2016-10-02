/**
 * This is an example layout
 * 
 */
'use strict';

var log=require('../log.js');

var SimpleLayout=require('../SimpleLayout');

var SINGLETON=new SimpleLayout("example-layout","#content");

SINGLETON.layout=
    "<html>"+
    "<title>Demo spal</title>"+
    "  <body class="+SINGLETON.layoutId+">"+
    "      <h1>Example Layout</h1>"+
    "      <div id='content' class='container'></div>"+
    "      <div class='container'><a href='./index.html'>Index »</a></div>"+
    "      <div id='widgets' class='container'></div>"+
    "  </body>"+
    "</html>";



module.exports=SINGLETON;
