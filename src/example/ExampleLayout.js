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
	"  <link rel='stylesheet' href='lib/bootstrap/css/bootstrap.min.css' >  "+
	"  <link rel='stylesheet' href='lib/bootstrap/css/bootstrap-theme.min.css' >  "+
    "  <body class="+SINGLETON.layoutId+">"+
    "      <div class='container'><h1>Example Layout</h1></div>"+
    "      <div id='content' class='container'></div>"+
    "<div class='container'><a href='/index.html'>Goto Index</a></div>"+
    "      <div class='container'>"+
    "          <h3>Widgets Page example1</h3>"+
    "          <div id='widgets' class='container'></div>"+
    "      </div>"+
    "  </body>"+
    "</html>";

SINGLETON.subscriveWidget("layout-widget",require('./LayoutWidget'));

module.exports=SINGLETON;
