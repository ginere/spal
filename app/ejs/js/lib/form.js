// /**
//    * use this class to validate and submit forms ...
//  */
// 'use strict';
// <%- include('../snippet/js-head.ejs', {fileName: 'lib/form.js'}); %>

// var $ = require('jquery');
// var q = require('q');
// var core = require('./core');
// var log=require('./log');

// var SINGLETON=function(_form){
	
// 	if ($(_form).length <= 0) {
// 		throw new Error("The form passed in parameter doesn't exists:"+_form);
// 	}
	
// 	var form=$(_form);
	
// 	function _render(){
// // 		page.button($("#cancel-btn"),null,null,cancelAction); // ENTER KEY
// // 		page.button($("#ok-btn"),null,null,submitAction); // ENTER KEY			
		
// // 		$('body').find("[id$='-form']").change(function(event){
// // 			var target=event.target;
			
// // 			checkField($(target));
// // 		});
		
// // 			// no promise here
// // 		return null;
// 	}
	

// 	function handleEvents(){
// 		form.on('keypress',function (event){
// 			var code=event.which;
// 			switch (code){					
// 			case 27: // ESC
// 				event.preventDefault();
// 				event.stopPropagation();
				
// 				that.askForCancelEditing(cancelCB);
// 				break;
// 			case 13: ENTER:
				
// 				if (event.target && 
// 					event.target.tagName === "TEXTAREA") {						
// 					// nothing to allow new lines in text areas
// 				} else {
// 					event.preventDefault();
// 					event.stopPropagation();
					
// 					that.askForValidateEditing();					
// 				}
// 				break;
// 			}
// 		});
// 	}

// 	handleEvents();

// 	var that = {			
// 		render:function(){
// 			return _render();
// 		}
// 	}

// 	return that;
// };




// module.exports=SINGLETON;
