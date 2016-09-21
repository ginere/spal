/**
 * The error page
 * 
 */
'use strict';

var SINGLETON={};

SINGLETON.id="error";
SINGLETON.uri=["error","error.html"];

SINGLETON.init=function(){
    console.log("+++ Init");
};

SINGLETON.load=function(){
    console.log("+++ load");
};

SINGLETON.render=function(){
    console.log("+++ render");
};

SINGLETON.close=function(){
    console.log("+++ close");
};



module.exports=SINGLETON;
