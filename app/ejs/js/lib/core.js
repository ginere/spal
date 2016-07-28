/**
 * This helps to build the different sites url. 
 * And some core finctionalities
 */
<%- include('../snippet/js-head.ejs', {fileName: 'core.js'}); %>

var SINGLETON={};
module.exports=SINGLETON;

/*
	"JSON_URL":"/black_json",
	SINGLETON.getJsonURL=function(url){
		return "<%= meta.JSON_URL %>"+url;
	};

	"ROOT":"",
	SINGLETON.getStaticURL=function(url){
		return "<%= meta.ROOT %>"+url;
	};

	"APPLICATION_URL":"http://pelisIPAD.com",	
	SINGLETON.getAbsoluteURL=function(staticUrl){
		return "<%= meta.APPLICATION_URL %>"+staticUrl;		
	};

	SINGLETON.getTranscoderUrl=function(server,url){
		return location.protocol+"//"+server+".pelisipad.com/transcoder"+url;
	};
*/

	
// This retuns the tomcat Url
SINGLETON.getServiceUrl=function(uri){
	return "<%= meta.TOMCAT_URL %>"+uri;
};

SINGLETON.parseInt=function(_val,defaultvalue){
	if (_val == null ) {
		return defaultvalue;
	}
	var _ret=parseInt(_val);
	
	if (isNaN(_ret)){
		return defaultvalue;
	} else {
		return _ret;
	}			
};

SINGLETON.split=function(string,separator){
	if (string==null){
		return string;
	} else {
		return string.split(separator);
	}
};


