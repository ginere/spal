/**
 * This is the error page
 */
'use strict';
console.log("Loading file:pages/errorPage.js ...");

// -*- javascript -*- 
// DO NOT MODIFY this files
//
/*global sessionStorage: false, console: false, alert: false, $: false,window: false,jQuery:false,document:false,location:false,debugger:false,navigator:false */


var $ = require('jquery');
var Page=require('../pages/page');
var Display=require('../lib/display');
var Layout=require('./errorLayout');

var SINGLETON={};

SINGLETON.uri="error.html";

// The template should be loaded into the /templates/layout-list.ejs
// SINGLETON.templateId="layout-error";

// The page should be loaded into the layout page
// In this case: /app/ejs/templates/layout-error.ejs
// And use this is as the template id: 
//  <script	type="text/html" id="page-error"> render.pageForTemplate("pages/error.ejs") </script>
SINGLETON.id="page-error";


// verificar 

SINGLETON.template=null;

// not init needed
SINGLETON.init=null;

SINGLETON.firstOpen=Page.firstOpen;

// not load needed
SINGLETON.load=function(uri){		
	// first load the layout
	return Layout.loadLayout(SINGLETON).then(function(){
		// then the page
		if (!SINGLETON.template) {
			SINGLETON.template=Page.loadPageTemplate(SINGLETON);
		}
		return null;		
	});
	
};

SINGLETON.render=function(uri,error,errorUrl){		

	// render the page
	var args={};
	if (error) {
		args={name:error.name,
			  message:error.message,
			  stack:error.stack,
			  url:errorUrl};
	}
	
	var content=Display.render(SINGLETON.template,args);
	// Page.setContent(content);	


	// render the layout and the contect
	Layout.render("viewport",content);


};

SINGLETON.close=Page.close;

module.exports=SINGLETON;
