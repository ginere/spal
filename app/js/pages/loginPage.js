/**
 * This is the error page
 */
'use strict';
console.log("Loading file:pages/loginPage.js ...");

// -*- javascript -*- 
// DO NOT MODIFY this files
//
/*global sessionStorage: false, console: false, alert: false, $: false,window: false,jQuery:false,document:false,location:false,debugger:false,navigator:false */


var $ = require('jquery');
var Page=require('../pages/page');
var Display=require('../lib/display');
var log=require('../lib/log');

var auth=require('../dao/auth');
var spa=require('../lib/spa.js');

var Layout=require('./loginLayout');

// Effects

var SINGLETON={};

SINGLETON.uri="login.html";
SINGLETON.id="page-login";
	
// not init needed
SINGLETON.init=null;

SINGLETON.firstOpen=Page.firstOpen;
SINGLETON.userId=null;

// not load needed
SINGLETON.load=function(uri){		
	
	// first load the layout
	return Layout.loadLayout(SINGLETON).then(function(){
		// WHe dont have page template, the template is in the layout
//		if (!SINGLETON.template) {
//			SINGLETON.template=Page.loadPageTemplate(SINGLETON);
//		}
		return null;		
	});

	/*
	return auth.isUserLogged().then(function(response){
		log.info("User logged:"+response);
		if (response) {
			// if the user is logged redirect to the home page
			SINGLETON.userId=response;
			return $Q.reject({redirect:"/index.html"});
		} else {
			// if not logged everything ok.
			return null;
		}		
	}).catch(function(err){
		SINGLETON.userId=null;
		log.error("While is user logged:",err);
		return error;
	});
	*/
};

function goToSuccessLogin(){
	spa.navigate("index.html");
}

function loginFails(){
	$("input[name='id']").val("");
	$("input[name='password']").val("");
	$("input[name='id']").focus();

	$("#login-error").fadeIn(500);
}

function createAccountError(message){
	$("#account-fails-message").text(message);

	$("#account-fails-message").fadeIn(500);
}

function createAccountForm(event){
	var id=$("input[name='userId']").val();
	var email=$("input[name='email']").val();
	var password1=$("input[name='password1']").val();
	var password2=$("input[name='password2']").val();

	event.preventDefault();
	event.stopPropagation();

	if (password2 !== password1) {
		createAccountError("The passwords do not match");
	} else {
		debugger;
		auth.createAccount(id,password1,email)
			.then(function(response){
				if (response){
					log.info("Login ok:"+response);
					goToSuccessLogin();
				}
			},function(err){
				SINGLETON.userId=null;
				log.error("Account Creation fails:",err);
				return loginFails();
			});	
	}
	
}
function submit(event){
	var id=$("input[name='id']").val();
	var password=$("input[name='password']").val();
	
	event.preventDefault();
	event.stopPropagation();

	auth.login(id,password)
		.then(function(response){
			if (response){
				log.info("Login ok:"+response);
				goToSuccessLogin();
			}
		},function(err){
			SINGLETON.userId=null;
			log.error("Login fails:",err);
			return loginFails();
		});	
}

SINGLETON.render=function(uri){		
	Layout.render();


	if (SINGLETON.userId){
		log.info("User already logged navigate to home");
		goToSuccessLogin();
		return;
	} else {
		var form=$("#form");
		
		if (form.length <= 0) {
			throw new Error("The form passed in parameter doesn't exists:"+form);
		}
		
		form.submit(submit);

		var createForm=$("#createAccountForm");
		
		if (createForm.length <= 0) {
			throw new Error("The form passed in parameter doesn't exists:"+form);
		}
		
		createForm.submit(createAccountForm);

		return;
	}
};

SINGLETON.close=Page.close;

module.exports=SINGLETON;
