/**
 * This helps to build the different sites url. 
 * And some core finctionalities
 */
console.log("Loading file:core.js ...");

// -*- javascript -*- 
// DO NOT MODIFY this files
//
/*global sessionStorage: false, console: false, alert: false, $: false,window: false,jQuery:false,document:false,location:false,debugger:false,navigator:false */


var SINGLETON={};
module.exports=SINGLETON;

/*
	"JSON_URL":"/black_json",
	SINGLETON.getJsonURL=function(url){
		return ""+url;
	};

	"ROOT":"",
	SINGLETON.getStaticURL=function(url){
		return ""+url;
	};

	"APPLICATION_URL":"http://pelisIPAD.com",	
	SINGLETON.getAbsoluteURL=function(staticUrl){
		return ""+staticUrl;		
	};

	SINGLETON.getTranscoderUrl=function(server,url){
		return location.protocol+"//"+server+".pelisipad.com/transcoder"+url;
	};
*/

	
// This retuns the tomcat Url
SINGLETON.getServiceUrl=function(uri){
	return "http://localhost:8080/video-admin2"+uri;
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


