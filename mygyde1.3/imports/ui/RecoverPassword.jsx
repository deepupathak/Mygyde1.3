/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { $ } from 'meteor/jquery';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

export default class RecoverPassword extends React.Component {
    render(){
        return(
            <div className="row">
                <div className="col-xs-12">
                    <h4 className="page-header">Recover Password</h4>
                    <form id="recover-password" className="recover-password" onSubmit={this.handleSubmit.bind(this)}>
                        <p className="alert alert-info">Enter your email address below to receive a link to reset your password.</p>
                        <div className="form-group">
                            <label>Email Address :<span className="REQUIRED_FIELD">*</span></label>
                            <input type="email" id="emailAddress" name="emailAddress" ref="emailAddress" className="form-control" placeholder="Email Address" required/>
                            <p id="message"></p>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success">Recover Password </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    handleSubmit(event) {
        event.preventDefault();
        Accounts.forgotPassword({email: ReactDOM.findDOMNode(this.refs.emailAddress).value}, function(err){
            if (err){
                $('#message').text('Password reset Error');
            }else {
                $('#message').text(' ');
                Bert.alert("Passwrd reset link sent successfully. Please check your email.", "info", 'growl-top-left')
                $('#ParentModal').modal('toggle');
                document.getElementById("emailAddress").value = "";
            }
        });
    }
}