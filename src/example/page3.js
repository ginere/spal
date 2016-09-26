/**
 * Page 3 a simple Page
 * 
 */
'use strict';

var log=require('../log.js');

var Layout=require('./ExampleLayout');
var SimpleLayoutPage=require('../SimpleLayoutPage');

var SINGLETON=new SimpleLayoutPage("page3","/page2.html",Layout);

SINGLETON.template=
    "    <div class='jumbotron'>"+
    "      <div class='container'>"+
    "        <h1>Page 3</h1>"+
    "        <p>This is the index.html mounted on ["+SINGLETON.uri+"].</p>"+
    "        <p><a class='btn btn-primary btn-lg' href='/index.html' role='button'>Index »</a></p>"+
    "      </div>"+
    "    </div>";


module.exports=SINGLETON;
