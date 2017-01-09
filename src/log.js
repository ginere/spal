/**
 * Log base utilitie
 */

var error = require('./error');

var SINGLETON={};

function inner(obj,f,msg,err){
	if (!f){
		return ;
	}
    f.bind(obj)(msg);
    if (err) {
        // f.bind(obj)(err);

        if (err.stack) {
            f.bind(obj)(err.stack);
        } else if (err.message) {
            f.bind(obj)(err.message);
        } else {
            f.bind(obj)(err);            
        }

        if (err.parent){
            f.bind(obj)(" Parent:");
            inner(obj,f,msg,err.parent);
        }
    }
}

SINGLETON.debug=function(msg,err){
    inner(console,console.debug,msg,err);
};

SINGLETON.info=function(msg,err){			
    inner(console,console.info,msg,err);
};

SINGLETON.warn=function(msg,err){			
    inner(console,console.warn,msg,err);	
};

SINGLETON.error=function(msg,err){			
    inner(console,console.error,msg,err);		
};

SINGLETON.fatal=function(msg,err){			
    inner(console,console.error,msg,err);			
};

SINGLETON.log=function(msg,err){			
	console.info(msg,err);
};



module.exports=SINGLETON;
