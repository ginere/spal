/**
 * Mother class for the layouts
 *
 *		Widget:
 *		- init: At initialization time. The doom is not guarantied.
 *		- layoutLoaded: Called when the template is rendered, and before the first page is rendered.
 *		- pageReady: Called after the page is rentered.

 */
'use strict';
<%- include('../snippet/js-head.ejs', {fileName: 'pages/AbstractLayout.js'}); %>

var log=require('../lib/log');
var $ = require('jquery');
var $Q = require('q');

var SINGLETON=function(layoutId){

	var that = {			
		layoutId:layoutId,
		layout:null,
		LAYOUT_LOADED:[],
		PAGE_READY:[],
		INIT_PROMISES:[]
	};


	// A widget is an windoe wlwmwnt that will be "present" in all the pages
	// Present does not mean "visible".
	that.subscriveWidget=function(name,widget){		
		if (!widget){
			log.error("ATTENTION subscribing undefined layout["+layoutId+"] widget:"+name);
		} else{
			if ($.isFunction(widget.layoutLoaded)) {
				log.info("Subscriving layout["+layoutId+"] widget:"+name+" on template rendered ...");
				this.LAYOUT_LOADED.push({name:name,f:widget.layoutLoaded});
			}
			
			if ($.isFunction(widget.pageReady)) {
				log.info("Subscriving layout["+layoutId+"] widget:"+name+" on pageReady ...");
				this.PAGE_READY.push({name:name,f:widget.pageReady});
			}

			if ($.isFunction(widget.init)) {
				log.info("Initializing layout["+layoutId+"] widget:"+name+"  ...");
				var promise=widget.init();
				if (promise){
					that.INIT_PROMISES.push(promise);
				}
			}			
		}		
	};

	function callingFunctions(FUNCTIONS_ARRAY,title){
		var PROMISES=[];

		$.each(FUNCTIONS_ARRAY,function(index,value){
			log.info(title+value.name);
			
			PROMISES.push(value.f());
		});

		return PROMISES;
	}

	that.loadLayout=function(page){		
		// Waiting the init promises to start ...
		$Q.all(that.INIT_PROMISES).then(function(schemas) {
			if (!that.layout) {
				// get the html from the #layoutId element
				that.layout=$("#"+that.layoutId).html();
				if (!that.layout){
					throw Error("Layout is empty:"+that.layoutId);
				} 
			}

			// after that call the template ready for the widgets
			return $Q.all(
				callingFunctions(this.LAYOUT_LOADED,"Calling the layout loaded function for widget:")
			);

		}).catch(function(err){
			log.err("Error on init promises layout["+layoutId+"]  ...",err);
			return err;
		});

	};

	// If the template is already rendered, do nothing
	that.render=function(viewport,content){		

		if ($("body").hasClass(that.layoutId)){
			log.info("Layout already rendered:"+that.layoutId);
		} else {
			log.info("Rendereing layout already rendered:"+that.layoutId);
			if (that.layout) {
				//			$("html").html(that.layout);
				//			$("html").replaceWith(that.layout);
//				var newDoc = document.open("text/html", "replace");
				var newDoc = document.open("text/html");
				newDoc.write(that.layout);
				newDoc.close();
			} else {
				throw Error("Can not render layout, is empty:"+that.layoutId);
			}
		}
		
		if (viewport && content) {
			var target=$("#"+viewport);
			if (target.length>0){
				target.html(content);		
				log.info("Renderedd content into view port:"+viewport);
			} else {
				throw Error("Viewport not found:"+viewport);		
			}
		}


		// after that call the template ready for the widgets
		return $Q.all(
			callingFunctions(this.PAGE_READY,"Calling the page ready function for widget:")
		);
		
	};
	

	return that;	
};


module.exports=SINGLETON;
