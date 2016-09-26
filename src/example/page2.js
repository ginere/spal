/**
 * An p[age example
 * 
 */
'use strict';

var log=require('../log.js');

var SINGLETON={};

SINGLETON.id="page2";
SINGLETON.uri="/page2.html";

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
            "        <h1>Page 2</h1>"+
            "        <p>This is the index.html mounted on ["+SINGLETON.uri+"].</p>"+
            "        <p><a class='btn btn-primary btn-lg' href='/page3.html' role='button'>Index »</a></p>"+
            "      </div>"+
            "    </div>"
    );
};

SINGLETON.close=function(){
    log.log("+++ close");
};



module.exports=SINGLETON;
