/**
 * Single page application controler
 * This is agnostic of the page structure ...
 *
 * Info: http://neugierig.org/software/blog/2014/02/single-page-app-links.html
 *       http://tutorialzine.com/2015/02/single-page-app-without-a-framework/
 *		 https://github.com/kriskowal/q/wiki/Coming-from-jQuery
 *		 http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html
 *
 *		The pages should have:
 *		- id: Unic ID to determine if the page has been loaded
 *		- uri: One string/array to determine the page
 *      Function returning promises:
 *		- init: A function to be called when the page is subscrived. (No doom).
 *		- load: Called beforethe page is renderd ...
 *		- render: That render the page
 *		- close: Called when the page is closed.
 *		- firstOpen: Deprecated. Called if this page is the first page called in the SPA
 *
 *		Modules:
 *		- documentReady: Called when the SPA application jqury document ready event.
 *		- pageReady: Called after the page has been rendered. For each
 */
'use strict';
<%- include('../snippet/js-head.ejs', {fileName: 'lib/spa.js'}); %>

var log=require('../lib/log');
var $ = require('jquery');
var $Q = require('q');
var log=require('./log.js');

var PAGES={};
var DOCUMENT_READY=[];
var PAGE_READY=[];
var currentPage=null;
var initPromises=[];
var errorPage=null;

var name="SPA";
log.info("# loading class "+name+" ...");

var SINGLETON={};


/**
 * This close the current page
 */
function closePage(){
	if (!currentPage){
		log.warn("No curent page defined.");
		return null;
	} else {
		return currentPage.close();
	}
}

/**
 * Show error page
 */
function showError(e,errorUrl){
	if (e && e.redirect) {
		return SINGLETON.navigate(e.redirect);
	} else {
		log.error("Page load fails:"+errorUrl,e);
		
		var page=errorPage;
		var URL="/"+page.uri;

		return $Q((page.load)?page.load(URL):null).then(function(){
			return closePage();
		}).then(function(){
			currentPage=page;
			return page.render(URL,e,errorUrl);
		}).catch(function(err){
			log.error("Error loading the error page:"+URL,err);
			return $Q.reject(err);
		});
	}
}

function pushUrl(URL){
	// coming from a pop when can call a push
	// do not call a push if this is the same url
	if (window.location.pathname === URL) {
		log.info("NOT PUSH window location:"+window.location.pathname+" equals to url:"+URL);
		//log.info("PUSH POP:"+window.location.pathname);

	} else {
		log.info("Pushing url:"+URL);

		window.history.pushState(null, null, URL);
	}
}

function callRenderModules(page) {
	var PROMISES=[];

	$.each(PAGE_READY,function(index,value){
		log.info("Calling page ready for page:"+page.id+" and module:"+value.name);

		PROMISES.push(value.f(page));
	});

	return $Q.all(PROMISES);
}

	/**
	 * This open a page.
	 */
	function openPage(page,URL,isFirstOpen){
		if (!page){
			return $Q.reject(new Error("No page passed forURL:'"+URL+"' isFirstOpen:"+isFirstOpen));
		} else {
			if (isFirstOpen){
				currentPage=page;
				
				return $Q(page.firstOpen(URL)).then(function(){
					return callRenderModules(page);							
				}).catch(function(err){
					return showError(err,URL);
				});
			} else {
				if (page.id === currentPage.id) {
					log.debug("Already in the page, avoiding:"+page.id);
					return $Q.resolve();
				} else {
					// push the url into the address bar to the page to have access to the url
					pushUrl(URL);
					// load the information for the page to be displayed
					return $Q((page.load)?page.load(URL):null).then(function(){
						// close the old one
						return closePage();
					}).then(function(){
						currentPage=page;
						
						// go to the page top
						window.scrollTo(0,0);
						
						return page.render(URL);
					}).then(function(){
						return callRenderModules(page);							
					}).fail(function(err){
						return showError(err,URL);
					});					
				}
			}
		}
	}


/**
 * This render the url.
 * Returns true if the uri has been handled by the controler
 */
function openUrl(URL,isFirstOpen) {
	if (PAGES[URL]){
		openPage(PAGES[URL],URL,isFirstOpen);
		return true;
	} else {
		var page=null;
		log.debug("URL:"+URL);
		var array = URL.split('/'); // /about.html -> ["", "about.html"]
		
		if (array.length > 0 && PAGES[array[1]] ) {
			page=PAGES[array[1]];
		} else if (PAGES[array[0]]) {
			page=PAGES[array[0]];
		} else {
			return false;
		}
		
		openPage(page,URL,isFirstOpen);		
		return true;
	}
}


function onPopStateEventListener(event){
	log.info("POP:"+document.location.pathname+" - "+ JSON.stringify(event.state));
	log.info("POP:"+window.location.pathname+ " - "+JSON.stringify(event.state));

	var uri=window.location.pathname;
	openUrl(uri,false,false);
	event.preventDefault();
}

