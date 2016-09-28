/**
 * This is a nother class for a simple page that do not load json content.
 *
 * if no template this look for a tamplate called $("#"+obj.id).html();
 * This implement a default render that render the demplate of the layout.
 */
'use strict';

var Error=require('./error');
var log=require('./log');
var $ = require('jquery');
var $Q = require('q');

var SINGLETON=function(id,uri,Layout){

	var that = {			
		id:id,  // The page unic ID
		uri:uri,  // The uri, maybe un array, to be used by the routes				
		template:null, // the template that render the page
		
		// The SAP Function, see spa.js
		init:null,
		firstOpen:null,
		render:null		
	};


	// uses the id of the object passed in parameter or id passed to the constructor
	// to get the template
	that.loadPageTemplate=function(s){
		var obj=(!s)?that:s;

		var template=$("#"+obj.id).html();
		if (!template){
			throw Error.error("Template is empty, the dom id:"+obj.id+" can not be found.");
		} else {
			return template;
		}
	};

	that.load=function(uri){
		// first load the layout
		return $Q(Layout.loadLayout(that)).then(function(){
			// then the page
			if (!that.template) {
				that.template=that.loadPageTemplate();
			}
			return Error.resolve();		
		}).catch(function(err){
			return Error.reject("While loading the layouts for uri:"+uri,err);
		});
		
	};

    that.render=function(uri){
        try {
            return Layout.render(id,that.template);
        }catch(err){
            throw Error.error("Error while rentering page:"+id+", uri:"+uri,err);
        }
    };

    
	that.close=function(uri){
		log.info("Close:"+that.id+" Uri:"+uri);		
	};
	
	return that;	
};


module.exports=SINGLETON;


