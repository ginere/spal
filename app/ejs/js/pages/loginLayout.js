/**
 * This is the error page
 */
'use strict';
<%- include('../snippet/js-head.ejs', {fileName: 'pages/mainLayout.js'}); %>

var log=require('../lib/log');
var $Q = require('q');
var auth=require('../dao/auth');

var AbstractLayout=require('./AbstractLayout');

var SINGLETON=new AbstractLayout("layout");


SINGLETON.layoutId="layout-login";
SINGLETON.layout=null;

SINGLETON.parentloadLayout=SINGLETON.loadLayout;

// On load the layout on test if the user is not connected to redirect to the home page
SINGLETON.loadLayout=function(page){		

	return auth.isUserLogged().then(function(response){
		log.info("User logged:"+response);
		if (response){
			return $Q.reject({redirect:"/index.html"});
		} else {
			// call the parent layout
			return SINGLETON.parentloadLayout(page);
		}
	}).catch(function(err){		
		log.error("While is user logged:",err);
		// return $Q.reject({redirect:"/login.html"});
		// For not logged users do not show errors ...
		// call the parent layout
		return SINGLETON.parentloadLayout(page);

	});

};

module.exports=SINGLETON;
