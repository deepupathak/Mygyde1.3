/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Import Mongo Collections */

import { Conversation } from '../api/collections.js';
import { Images } from '../api/imageCollection.js';

/* Import Modules */

import SignInSignUpLink from '../ui/SignInSignUpLink.jsx';
import SignInSignUpModal from '../ui/SignInSignUpModal.jsx';
import MentorsSearch from '../ui/MentorsSearch.jsx';

class Header extends React.Component {
	
	checkNotification(){
	  	let count = Conversation.find({receiver: Meteor.userId(), seen: false}).count();
	  	// console.log(count,"-------------==count")
	  	return (count > 0 ?<div id="notification">{count} </div>: "" );
  	}

	logOut(){
	  	let id = Meteor.userId();
	  	Accounts.logout(function(err){
	  		if(err){
	    		Bert.alert("Error while logout.", "danger", "growl-top-left")
	    		// window.alert(err)
	  		}else{
	   	 		Meteor.call('inactive', id, function(){
	      			window.location.href = "/";   
	    		});  
	  		}
	  	});
	}

	hideMenu() {
		if (screen.width < 768) {
			$('button.navbar-toggle').click();
		}
	}

	render(){
		let headerContent;
		// console.log(this.props,"<<--- header props")
		if(this.props.User){
			if(this.props.User.profile.mtype == "mentor"){

				/*------------------------------------------ Navigation bar for Mentor User --------------------------------*/
			  
			  	headerContent = <header id="main-header">
					<nav className="navbar navbar-default navbar-fixed-top" id="n-main-nav" role="navigation">
						<div className="container">
						  	{/* Brand and toggle get grouped for better mobile display */}
						  	<div className="navbar-header">
						    	<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#n-navbar" aria-expanded="false">
					      		<span className="sr-only">Toggle navigation</span>
					      		<span className="icon-bar"></span>
					      		<span className="icon-bar"></span>
					      		<span className="icon-bar"></span>
						    	</button>
								{/* NAVBAR BRAND */}
						    	<a href={FlowRouter.path('home')}><img src="/Logo.png" className="img-responsive" /></a>
							</div> {/* .navbar-header ends */}
							{/* Collect the nav links, forms, and other content for toggling */}
						  	<div className="collapse navbar-collapse" id="n-navbar">
							  	{/* main menu starts here */}
							  	<ul className="nav navbar-nav navbar-right">
							    	<li id="welcome"><a>Welcome {Meteor.user().profile.name}</a></li>
							    	<li><a onClick={this.hideMenu.bind(this)} data-scroll href={FlowRouter.path('mentor',{_id:Meteor.userId()})}>Home<span className="sr-only">(current)</span></a></li>
							    	<li><a onClick={this.hideMenu.bind(this)} data-scroll href="/conversation"><span className="pull-left">Messages</span><span className="pull-right">{this.checkNotification()}</span><span className="clearfix"></span></a></li>
							    	<li><a onClick={this.hideMenu.bind(this)} data-scroll href="/profile">Edit Profile</a></li>
							    	<li><a onClick={this.hideMenu.bind(this)} data-scroll href="" onClick={this.logOut.bind(this)}>Logout</a></li>
							  	</ul>{/*main menu ends here */}						      
						  	</div>{/* .navbar-collapse ends */}
						</div>{/* .container-fluid ends */}
					</nav> {/* .navbar .navbar-defaults ends */}
				</header>
			}else if(this.props.User.profile.mtype == "mentee"){

				/*------------------------------------------ Navigation bar for Mentee User --------------------------------*/
			  
				headerContent = <header id="main-header">
					<nav className="navbar navbar-default navbar-fixed-top" id="n-main-nav" role="navigation">
						<div className="container">
              				<MentorsSearch />

						  	{/* Brand and toggle get grouped for better mobile display */}
						  	<div className="navbar-header">
					    		<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#n-navbar" aria-expanded="false">
						     	 	<span className="sr-only">Toggle navigation</span>
						      		<span className="icon-bar"></span>
						      		<span className="icon-bar"></span>
						      		<span className="icon-bar"></span>
					    		</button>
								{/* NAVBAR BRAND */}
					    		<a href={FlowRouter.path('home')}><img src="/Logo.png" className="img-responsive" /></a>
							</div> {/* .navbar-header ends */}
							{/* Collect the nav links, forms, and other content for toggling */}
					  		<div className="collapse navbar-collapse" id="n-navbar">
						  		{/* main menu starts here */}
							  	<ul className="nav navbar-nav navbar-right">
							    	<li id="welcome"><a>Welcome {Meteor.user().profile.name}</a></li>
							    	<li><a onClick={this.hideMenu.bind(this)} data-scroll href="/MenteeSignIn">Our Mentors<span className="sr-only">(current)</span></a></li>
							    	<li><a onClick={this.hideMenu.bind(this)} data-scroll href="/conversation"><span className="pull-left">Messages</span> <span className="pull-right">{this.checkNotification()}</span><span className="clearfix"></span></a></li>
							    	<li><a onClick={this.hideMenu.bind(this)} data-scroll href="/profile">Edit Profile</a></li>
							    	<li><a onClick={this.hideMenu.bind(this)} data-scroll href="" onClick={this.logOut.bind(this)}>Logout</a></li>
							    </ul>{/*main menu ends here */}						      
					  		</div>{/* .navbar-collapse ends */}
						</div>{/* .container-fluid ends */}
					</nav> {/* .navbar .navbar-defaults ends */}
				</header>
			}
		}else{

			/*------------------------------------------ Navigation bar for Public User ---------------------------------*/
			  
			headerContent = <header id="main-header">
				<nav className="navbar navbar-default navbar-fixed-top" id="n-main-nav" role="navigation">
					<div className="container">
						<MentorsSearch />
					  	
				  		{/* Brand and toggle get grouped for better mobile display */}
				  		<div className="navbar-header">
						    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#n-navbar" aria-expanded="false">
						      	<span className="sr-only">Toggle navigation</span>
						      	<span className="icon-bar"></span>
						      	<span className="icon-bar"></span>
						      	<span className="icon-bar"></span>
						    </button>
							{/* NAVBAR BRAND */}
				    		<a href={FlowRouter.path('home')}><img src="/Logo.png" className="img-responsive" /></a>
						</div> {/* .navbar-header ends */}
						{/* Collect the nav links, forms, and other content for toggling */}
				  		<div className="collapse navbar-collapse" id="n-navbar">
					  		{/* main menu starts here */}
					  		<ul className="nav navbar-nav navbar-right">
						    	<li className="active"><a onClick={this.hideMenu.bind(this)} data-scroll href={FlowRouter.getRouteName()=='home'?"#main-header":FlowRouter.path('home')}>Home <span className="sr-only">(current)</span></a></li>
			          			<li className="hidden-sm"><a onClick={this.hideMenu.bind(this)} data-scroll href={FlowRouter.getRouteName()=='home'?"#our-story":FlowRouter.path('home')}>Our Story</a></li>
						    	<li><a onClick={this.hideMenu.bind(this)} data-scroll href={FlowRouter.getRouteName()=='home'?"#become-a-mentor":FlowRouter.path('home')}>Become a Mentor</a></li>
	          					<li><a onClick={this.hideMenu.bind(this)} data-scroll href={FlowRouter.getRouteName()=='home'?"#our-mentors":FlowRouter.path('home')}>Our Mentors</a></li>
	          					<li><a onClick={this.hideMenu.bind(this)} data-scroll href={FlowRouter.getRouteName()=='home'?"#contact-us":FlowRouter.path('home')}>Contact</a></li>
						    	<SignInSignUpLink />
					  		</ul>{/*main menu ends here */}						      
				  		</div>{/* .navbar-collapse ends */}
					</div>{/* .container-fluid ends */}
				</nav> {/* .navbar .navbar-defaults ends */}
			</header>
		}
		
  		return headerContent;
	}
}

export default createContainer(() => {
	Meteor.subscribe("notification", Meteor.userId());
	// let users = Meteor.users.find({_id: Meteor.userId()}).fetch();
	return {
		Chat: Conversation.find({receiver: Meteor.userId()}).fetch(),
		User: Meteor.user(),
		// images: users != []?Images.find({_id: users.profile.image, "profile.mtype":"mentor"}).fetch():[]
	};
}, Header);