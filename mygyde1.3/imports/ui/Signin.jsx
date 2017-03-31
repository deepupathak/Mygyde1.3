/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';
import { FlowRouter } from 'meteor/kadira:flow-router';

class Signin extends React.Component {
 	handleSignin(event) {
	    event.preventDefault();
	    let emailAddress = ReactDOM.findDOMNode(this.refs.email).value.toLowerCase();
	    let Pass = ReactDOM.findDOMNode(this.refs.password).value;
	    let user = Meteor.users.find({'emails.address': emailAddress}).fetch();
	    if(emailAddress == ""  && Pass == ""){
	      	Bert.alert("Please input EmailID/Password.", "warning", 'growl-top-left');
	    }else if(Meteor.users.find({'emails.address': emailAddress}).count() == 0){
	      	Bert.alert("User doesn't exist.", "danger", 'growl-top-left');
	    }else if(!user[0].emails[0].verified){
	      	if(typeof user[0].services.email.verificationTokens[0] != 'undefined'){
	        	let len = user[0].services.email.verificationTokens.length - 1 ;
	        	let verifyDate = new Date(user[0].services.email.verificationTokens[len].when)
	        	let date = new Date().setDate(new Date().getDate()-1);
	        	if(verifyDate >= date){
	          		// console.log("hiii")
	        	}else{
	          		Meteor.call('expireVerifyLink', emailAddress);
	          		// console.log("bye")
	        	}
	      	}

	      	let ans = window.confirm("Please verify Email Id. Want to send verification link again ?");
	      	if(ans){
	        	Meteor.call('sendVerifcationMail', user[0]._id);
	      	}
	    }else{
	      	Meteor.loginWithPassword(emailAddress, Pass, function(err){
	        	if(err)
	          		Bert.alert("Password is incorrect.", "danger", "growl-top-left");
	          		// window.alert(err)
	        	else if(user[0].profile.mtype == "mentee") {
	          		Meteor.call('active', user[0]._id);
	          		$('#ParentModal').modal('toggle');
	          		FlowRouter.go('MenteeSignIn');
	        	}else{
	          		Meteor.call('active', user[0]._id);
	          		$('#ParentModal').modal('toggle');
	          		FlowRouter.go('mentor',{_id: Meteor.userId()});
	        	}
	      	});
	    }
  	}
  	render(){
    	return(
      		<div>
        		<form role="form" onSubmit={this.handleSignin.bind(this)}>
          			<div className="form-group">
            			<input type="text" className="form-control input-lg " ref="email" placeholder="Email Address" />
          			</div>
          			<div className="form-group">
            			<input type="password" className="form-control input-lg" ref="password" placeholder="Password"/>
          			</div>
          			<div className="form-group">
            			<button type="submit" className="btn btn-primary btn-block">Log In</button>
          			</div>
        		</form>
      		</div>
    	);
  	}  
}

export default createContainer(() => {
  	handle = Meteor.subscribe("MentorsList")
  	let user = Meteor.users.find().fetch();
  	return {
    	isReady: handle.ready(),
    	Mentors: Meteor.users.find({'profile.mtype':'mentor'}).fetch()
  	}
}, Signin);