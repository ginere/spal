/**
 * This is an layout widget. This is used only for an layout
 */
'use strict';

var log=require('../log.js');

var SINGLETON={};

SINGLETON.id="layout-widget";

SINGLETON.init=function(){
    log.log("+++ Init:"+SINGLETON.id);
};


SINGLETON.layoutRendered=function(layout){
    $("#widgets").append("<p>documentReady: widgetId:"+SINGLETON.id+", layout:"+layout.layoutId+"</p>");
};


SINGLETON.pageReady=function(layout,page){
    debugger;
    $("#widgets").append("<p>pageReady: widgetId:"+SINGLETON.id+", layout:"+layout.layoutId+", pageReady:"+page.id+"</p>");
};



module.exports=SINGLETON;
