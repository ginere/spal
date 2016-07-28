/**
 * This is the parent page for pages that have a template and and should be renteder in a template hole
 */
'use strict';
<%- include('../snippet/js-head.ejs', {fileName: 'pages/page.js'}); %>

var log=require('../lib/log');
var $ = require('jquery');
var $Q = require('q');


var SINGLETON={};

SINGLETON.uri=undefined;

// This is the page ID whould be unique and used insed the html.id. Means without "."
SINGLETON.id=undefined;

// initialize the page stuff This is called at application startup
// This return null or one promise
SINGLETON.init=undefined;


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
