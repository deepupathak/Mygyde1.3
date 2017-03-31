/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { $ } from 'meteor/jquery';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

class Profile extends React.Component {
  	render(){
    	return(
      		<div className="container">
        		<div className="section-title-block-profile">
          			<h3 className="section-title-profile">Edit Profile</h3>
        		</div>
        		<ul className="nav nav-tabs">
          			<li className="active"><a data-toggle="tab" href="#profileView">Profile</a></li>
          			<li><a data-toggle="tab" href="#passwordView">Change Password</a></li>
          			<li><a data-toggle="tab" href="#deleteProfile">Delete Profile</a></li>
        		</ul>
        		<div className="tab-content">
    
          			{/*-----------------------------------------------------------------------------------------------
                                            Profile tab
          			-----------------------------------------------------------------------------------------------*/}

          			<div id="profileView" className="tab-pane fade in active">
            			<form role="form" className="edit-profile" method="post" onSubmit={this.handleSubmit.bind(this)}>
              				<div className="form-group">
                				<label>First Name: </label>
                				<input type="text" className="form-control" ref="fname" defaultValue={this.props.profile.name} />
              				</div>
              				<div className="form-group">
                				<label>Last Name: </label>
                				<input type="text" className="form-control" ref="lname" defaultValue={this.props.profile.lname} />
              				</div>
              				<div className="mentor-btn">
                				<div className="form-group">
                  					<button type="Submit" className="btn btn-primary pull-left">Update</button>
                				</div>
                				<div className="form-group">  
                  					<button type="reset" className="btn btn-default">Reset</button>
                				</div>
              				</div>
            			</form>
          			</div>

          			{/*-----------------------------------------------------------------------------------------------
                                            Password tab
          			-----------------------------------------------------------------------------------------------*/}
      
          			<div id="passwordView" className="tab-pane fade">
            			<form role="form" onSubmit={this.handleSave.bind(this)}>
              				<div className="form-group">
                				<label>Current Password :<span className="REQUIRED_FIELD">*</span></label>
                				<input type="password" className="form-control" id="current" ref="current" />
                				<p id="message"></p>
              				</div>
              				<div className="form-group">
                				<label>New Password :<span className="REQUIRED_FIELD">*</span></label>
                				<input type="password" className="form-control" id="new" ref="new" />
              				</div>
              				<div className="form-group">
                				<label>Confirm Password :<span className="REQUIRED_FIELD">*</span></label>
                				<input type="password" className="form-control" id="confirm" ref="confirm" />
              				</div>
              				<div className="mentor-btn">
                				<div className="form-group">
                  					<button type="Submit" className="btn btn-primary pull-left">Update</button>
                				</div>
                				<div className="form-group">  
                  					<button type="reset" className="btn btn-default">Reset</button>
                				</div>
              				</div>
            			</form>
          			</div>

          			{/*-----------------------------------------------------------------------------------------------
                                           Delete Profile tab
          			-----------------------------------------------------------------------------------------------*/}
      
          			<div id="deleteProfile" className="tab-pane fade">
            			<form role="form" onSubmit={this.handleDelete.bind(this)}>
              				<div className="form-group">
                				<label>Are you sure you want to delete your profile ?</label><br />
                				<button className="btn btn-primary" type="submit">Delete</button>
              				</div>
            			</form>
          			</div>
        		</div>
      		</div>
    	);
  	}

  	handleDelete(ev){
    	ev.preventDefault();
    	let r = window.confirm("are you sure you want to delete your profile ?");
    	if(r == true){
      		Meteor.call("deleteProfile", Meteor.userId());
      		Meteor.logout();
      		window.location.href="/"
      		window.alert("Profile deleted successfully.")
    	}
  	}

  	handleSubmit(event) {
    	event.preventDefault();
    	let name = ReactDOM.findDOMNode(this.refs.fname).value;
    	let lname = ReactDOM.findDOMNode(this.refs.lname).value;
    	Meteor.call("updateMenteeInfo", Meteor.userId(), name, lname);
    	Bert.alert("Information updated successfully.", "info", 'growl-top-left');
  	}

  	handleSave(ev){
    	ev.preventDefault();
    	let current = ReactDOM.findDOMNode(this.refs.current).value.trim();
    	let newPass = ReactDOM.findDOMNode(this.refs.new).value.trim();
    	let confirm = ReactDOM.findDOMNode(this.refs.confirm).value.trim();
    	if(newPass == ""){
      		Bert.alert("Please input new password again. Blank field or space is not allowed.", "warning", 'growl-top-left')
    	}else if(confirm == ""){
      		Bert.alert("Please input confirm password again. Blank field or space is not allowed.", "warning", 'growl-top-left')
    	}else if(newPass != confirm) {
      		Bert.alert("Password mismatch.", "warning", 'growl-top-left')
    	}else {
      		Accounts.changePassword(current, newPass, function(err){
        		if(err){
          			$("#message").text("Current Password incorrect");
        		}else{
          			$("#message").text(" ");
          			Bert.alert("Password changed successfully.", "info", 'growl-top-left')
          			document.getElementById("current").value = "";
          			document.getElementById("new").value = "";
          			document.getElementById("confirm").value = "";
        		}
      		});
    	}
  	}
}

export default createContainer(() => {
  	let user = Meteor.user();
  	return user;
}, Profile);