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
    var ret="<p> Message:"+e.message+"</p>"+
        "<pre> Stack:"+e.stack+"</pre>";
    
    if (e.parent){
        ret+="<p> parent:"+renderException(e.parent)+"</p>";
    }
    
    return ret;
}

SINGLETON.render=function(URL,e,errorUrl){
    log.log("+++ render");
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
