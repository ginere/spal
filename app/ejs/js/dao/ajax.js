/**
 * This handle the server comunications. The server response are parsed and the error are
 * showed to the user.
 * also transform the jquery promises into the Q ones
 */
'use strict';
<%- include('../snippet/js-head.ejs', {fileName: 'lib/ajax.js'}); %>

var log=require('../lib/log');
var $ = require('jquery');
var $Q = require('q');
var core = require('../lib/core');

var SINGLETON={};


SINGLETON.json=function(uri,title,data){

	var url=core.getServiceUrl(uri);

	return $Q($.ajax({
		url: url, 
		dataType: "json",
		cache : false,
		data: data,
		async: true,
		type:'GET'})).then(function(res){
			if (res){
				if (res && res.success === true){
					if (res.message) {
						log.warn("Message:"+ res.message+
								 " Url:"+url+
								 " Title:"+title);
					}
					return $Q.resolve(res.result);
				} else {
					var msg="Message:"+ res.error+
						" Url:"+url+
						" Title:"+title;
					return $Q.reject(new Error(msg));
				}
			} else {
				return $Q.reject(new Error("No response from server,"+
										   "Url:"+url+
										   " Title:"+title));
			}
		},function(err){
			debugger;
			log.error("Url:"+url+
					  " Title:"+title
					  ,err);

			return $Q.reject(err);
		});
	
};

module.exports=SINGLETON;