function getParent(target){
	if (!target){
		return target;
	}else if (target.tagName === 'A') {
		return target;
	}else if (target.tagName === 'BODY') {
		return null;
	} else{
		return getParent(target.parentNode);
	}
}

function clickEventListener(event){
	try {
		// var tag = event.target;
		var tag=getParent(event.target);
		// var tag = (event.target.tagName === 'A')? event.target:event.target.parentNode;
		
		if (tag) {
			if (tag.tagName === 'A' && tag.href && event.button === 0) {
				// It's a left click on an <a href=...>.
				if (tag.origin === document.location.origin) {
					// It's a same-origin navigation: a link within the site.
					
					// Now check that the the app is capable of doing a
					// within-page update.  (You might also take .query into
					// account.)
					var newPath = tag.pathname; // tag.hash

					// verify with the window location
					if (window.location.href === tag.href){
						// nothing to to the same.
						return;
					} else {
						if (window.location.pathname === tag.pathname) {
							//
							// the hash is different
							window.history.pushState(null, null, tag.pathname+tag.hash);
							return ;
						}
					}

					if (openUrl(newPath,false,false)) {
						// Prevent the browser from doing the navigation.
						event.preventDefault();
						log.info("Controler render page:"+newPath);
						return ;
						// Let the app handle it.
						// app.render(newPath);
						//history.pushState(null, '', path);
					}
				}
			}
			<% if (DEBUG) { %>			
			if (tag.href){
				alert("Navigating:"+tag.href);
			}
			<% }  %>
		}
	}catch(err){
		event.preventDefault();
		showError(err,document.location.origin);
	}
}


/**
 * Main init
 log.info("# Subscriving pages:");
 
 subscrivePage("error",error);
 subscrivePage("about",about);
 subscrivePage("cookies",cookies);
 subscrivePage("list",list);
 subscrivePage("tv-show",tvShow);
 subscrivePage("play",play);
 //	subscrivePage("index",index);
 //	subscrivePage("garde",garde);

 subscriveModule("Autoplay",autoplay);
*/


SINGLETON.subscrivePage=function(name,page){
	if (!page){
		log.error("ATTENTION Passing undefined page:"+name);
	} else{

		if (!$.isFunction(page.render)) {
			log.error("The name:"+name+" do not have a render method.");
		} else {			
			if ($.isArray(page.uri)) {
				$.each(page.uri,function(index,value){
					log.info("Subscriving page:"+page.id+", url:'"+value+"'");
					PAGES[value]=page;		
				});
			} else {
				log.info("Subscriving page:"+page.id+", url:'"+page.uri+"'");
				PAGES[page.uri]=page;		
			}
		}

		if ($.isFunction(page.init)) {
			log.info("Initializing page:"+name+" id:"+page.id+", url:'"+page.uri+"'");
			var promise=page.init();
			if (promise){
				initPromises.push(promise);
			}
		}
	}
};

SINGLETON.subscriveModule=function(name,module){
	if (!module){
		log.error("ATTENTION Passing undefined module:"+name);
	} else{
		if ($.isFunction(module.documentReady)) {
			log.info("Subscriving Module:"+name+" on document ready function ...");
			DOCUMENT_READY.push({name:name,f:module.documentReady});
		}

		if ($.isFunction(module.pageReady)) {
			log.info("Subscriving Module:"+name+" on page ready function ...");
			PAGE_READY.push({name:name,f:module.pageReady});
		}
	}
};


SINGLETON.start=function(error){
	if (!error){
		log.error("No error page passed");
		return ;
	} 
	
	errorPage=error;
	
	// On ready state
	$(document).ready(function(){
		log.info("# Subscriving event listenrs ...");

		// http://neugierig.org/software/blog/2014/02/single-page-app-links.html
		window.onpopstate = onPopStateEventListener;
		
		// Event listeners
		// Catch clicks on the root-level element.
		
		document.body.addEventListener('click',clickEventListener);
		
		var uri=window.location.pathname;


		// Executing the document ready function for all the modules
		var DOCUMENT_READY_PROMISES=[];

		$.each(DOCUMENT_READY,function(index,value){
			log.info("Document calling document ready for:"+value.name);
			
			DOCUMENT_READY_PROMISES.push(value.f());
		});

		
		// waiting for the init promises and draw
		$Q.all(initPromises).then(function(schemas) {
			// wating for the module promises to start ...
			return $Q(DOCUMENT_READY_PROMISES).then(function(schemas) {
				// draw the current page
				openUrl(uri,true,true);		
				return $Q.resolve();
			}).catch(function(err){
				log.error("Error on module promises init:",err);			
				return showError(err,uri);
			});
		}).fail(function(err){
			log.error("Error on init pages:",err);			
			return showError(err,uri);
		});

	});
};

SINGLETON.navigate=function(URL){
	return openUrl(URL,false);
};



module.exports=SINGLETON;