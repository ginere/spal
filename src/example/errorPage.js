/**
 * The error page
 * 
 */
'use strict';

var log=require('../log.js');

var SINGLETON={};

SINGLETON.id="error";
SINGLETON.uri=["error","error.html"];

SINGLETON.init=function(){
    log.log("+++ Init");
};

SINGLETON.load=function(){
    log.log("+++ load");
};

function renderException(e){
    var ret="<pre> Message:"+e.message+"</pre>"+
        "<pre> Stack:"+e.stack+"</pre>";

    if (e.parent){
        ret+="<pre> parent:"+renderException(e.parent)+"</pre>";
    }
    
    return ret;
}

SINGLETON.render=function(URL,e,errorUrl){
    $("body").html(
        "<p> URL:"+URL+"</p>"+
            "<p> Exception:"+renderException(e)+"</p>"+
            "<p> errorUrl:"+errorUrl+"</p>"
    );
};

SINGLETON.close=function(){
    log.log("+++ close");
};



module.exports=SINGLETON;
