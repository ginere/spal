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
 *		- firstOpen: @Deprecated. Called if this page is the first page called in the SPA
 *
 *		Widget:
 *		- init: A function to be called when the widget is subscrived(No doom).
 *		- documentReady: Called when the SPA application jqury document ready event.
 *		- pageReady: Called after the page has been rendered. For each
 */
'use strict';

var error=require('./error');
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

var SINGLETON={};


// This sets the application root. All the uris and urls will be relative to that.
// That allows to install your pages relatives to a parent folder.

// If your pages are like http://server/example/page1.html http://server/example/page2.html you can
// set the application root to "/example" and you can define your pages as page1.html and page2.html
SINGLETON.ROOT="";

SINGLETON.setApplicationRoot=function(applicationRoot){
	
	if (applicationRoot){
		if (!applicationRoot.startsWith("/")){
			SINGLETON.ROOT="/"+applicationRoot;
		} else {
			SINGLETON.ROOT=applicationRoot;
		}
		log.info("Setting application root to:"+SINGLETON.ROOT);
	}
	
};


function getPageUri(URL){
	if (SINGLETON.ROOT){
		return URL.substring(SINGLETON.ROOT.length,URL.length);
	} else {
		return URL;
	}
}


function getPageURL(uri){
	if (uri){
		if (!uri.startsWith("/")){
			return SINGLETON.ROOT+"/"+uri;
		} else {
			return SINGLETON.ROOT+uri;
		}
	} else {
		return SINGLETON.ROOT+"/";
	}
}

// This alows to debug wrong links outof your SPA
SINGLETON.navigationAlert=false;
SINGLETON.setNatigationAlert=function(nav){
    SINGLETON.navigationAlert=nav;
};


/**
 * This close the current page
 */
function closePage(){
	if (!currentPage){
		log.warn("No curent page defined.");
		return null;
	} else {
		log.debug("Closing page:"+currentPage.id);
		if ($.isFunction(currentPage.close)){
			return currentPage.close();
		}
	}
}

/**
 * Show error page
 */
function showError(e,errorUrl){
	log.error("Error page due to:"+errorUrl,e);
		
	if (e && e.redirect) {
		return SINGLETON.navigate(e.redirect);
	} else {
		var page=errorPage;
		var URL="/"+page.uri;

		return $Q((page.load)?page.load(URL):null).then(function(){
			return closePage();
		}).then(function(){
			currentPage=page;
            // passing data to the render function
			return page.render(errorUrl,e,errorUrl);
		}).catch(function(err){
			log.error("Error loading the error page:"+URL,err);
			return error.reject("Error loading the error page:"+URL,err);
		});
	}
}

function pushUri(uri){
	var URL=getPageURL(uri);
	// coming from a pop when can call a push
	// do not call a push if this is the same url
	if (window.location.pathname === URL) {
		log.info("NOT PUSH window location:"+window.location.pathname+" equals to url:"+URL);
	} else {
		log.info("Pushing url:"+URL);

		window.history.pushState(null, null, URL);
	}
}

function callRenderWidgets(page) {
	var PROMISES=[];
	
	$.each(PAGE_READY,function(index,value){
		log.info("Calling the widget page ready for page:"+page.id+" and widget:"+value.name);
		
		PROMISES.push(value.f(page));
	});
	
	return $Q.all(PROMISES);
}

/**
 * This open a page.
 */
function openPage(page,uri,isFirstOpen){
	if (!page){
		return error.reject("No page passed for URI:'"+uri+"' isFirstOpen:"+isFirstOpen);
	} else {
		if (isFirstOpen && $.isFunction(page.firstOpen)){
			currentPage=page;
			
			return $Q(page.firstOpen(uri)).then(function(){
				return callRenderWidgets(page);							
			}).catch(function(err){
				return showError(err,uri);
			});
		} else {
			if (currentPage && page.id === currentPage.id) {
				log.debug("Already in the page, avoiding:"+page.id);
				
				// To suppor hash urls /login.html#signup /login.html#signin
				pushUri(uri);

				return $Q.resolve();
			} else {
				// load the information for the page to be displayed
				return $Q((page.load)?page.load(uri):null).then(function(){
					// close the old one
					return closePage();
				}).then(function(){
					// push the url into the address bar to the page to have access to the url
					pushUri(uri);
					
					currentPage=page;
					
					// go to the page top
					window.scrollTo(0,0);
					
					return page.render(uri);
				}).then(function(){
					return callRenderWidgets(page);							
				}).catch(function(err){
					return showError(err,uri);
				});					
			}
		}
	}
}


/**
 * This render the url.
 * Returns true if the uri has been handled by the controler.
 */
function openUrl(URL,isFirstOpen) {

	if (PAGES[URL]){
		openPage(PAGES[URL],getPageUri(URL),isFirstOpen);
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

		// Storing into the hash table.
		PAGES[URL]=page;

		log.info("Page:"+page.id+" found for url:"+URL);
		openPage(page,getPageUri(URL),isFirstOpen);		
		return true;
	}
}


