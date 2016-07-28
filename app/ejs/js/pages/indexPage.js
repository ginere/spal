/**
 * This is the error page
 */
'use strict';
<%- include('../snippet/js-head.ejs', {fileName: 'pages/indexPage.js'}); %>

var $ = require('jquery');
var Page=require('../pages/page');
var Display=require('../lib/display');
var Layout=require('./mainLayout');

// Effects

var SINGLETON={};

SINGLETON.uri=["","index.html"];

// The template should be loaded into the /templates/layout-list.ejs
// SINGLETON.templateId="layout";

// The page should be loaded into the layout page
// In this case: /app/ejs/templates/layout.ejs
// And use this is as the template id: 
//  <script	type="text/html" id="page-index"> render.pageForTemplate("pages/page-index.ejs") </script>

SINGLETON.id="page-index";
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

SINGLETON.render=function(uri){		
//	Page.showPageTemplate(SINGLETON);
	
	
	/* Effects */
	// Effects.ready();
	Layout.render();

};

SINGLETON.close=Page.close;

module.exports=SINGLETON;
