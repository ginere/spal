/**
 * This code is used to exend the functionalities of the child pages.
 * And to have some inner shared behaviour like the key events.
 */

var Q = require('q');

var SINGLETON={};
module.exports=SINGLETON;


/**
 * http://dailyjs.com/2014/01/30/exception-error/
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/prototype
 */
function ApplicationError(message,parent,caller) {
    // Call the constructor
	Error.call(this);
	
	if (caller) {
		Error.captureStackTrace(this, caller);
	} else {
		Error.captureStackTrace(this, arguments.callee);
	}
	this.message = message;
	this.parent = parent;
}

/**
 * http://dailyjs.com/2014/01/30/exception-error/
 */
function RedirectError(url,message,parent,caller) {  
	Error.call(this);
	
	if (caller) {
		Error.captureStackTrace(this, caller);
	} else {
		Error.captureStackTrace(this, arguments.callee);
	}
	this.redirect = url;
	this.message = message;
	this.parent = parent;
}

/**
 * http://dailyjs.com/2014/01/30/exception-error/
 */
function AjaxError(err,caller,url,title,data) {  
	Error.call(this);
	
	if (caller) {
		Error.captureStackTrace(this, caller);
	} else {
		Error.captureStackTrace(this, arguments.callee);
	}
	this.url = url;
	this.title = title;
	this.data = data;
	this.parent = err;

	this.status=err.status;
	this.statusText=err.statusText;
}



/**
 * Create a reject promise.
 * http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
 */
SINGLETON.reject=function(message,err) {
	var error;
	// if (err && err instanceof RedirectError){
	if (SINGLETON.isRedirect(err)){
		// if the parent is a redired, also this one
		error=new RedirectError(err.redirect,message,err,arguments.callee);		
	} else {
		error=new ApplicationError(message,err,arguments.callee);
	}
	return Q.reject(error);
};

SINGLETON.isRedirect=function(err) {
	if (err && err instanceof RedirectError){
		return true;
	} else {
		return false;
	}
};

SINGLETON.resolve=function(response) {
	return Q.resolve(response);
};

SINGLETON.rejectRedirect=function(url,message,err) {
	if (SINGLETON.isRedirect(err)){
		return SINGLETON.reject(message,err);
	} else {
		var error=new RedirectError(url,message,err,arguments.callee);
		
		return Q.reject(error);
	}
};

SINGLETON.rejectAjax=function(err,url,title,data) {
	var error=new AjaxError(err,arguments.callee,url,title,data);
	
	return Q.reject(error);
};

SINGLETON.error=function(message,caller,err) {
	var error;
	if (caller){
		error=new ApplicationError(message,err,caller);		
	} else {
		error=new ApplicationError(message,err,arguments.callee);
	}
	return error;
};

SINGLETON.log=function(err) {
	console.error(err.message);
	console.error(err.stack);
	if (err.parent) {
		SINGLETON.log(err.parent);
	}
};

SINGLETON.toString=function(err,index) {
	var prefix='';
	if (typeof index === 'undefined'){
		index=0;
	} else {
		for (var i=0;i<index;i++){
			prefix+='  ';
		}
	}
	
	var ret="";
	if (err.redirect){
		ret+=prefix+"Redirect:"+err.redirect+'\n';
	}
	if (err.message){
		ret+=prefix+err.message+'\n';
	}
	if (err.title){
		ret+=prefix+err.title+" URL:"+err.url+'\n';
	}
	if (err.statusText){
		ret+=prefix+"Status:"+err.statusText+'['+err.status+']\n';
	}
	if (err.stack){
		ret+=prefix+err.stack+'\n';
	}
	if (err.parent) {
		ret+=prefix+'Parent: \n';
		ret+=prefix+SINGLETON.toString(err.parent,index+1);
	}

	return ret;
};


module.exports=SINGLETON;
