/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import { render } from 'react-dom';

/* Import Atmosphere Packages */

import { $ } from 'meteor/jquery';

/* Import Modules */

import Signin from '/imports/ui/Signin.jsx';
import Signup from '/imports/ui/MenteeSignup.jsx';
import RecoverPassword from '/imports/ui/RecoverPassword.jsx';

export default class SignInSignUpModal extends React.Component {
	constructor(props) {
    	super(props);
    	
    	this.state = {
      		form: "signIn"
    	};
	}
	initialize(){
  		this.setState({ 
 	  		form: "signUp" 
  		});
	}

	initialize2(){
  		this.setState({
  			form: "signIn"
  		});
	}

	initialize3(){
  		this.setState({
	  		form: "recover"
  		});
	}
	componentDidUpdate() {
		that = this;
		$('#ParentModal').on('hidden.bs.modal', function (e) {
			e.preventDefault();
			that.setState({
	      		form: "signIn"
	  		});
		});
	}
	render(){
		// console.log(this.state.form,"<-- State value")
		let displayForm;
  		if(this.state.form == 'signIn') {
 	  		displayForm = <Signin />;
	  	}else if(this.state.form == 'signUp') {
	 	  displayForm = <Signup />;
		}else if(this.state.form == 'recover'){
	 	 	displayForm = <RecoverPassword />;
	  	}else{
	  		displayForm = <Signin />;
	  	}
		return(
			<div className="modal" id="ParentModal" role="dialog">
	  			<div className="modal-dialog">
  	  				<div className="modal-content">
    	  				<div className="modal-body">
      	  					<button type="button" className="close" data-dismiss="modal"><span className="glyphicon glyphicon-remove CloseModal"></span></button>
      	  					<div className="logoContainer"><img src="/Logo.png" /></div>
      	  					{ displayForm }
			  			</div>
			  			<div className="modal-footer">
				 	  		{
				 	  			this.state.form == 'signIn' ?
				 	  			<div> 
				 	    			<button className="btn btn-default pull-left NotAMember" id="NotAMember" type="button" onClick={this.initialize.bind(this)}>NOT YET A MEMBER?</button>
						  			<button className="btn btn-default ForgotPassword" type="button" onClick={this.initialize3.bind(this)}>FORGOT PASSWORD?</button>
				 	  			</div> : <button className="btn btn-default BackToLogin" type="button" onClick={this.initialize2.bind(this)}>BACK TO LOGIN</button>
				  			}
  		  				</div>
  	  				</div>
	  			</div>
  			</div>
		)
	}
}