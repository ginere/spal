/**
 * The error page
 * 
 */
'use strict';

var log=require('../log.js');

var SINGLETON={};

SINGLETON.id="index";
SINGLETON.uri=["","/","/index.html"];

SINGLETON.init=function(){
    log.log("+++ Init");
};

SINGLETON.load=function(){
    log.log("+++ load");
};

SINGLETON.render=function(URL,e,errorUrl){
    $("body").html(
        "    <div class='jumbotron'>"+
            "      <div class='container'>"+
            "        <h1>Index.html</h1>"+
            "        <p>This is the index.html mounted on ["+SINGLETON.uri.join(',')+"].</p>"+
            "        <p><a class='btn btn-primary btn-lg' href='page2.html' role='button'>Page 2 »</a></p>"+
            "      </div>"+
            "    </div>"
    );
};

SINGLETON.close=function(){
    log.log("+++ close");
};



module.exports=SINGLETON;
