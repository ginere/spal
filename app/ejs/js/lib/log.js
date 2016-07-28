/**
 * This code is used to exend the functionalities of the child pages.
 * And to have some inner shared behaviour like the key events.
 */

var log4javascript = require('log4javascript');

var SINGLETON={};
module.exports=SINGLETON;


//	var ret={};

//	var log = log4javascript.getDefaultLogger();
	var log = log4javascript.getLogger("main");

	var consoleAppender = new log4javascript.BrowserConsoleAppender();
//	var popUpLayout = new log4javascript.PatternLayout("%d{HH:mm:ss} %-5p - %m%n");
	var popUpLayout = new log4javascript.PatternLayout("%-5p - %m%n");
    consoleAppender.setLayout(popUpLayout);

	log.addAppender(consoleAppender);


//	var appender = new log4javascript.InPageAppender();
//	log.addAppender(appender);

/*
	ret.debug=log.debug;
	ret.info=log.info;
	ret.warn=log.warn;
	ret.error=log.error;

	ret.debug("Helloo:")
*/

	function getErrorObject(){
		try { 
			throw new Error(''); 
		} catch(err) { 
			return err;
		}
	}

	function getLineNumber(){
		var err = getErrorObject();
		var caller_line = err.stack.split("\n")[4];
		if (caller_line) {
			var index = caller_line.indexOf("at ");
			var clean = caller_line.slice(index+2, caller_line.length);
			
			return clean;
		} else {
			return err.stack;
		}
	}

	var innerInfo=log.info;
	
	var SINGLETON={
		debug:function(msg,err){			
			<% if (DEBUG) { %>			
			//var lineNumber=getLineNumber();			
			//log.debug(lineNumber+"\t-\t"+msg,err);			
			if (err) {
				log.debug(msg,err);			
			} else {
				log.debug(msg);			
			}
			<% }  %>	
		},
		log:function(msg,err){			
			<% if (DEBUG) { %>			
			//var lineNumber=getLineNumber();			
			//log.debug(lineNumber+"\t-\t"+msg,err);			
			log.debug(msg,err);			
			<% }  %>	
		}
		,info:function(msg,err){			
			<% if (DEBUG) { %>			
			var lineNumber=getLineNumber();			
			if (err) {
				log.info(lineNumber+"\t-\t"+msg,err);			
				console.info(err);			
			} else {
				log.info(lineNumber+"\t-\t"+msg);			
			}
			// log.info(msg,err);		
			<% }  %>	
		}
		,warn:function(msg,err){			
			<% if (DEBUG) { %>			
			var lineNumber=getLineNumber();			
			log.warn(lineNumber+"\t-\t"+msg,err);			
			<% }  %>	
		}
		,error:function(msg,err){			
			<% if (DEBUG) { %>			
			var lineNumber=getLineNumber();			
			log.error(lineNumber+"\t-\t"+msg,err);			
			console.error(err);			
			<% }  %>	
		}
		,fatal:function(msg,err){			
			<% if (DEBUG) { %>			
			var lineNumber=getLineNumber();			
			log.fatal(lineNumber+"\t-\t"+msg,err);			
			console.error(err);			
			<% }  %>	
		}
	};


module.exports=SINGLETON;
