/**
 * An p[age example
 * 
 */
'use strict';

var log=require('../log.js');

var SINGLETON={};

SINGLETON.id="widget1";
SINGLETON.uri="/page2.html";

SINGLETON.init=function(){
    log.log("+++ Init:"+SINGLETON.id);
};


SINGLETON.documentReady=function(){
    $("#widgets").append("<p>documentReady: widget:"+SINGLETON.id+"</p>");
};


SINGLETON.pageReady=function(page){
    $("#widgets").append("<p>pageReady: widget:"+SINGLETON.id+", page:"+page.id+"</p>");
};



module.exports=SINGLETON;
