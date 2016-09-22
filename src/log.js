/**
 * This code is used to exend the functionalities of the child pages.
 * And to have some inner shared behaviour like the key events.
 */

var error = require('./error');

var SINGLETON={};

function inner(obj,f,msg,err){
    f.bind(obj,msg);
    f.bind(obj,err);
}

SINGLETON.debug=function(msg,err){
    inner(console,console.debug,msg,err);
};

SINGLETON.info=function(msg,err){			
    inner(console,console.debug,msg,err);
};

SINGLETON.warn=function(msg,err){			
    inner(console,console.debug,msg,err);	
};

SINGLETON.error=function(msg,err){			
    inner(console,console.debug,msg,err);		
};

SINGLETON.fatal=function(msg,err){			
    inner(console,console.debug,msg,err);			
};

SINGLETON.log=function(msg,err){			
	console.info(msg,err);
};



module.exports=SINGLETON;
