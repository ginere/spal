/**
 * This is the error page
 */
'use strict';
<%- include('../snippet/js-head.ejs', {fileName: 'pages/errorLayout.js'}); %>

var log=require('../lib/log');
var $ = require('jquery');
var Page=require('../pages/page');
var Display=require('../lib/display');

var AbstractLayout=require('./AbstractLayout');

var SINGLETON=new AbstractLayout("layout-error");

SINGLETON.layoutId="layout-error";
SINGLETON.layout=null;



// // not load needed
// SINGLETON.loadLayout=function(){		
// 	if (!SINGLETON.layout) {
// 		SINGLETON.layout=$("#"+SINGLETON.layoutId).html();
// 		if (!SINGLETON.layout){
// 			throw Error("Layout is empty:"+SINGLETON.layoutId);
// 		} 
// 	}
// }



// // If the remplate is already rendered, do nothing
// SINGLETON.render=function(viewport,content){		
// 	if ($("body").hasClass(SINGLETON.layoutId)){
// 		log.info("Layout already rendered:"+SINGLETON.layoutId);
// 	} else {
// 		log.info("Rendereing layout already rendered:"+SINGLETON.layoutId);
// 		if (SINGLETON.layout) {
// //			$("html").html(SINGLETON.layout);
// //			$("html").replaceWith(SINGLETON.layout);
// 			var newDoc = document.open("text/html", "replace");;
// 			newDoc.write(SINGLETON.layout);
// 			newDoc.close();
// 		} else {
// 			throw Error("Can not render layout, is empty:"+SINGLETON.layoutId);
// 		}
// 	}
	
// 	if (viewport && content) {
// 		var target=$("#"+viewport);
// 		if (target.length>0){
// 			target.html(content);		
// 			log.info("Renderedd content into view port:"+viewport);
// 		} else {
// 			throw Error("Viewport not found:"+viewport);		
// 		}
// 	}
// }


module.exports=SINGLETON;