function onPopStateEventListener(event){
	log.info("POP:"+document.location.pathname+" - "+ JSON.stringify(event.state));
	log.error("POP:"+window.location.pathname+ " - "+JSON.stringify(event.state));

	var uri=window.location.pathname+((window.location.hash)?window.location.hash:'');

	// Is the openUrl who shoul do the prevent default
	// TODO This is temporal
	if (!window.location.hash) {
		if (openUrl(uri,false)){
		    event.preventDefault();
        }
	}
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
				// Test if the tag call an url of the current server
				if (tag.origin === document.location.origin) {
					// It's a same-origin navigation: a link within the site.
					
					// Now check that the the app is capable of doing a
					// within-page update.  (You might also take .query into
					// account.)
					// the hash is included in the urls
					var newPath = tag.pathname+((tag.hash)?tag.hash:''); // tag.hash
					// Is the same url: "http://localhost:3000/login.html#signup"
					if (window.location.href === tag.href){
						// nothing to to the same.
						log.debug("Igored, alredy in the same url:"+tag.href);
						event.preventDefault();
						return;
					}

					// Here means that the url are diferent, bu if the have the same path and different hash we execute
					// the default to simulate the hash call
					if ( window.location.pathname === tag.pathname && tag.hash !==window.location.hash){
						log.info("Execute hash:"+tag.hash+" on page:"+tag.pathname);
						return;
					}

					if (openUrl(newPath,false)) {
						// Prevent the browser from doing the navigation.
						event.preventDefault();
						log.info("Page renderd:"+newPath+" DONE.");
						return ;
					}
				}
			}
			if (SINGLETON.navigationAlert){
			    if (tag.href && tag.href!=="javascript:;" ){ // jshint ignore:line
				    alert("Navigating:"+tag.href);
			    }
			} 
		}
	}catch(err){
		event.preventDefault();
		showError(err,document.location.origin);
	}
}


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
					PAGES[getPageURL(value)]=page;		
				});
			} else {
				log.info("Subscriving page:"+page.id+", url:'"+page.uri+"'");
				PAGES[getPageURL(page.uri)]=page;		
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

SINGLETON.subscriveWidget=function(name,widget){
	if (!widget){
		log.error("ATTENTION Passing undefined widget:"+name);
	} else{
		if ($.isFunction(widget.documentReady)) {
			log.info("Subscriving widget:"+name+" on document ready function ...");
			DOCUMENT_READY.push({name:name,f:widget.documentReady});
		}

		if ($.isFunction(widget.pageReady)) {
			log.info("Subscriving Widget:"+name+" on page ready function ...");
			PAGE_READY.push({name:name,f:widget.pageReady});
		}

		if ($.isFunction(widget.init)) {
			log.info("Initializing widget:"+name);
			var promise=widget.init();
			if (promise){
				initPromises.push(promise);
			}
		}

	}
};


SINGLETON.start=function(customErrorPage){
	if (!error){
		log.error("No error page passed");
		return ;
	} 
	
	errorPage=customErrorPage;
	
	// On ready state
	$(document).ready(function(){

		SINGLETON.subscriveEvents();
// 		log.info("# Subscriving event listenrs ...");

// 		// http://neugierig.org/software/blog/2014/02/single-page-app-links.html
// 		window.onpopstate = onPopStateEventListener;
		
// 		// Event listeners
// 		// Catch clicks on the root-level element.
		
// 		//document.body.addEventListener('click',clickEventListener);
// 		$("body").on('click',"a",clickEventListener);
		
		var uri=window.location.pathname;

		// Executing the document ready function for all the Widgets
		var DOCUMENT_READY_PROMISES=[];

		$.each(DOCUMENT_READY,function(index,value){
			log.info("Document calling document ready for:"+value.name);
			
			DOCUMENT_READY_PROMISES.push(value.f());
		});

		
		// waiting for the init promises and draw
		$Q.all(initPromises).then(function(schemas) {
			// wating for the widget promises to start ...
			return $Q.all(DOCUMENT_READY_PROMISES).then(function(schemas) {
				// draw the current page
				if (openUrl(uri,true)){
				    return $Q.resolve();
                } else {
                    return error.reject("No page found for url:"+uri);
                }
			}).catch(function(err){
				return showError(err,uri);
			});
		}).catch(function(err){
			return showError(err,uri);
		});

	});
};

SINGLETON.navigate=function(uri){
	try {
		log.info("Spa asked to navigate to:"+uri);
		return openUrl(getPageURL(uri),false);
		///pushUri(url);
	}catch(err){
		return showError(err,uri);
	}
};

// use this function when the hole page has changed and all the events need to be resubscrived
SINGLETON.subscriveEvents=function(){
	log.info("# Subscriving event listenrs ...");

	// http://neugierig.org/software/blog/2014/02/single-page-app-links.html
	window.onpopstate = onPopStateEventListener;
		
	// Event listeners
	// Catch clicks on the root-level element.
	
	//document.body.addEventListener('click',clickEventListener);
	$("body").on('click',"a",clickEventListener);	
};


module.exports=SINGLETON;
