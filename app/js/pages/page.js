/**
 * This is the abstract main pages for all the pages
 * This have some knoledge of the page structure:
 *  - The #viewport id defines where the pages are rendered
 *  - IF the #empty is present it means that the page shuld be rendered first time
 */
'use strict';
console.log("Loading file:pages/page.js ...");

// -*- javascript -*- 
// DO NOT MODIFY this files
//
/*global sessionStorage: false, console: false, alert: false, $: false,window: false,jQuery:false,document:false,location:false,debugger:false,navigator:false */


var log=require('../lib/log');
var $ = require('jquery');
var $Q = require('q');


var SINGLETON={};

// This uri will be used to select this page
SINGLETON.uri="";

// This is the page ID whould be unique and used insed the html.id. Means without "."
SINGLETON.id="";

// initialize the page stuff This is called at application startup
// This return null or one promise
SINGLETON.init=function(){		
	return null;
};

// This is call when this page is the first page called
// May be some of the html stufs has been already donwloaded
// SINGLETON.firstOpen=function(uri){		
// 	var that=(!this)?SINGLETON:this; 
// 	// detect if page-empty
// 	if ($("#empty-page").length >0) {			
// 		log.info("firstOpen detect an empty page:"+that.id);
		
// 		// first load the data
// 		return $Q((that.load)?that.load(uri):null).then(function(){
// 			// the close
// 			return SINGLETON.close(uri);
// 		}).then(function(){
// 			if (that.render) {
// 				return that.render(uri);
// 			} else {
// 				return $Q.reject(new Error("No render method for page:"+that.id));
// 			}
// 		});
// 	} else {
// 		log.info(" + NO FIRST PAGE DETECTED");
// 		return $Q.reject(new Error("NOT FIRST PAGE DETECTED:"+uri));
// 	}
// };


// Remove the first Open functionaity, uses modules instead ...
SINGLETON.firstOpen=function(uri){		
	var that=(!this)?SINGLETON:this; 

	log.info("firstOpen detect an empty page:"+that.id);
	
	// first load the data
	return $Q((that.load)?that.load(uri):null).then(function(){
		// the close
		// NOTHING TO CLOSE THIS IS THE FIRST OPEN ...
		// return SINGLETON.close(uri);
		return null;
	}).then(function(){
		if (that.render) {
			return that.render(uri);
		} else {
			return $Q.reject(new Error("No render method for page:"+that.id));
		}
	});
};

// This function load the page returns null or one promise
SINGLETON.load=function(uri){		
	var that=(!this)?SINGLETON:this; 
	
	log.info("Loaded:"+that.id);
	
	return null;
};

// This function render the page
// return null or one promise
SINGLETON.render=function(uri){		
	var that=(!this)?SINGLETON:this; 
	log.info("Open:"+that.id);
	
	return null;
};


// Close the page
// return null or one promise
SINGLETON.close=function(uri){				
	var that=(!this)?SINGLETON:this;
	// nothing to do
	log.info("Close:"+that.id);
	
	return null;
};


/**
 * Tools and utils
 */

/**
 * this look for the html content of that id and uses it as current page content
 */
SINGLETON.showTemplate=function(id){		
	var template=$(id).html();
	
	if (!template){
		throw Error("Template is empty:"+id);
	} else {
		SINGLETON.setContent(template);
	}
};



/**
 * Inside the content look for one id the s.id and use this html as the page content
 * This look for an ID as the page name and show the content into the main target
 */
SINGLETON.showPageTemplate=function(s){		
	var template=SINGLETON.loadPageTemplate(s);
	SINGLETON.setContent(template);
};

SINGLETON.setContent=function(template){		
	var target=$("#viewport");
	target.html(template);		
};

/**
 * Return a teplate, loads from the id of the object passed in parameter
 */
SINGLETON.loadPageTemplate=function(s){		
	var that=(!s)?SINGLETON:s;

	var template=$("#"+that.id).html();

	if (!template){
		throw Error("Template is empty:"+that.id);
	} else {
		return template;
	}
};


module.exports=SINGLETON;
