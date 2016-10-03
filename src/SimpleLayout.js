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

var AbstractLayout=require('./AbstractLayout');

var SINGLETON=function(layoutId,selector){

    var that=new AbstractLayout(layoutId);
    
    that.render=function(page,content){
		return that.renderIntoElement(page,selector,content);
    }
    
	return that;	
};


module.exports=SINGLETON;

