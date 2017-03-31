/* Import React, Component, render and ReactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { Bert } from 'meteor/themeteorchef:bert';

export default class Contact extends React.Component {
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
		let b1 =String.fromCharCode(64+(Math.random()*10)+1);  javascript:void(0)
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
  	if (str1.toLowerCase() != str2.toLowerCase()) {
    	return true;
  	}
  	return false;
	}
	captchaReset(){
  	this.DrawCaptcha();
	}
	componentDidMount(){
  	this.DrawCaptcha();
	}
	SubmitForm(event){
		event.preventDefault();
		let name = ReactDOM.findDOMNode(this.refs.name).value.trim();
		let email = ReactDOM.findDOMNode(this.refs.email).value.trim();
		let message = ReactDOM.findDOMNode(this.refs.message).value.trim();
		let Captcha = ReactDOM.findDOMNode(this.refs.txtInput).value.trim();
		if(name == ""){
			Bert.alert("Please input name.", "warning", "growl-top-left");
		}else if(email == ""){
			Bert.alert("Please input email.", "warning", "growl-top-left");
		}else if(message == ""){
			Bert.alert("Please input message.", "warning", "growl-top-left");
		}else if(Captcha == ""){
			Bert.alert("Please input Captcha.", "warning", "growl-top-left");
		}else if(this.check()){
    	Bert.alert("Wrong Captcha.", "warning", "growl-top-left");
  	}else{
			Meteor.call("Feedback_Email", name, email, message);
			Bert.alert("Mail received successfully. We will respond you soon.", "info", "growl-top-left");
			ReactDOM.findDOMNode(this.refs.name).value = "";
			ReactDOM.findDOMNode(this.refs.email).value = "";
			ReactDOM.findDOMNode(this.refs.message).value = "";
			ReactDOM.findDOMNode(this.refs.txtInput).value = "";
		}
	}
	render(){
		return(
			<section className="contact-us section-block" id="contact-us">
				<div className="container">
					<div className="section-title-block">
						<h3 className="section-title">Contact us</h3>
						<p className="lead">
							Please make sure to drop us a message for any feedback or support.
						</p>
					</div>

					<div className="row">
						<div className="col-md-12 contact-form">
							<form role="form" onSubmit={this.SubmitForm.bind(this)}>
								<div className="row form-content">
									<div className="col-md-6 name-field">
										<div className="form-group">
											<label className="sr-only" htmlFor="name">Name:</label>
											<input type="text" className="form-control" ref="name" placeholder="Name" />
										</div>
									</div>
									<div className="col-md-6 email-field">
										<div className="form-group">
											<label className="sr-only" htmlFor="email">Email:</label>
											<input type="text" className="form-control" ref="email" placeholder="Email" />
										</div>
									</div>

									<div className="col-md-12 message-field">
										<div className="form-group">
											<label className="sr-only" htmlFor="message">Message</label>
											<textarea className="form-control textAreaContent" ref="message" placeholder="Write your message here" ></textarea>
										</div>
										
										{/*------------------- Captcha --------------------*/}
                
				            			<div className="form-group">
			                				{/*<label className="captch-label">Captcha :<span className="REQUIRED_FIELD">*</span></label>*/}
			                				<div className="col-sm-6 no-padding">
			                  					<input type="text" className="form-control" id="txtInput" ref="txtInput" placeholder="Captcha"/> 
			                				</div>
			                				<div className="col-sm-4">   
			                 		 			<input type="text" className="form-control" id="txtCaptcha" ref="txtCaptcha" size="12" />
			                				</div>
			                				<div className="col-sm-2">  
			                  					<span className="captcha-reset" onClick={this.captchaReset.bind(this)}><i className="fa fa-refresh"></i></span>
			                				</div>
				            			</div>
										<button type="submit" name="submit" className="btn btn-main pull-right">Submit</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		)
	}
}