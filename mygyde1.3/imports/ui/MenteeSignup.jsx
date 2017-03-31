/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';

export default class Signup extends React.Component {
  	confirm(e){
	    e.preventDefault();
	    let pass = ReactDOM.findDOMNode(this.refs.password).value;
	    let confPass = ReactDOM.findDOMNode(this.refs.cpass).value;
	    $("#ConfirmPassword").removeClass("alert-warning").addClass("alert-danger");
	    if(pass != confPass){
	      	$("#ConfirmPassword").addClass("alert-danger").removeClass("alert-success")
	    }
	    else{
	      	$("#ConfirmPassword").removeClass("alert-danger").addClass("alert-success")
	    }
  	}
  	verify(password){
	    let pattern = /(?=.*\d)(?=.*[A-Z]).{6,50}/g;
	    $("#description").removeClass("alert-warning").addClass("alert-danger");
	    if(pattern.test(password)){
	      	$("#description").removeClass("alert-danger").addClass("alert-success")
	      	return true;
	    }
	    else{
		    $("#description").addClass("alert-danger").removeClass("alert-success")
		    return false;
	    }
  	}
  	DrawCaptcha() {  
	    let a = 49, b = 65;  
	    let c = 100;  
	    let d = 70;  
	    let element = this.refs.txtCaptcha;  
	    element.onselectstart = function () { return false; } // ie  
	    element.onmousedown = function () { return false; } // mozilla  
	    if (a == 49) {  
	      a = 57;  
	    }  
	    let main = ReactDOM.findDOMNode(this.refs.txtCaptcha);
	    main.value ="";       
	    let a1 = String.fromCharCode(64+Math.random()*10+1);  
	    let b1 =String.fromCharCode(64+(Math.random()*10)+1); javascript:void(0)
	    let c1 = String.fromCharCode(64+(Math.random()*10)+1);  
	    let d1 = String.fromCharCode(64+(Math.random()*10)+1);  
	    main.value = a1 +" "+ b1 +" "+ c1 + " "+d1+" "+ String.fromCharCode(64+(Math.random()*10)+2)+ " "+String.fromCharCode(64+(Math.random()*10)+1);  
	    //alert(main.value)
  	}
  	removeSpaces(string){
    	return string.split(' ').join(''); 
  	}
  	check(){
	    let str1 = this.removeSpaces(this.refs.txtCaptcha.value);  
	    let str2 = this.refs.txtInput.value;
	    if (str1.toLowerCase() != str2.toLowerCase()){   
	      	return true; 
	    }
	    return false;
  	}
  	handleSubmit(e) {
	    e.preventDefault();
	    let pswd =  ReactDOM.findDOMNode(this.refs.password).value;
	    let cpswd = ReactDOM.findDOMNode(this.refs.cpass).value;
	    let pattern = /(?=.*\d)(?=.*[A-Z]).{6,50}/g;
	    that = this
	    if(pattern.test(pswd) == false){
	      	Bert.alert("Please input password in required format.", "warning", 'growl-top-left')
	    }
	    else if(pswd != cpswd){
	      	Bert.alert("Password Mismatch.", "warning", 'growl-top-left')
	    }
	    else if(this.check()){
	      	Bert.alert("Wrong Captcha.", "warning", 'growl-top-left')
	    }
	    else{
	      	let password = ReactDOM.findDOMNode(this.refs.password).value,
	      	userData = { 
		        email : ReactDOM.findDOMNode(this.refs.email).value,
		        profile: {
		          	name : ReactDOM.findDOMNode(this.refs.name).value,
		          	lname : ReactDOM.findDOMNode(this.refs.lname).value,
		          	mtype : "mentee"
		        }
	      	}
	      	document.getElementById('imageContainer').style.display = 'block';
	      	document.getElementById('fade').style.display = 'block';
	      	Meteor.call("createMentee", userData, password, function(err){
		        if(err){
		         	// console.log(err,"Error Occured")
		          	Bert.alert("Error while creating mentee user", "danger", 'growl-top-left');
		          	document.getElementById('imageContainer').style.display = 'none';
		          	document.getElementById('fade').style.display = 'none';
		        }else{
		          	window.alert("Account Created Successfully. Verification Link has been send to your given email Id. Please verify email to activate your account.")
		          	window.location.href="/";
		        }
	      	})
	    }
  	}
  	captchaReset(){
    	this.DrawCaptcha()
  	}
  	componentDidMount(){
    	this.DrawCaptcha()
  	}
  	checkEmail(email){
    	let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if(pattern.test(email)){
	      	if(Meteor.users.find({'emails.0.address': email}).count() == 0 ){
	        	// console.log("Email not exists")
	        	$("#emailmessage").text(" ");
	      	}else{
	        	// console.log("Email already exists")
	        	$("#emailmessage").text("Email already exists");
	      	}
    	}else{
      		$("#emailmessage").text(" ");
    	}
  	}
  	render(){
    	return(
      		<div>
        		<div id="form">
          			<h2 className="MenteeSignUp">Mentee Sign up Form</h2>
          			<h5 id="loginMessage">Please sign up to reach out to our mentors.</h5>
          			<form role="form" name="register" id="register" onSubmit={this.handleSubmit.bind(this)}>         
            			<div className="form-group">
              				<label>First Name :<span className="REQUIRED_FIELD">*</span></label>
              				<input type="text" className="form-control" ref="name" placeholder="First Name" required maxLength="15" />
            			</div>
            			<div className="form-group">
              				<label>Last Name :<span className="REQUIRED_FIELD">*</span></label>
              				<input type="text" className="form-control" ref="lname" placeholder="Last Name" required maxLength="15" />
            			</div>
            			<div className="form-group">
              				<label>Email Id :<span className="REQUIRED_FIELD">*</span></label>
              				<input type="email" className="form-control" onChange={() =>{this.checkEmail(this.refs.email.value)}} ref="email" placeholder="Email Id" required/>
              				<p id="emailmessage"></p> 
            			</div>
            			<div className="form-group">
              				<label>Password :<span className="REQUIRED_FIELD">*</span></label>  
              				<input type="password" className="form-control" id="password" ref="password" placeholder="Password" onChange ={()=>{this.verify(this.refs.password.value)}} required/>
              				<div id="description" className="alert alert-warning text-caption"> 
                				<a href="" className="close" aria-label="close"></a>
                				Password must be minimum 6 characters long including Numbers and Uppercase letters.
              				</div>
            			</div>
            			<div className="form-group">
              				<label>Confirm Password :<span className="REQUIRED_FIELD">*</span></label>  
              				<input type="password" className="form-control" ref="cpass" placeholder="Confirm Password" onChange ={this.confirm.bind(this)} required/>
              				<div id="ConfirmPassword" className="alert alert-warning text-caption"> 
                				<a href="" className="close" aria-label="close"></a>
                				Passwords must match.
              				</div> 
            			</div>
            			<div className="form-group">
              				<label className="captch-label">Captcha :<span className="REQUIRED_FIELD">*</span></label>
              				<div className="row">
                				<div className="col-sm-6">
                  					<input type="text" className="form-control" required id="txtInput" ref="txtInput" /> 
               	 				</div>
                				<div className="col-sm-4 dt-captcha">   
                  					<input type="text" className="form-control" id="txtCaptcha" ref="txtCaptcha" size="12" />
                				</div>
                				<div className="col-sm-2">  
                  					<span className="captcha-reset" onClick={this.captchaReset.bind(this)}><i className="fa fa-refresh"></i></span>
                				</div>
              				</div>
            			</div>
                
            			<div className="form-group">  
              				<button type="submit" className="submit buttonClick btn btn-primary btn-block">Sign up</button>
            			</div>
          			</form>
        		</div>
        		<div id="results"></div>
        		<div id="fade"></div>
        		<div id="imageContainer">
          			<img id="loader" src="/loading.gif" />
        		</div>
      		</div>
    	);
  	}
}