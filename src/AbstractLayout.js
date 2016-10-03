/**
 * Mother class for the layouts. 
 *
 * that.isLayoutRendered: This layout is already rendered if the body has a class named with the layoutId. That Could be overwriteen.
 *
 * that.loadLayout: IF no that.layout is defined it tryes to load  $(#layoutId).html();
 *
 * This layout have the caracteristyc that, when the layout had already been 
 * rendered the page will be rentered into a element id passing the content.
 *
 * The layout may have widgets, that have the following properties:
 *
 *		- init: At initialization time. The doom is not guarantied. 
 *          - The AbstractLayout is passed in param.
 *
 *		- layoutRendered: Called when the template is rendered, and before the 
 *        first page is rendered.
 *          - The AbstractLayout is passed in param.
 *
 *		- pageReady: Called after the page is rentered. This is called iof the 
 *        page uses one of the render fuinction of this class or if the pageRedy
 *        method is called.
 *          - The AbstractLayout is passed in param.
 *          - The page object is passed in parameter
 */
'use strict';

var Error=require('./error');
var log=require('./log');
var $ = require('jquery');
var $Q = require('q');

var SPA=require('./spa');

var SINGLETON=function(layoutId){

	var that = {			
		layoutId:layoutId,
		layout:null,
		LAYOUT_RENDERED:[],
		PAGE_READY:[],
		INIT_PROMISES:[]
	};

    // true if the  promises of all the widget.layoutRendered has been resolved.
	// The Layout html can be part of the page, then the layout is loaded. But 
	// we have to call the widget.layoutRendered explicitly, we can no more
	// trust the SINGLETON.isLayoutRendered To be sure that the widgets has been called
	var widgetLayoutRenderedCalled=false;


	// A widget is an window that will be "present" in all the pages.
	// Present does not mean "visible".
	that.subscriveWidget=function(name,widget){		
		if (!widget){
			log.error("ATTENTION subscribing undefined widget, layout["+layoutId+"] widget:"+name);			
		} else{
			if ($.isFunction(widget.layoutRendered)) {
				log.info("Subscriving layout["+layoutId+"] widget:"+name+" on template rendered ...");
				that.LAYOUT_RENDERED.push({name:name,f:widget.layoutRendered});
			}
			
			if ($.isFunction(widget.pageReady)) {
				log.info("Subscriving layout["+layoutId+"] widget:"+name+" on pageReady ...");
				that.PAGE_READY.push({name:name,f:widget.pageReady});
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

	function callingFunctions(FUNCTIONS_ARRAY,title,param){
		var PROMISES=[];

		$.each(FUNCTIONS_ARRAY,function(index,value){
			log.info(title+value.name);
			
			PROMISES.push(value.f(that,param));
		});

		return PROMISES;
	}

	function callLayoutRenderd(){
		return $Q.all(
			callingFunctions(that.LAYOUT_RENDERED,"Calling the layout loaded function for widget:")
		).finally(function(res){
			widgetLayoutRenderedCalled=true;
			return res;
		});
	}

	that.isLayoutRendered=function(){
		var body=$("body");

		return (body.length>0 && body.hasClass(that.layoutId));		
	};

	that.loadLayout=function(page){		
		// Waiting the init promises to start ...
		return $Q.all(that.INIT_PROMISES).then(function(schemas) {
			if (!that.layout) {
                return that.loadLayoutInner().then(function(code){
                    that.layout=code;
                    return $Q.resolve(code);
                });
			}
		}).catch(function(err){
			return Error.reject("Error loading layout["+layoutId+"], in page:"+page.id,err);
		});
	};


    /**
     * That should return a promise that returns the layout code to be rendered in the page
     */
    that.loadLayoutInner=function(){
        var element=$("#"+that.layoutId);

        if (element.length>0){
            return $Q.resolve(element.html());
        } else {
            return Error.reject("No element:"+that.layoutId+" found to load ther layout template");
        }
    };

	that.renderLayout=function(){
		if (that.isLayoutRendered()){
			log.info("Layout already rendered:"+that.layoutId);

			// the layout may be renderd when loading directly the html from the html file.
			// but we have to call the windget.
			if (widgetLayoutRenderedCalled) {
				return $Q.resolve();
			} else {
				return callLayoutRenderd();
			}
		} else {
			log.info("Rendereing layout already rendered:"+that.layoutId);
			if (that.layout) {
                //
                // that overwrites the page html
                //
                
				 // Metodo 1
// 				$(document).bind("DOMSubtreeModified", function(event){
// 					console.log(event.target);
// 				});

				var newDoc = document.open("text/html");
				newDoc.write(that.layout);
				newDoc.close();
				
// 				$(newDoc).bind("DOMSubtreeModified", function(event){
// 					console.log(event.target);
// 				});

				// Metodo 2
				//$("html").html(that.layout);


				// Si almacenamos directamente los html-layut en los layout, no tenemos que cargarlos ... lo podemos preparsear con el mustache
				// Y no tenemos el problema de los includes de los includes que al cambiar de layout, la definicion de los layout-list desaparecia y no podiamos mas cambiar de layout ... VERIFICARLO

				// LA cambiar de layout alomejor hay que resuscrivir los eventos del SPA porque desaparecen los listerners. VERIFICARLO
				
				// Resubscriving events ...
				SPA.subscriveEvents();
				
				// here for sure we have to call the renders the html has been changed
				return callLayoutRenderd();
			} else {
				return Error.reject("Can not render layout, is empty:"+that.layoutId);
			}
		}		
	};


    that.pageReady=function(page){
        // after that call the template ready for the widgets
		return $Q.all(
			callingFunctions(that.PAGE_READY,"Calling the page ready function for widget:",page)
		).catch(function(err){
            return Error.reject("Calling the page ready for pageId:"+page.id+", layoutId:"+layoutId,err);            
        });
    };


    /**
     * This render the content into th element passed.
     * Then the readypage is called for the widgets
     */
	// This is the render method that should be called from all the pages.
    // If the template is already rendered, do nothing
	that.renderIntoElement=function(page,element,content){
        if (!page || !page.id){
			return Error.reject("No page object passed in parameter. LayoutId:"+layoutId,err);
        } else if (element) {
            return that.renderFromFunction(page,function(){
                var target=$(element);
				if (target.length>0){
					target.html(content);		
					log.info("Rendered content into viewport:"+element+" for pageId:"+page.id+", layoutId:"+layoutId);
                    return $Q.resolve();
				} else {
					return Error.reject("Viewport not found:"+element+" for pageId:"+page.id+", layoutId:"+layoutId);
				}                
            });
        } else {
			return Error.reject("Viewport not found:"+element+" for pageId:"+page.id+", layoutId:"+layoutId);            
        }        
	};


    /**
     * This method will call the function to render the page.
     * The function shuld return a promisse.
     * After the promise the readypage is called for the widgets
     */
	that.renderFromFunction=function(page,childRenderFunction){
        if (!page || !page.id){
            debugger;
			return Error.reject("No page object passed in parameter. LayoutId:"+layoutId);
        } else {        
		    return that.renderLayout().then(function(){
                if (!$.isFunction(childRenderFunction)){
			        return Error.reject("The child render function is not a function, pageId:"+page.id+", layoutId:"+layoutId);
                } else {
                    return $Q(childRenderFunction()).then(function(){
                        // after that call the template ready for the widgets
                        return that.pageReady(page);
		            }).catch(function(err){
			            return Error.reject("While calling the child render function, pageId:"+page.id+", layoutId:"+layoutId,err);
                    });
                }
                
		    }).catch(function(err){
			    return Error.reject("The rendering page function for pageId:"+page.id+", layoutId:"+layoutId,err);
		    });
        }
	};
	


	return that;	
};


module.exports=SINGLETON;
