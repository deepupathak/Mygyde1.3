/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { $ } from 'meteor/jquery';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

/* Import mongo Collections */

import { Conversation } from '../api/collections.js';

/* Import Modules */

import SignInSignUpModal from '../ui/SignInSignUpModal.jsx';

class SignInSignUpLink extends React.Component {

    checkNotification(){
        var count = Conversation.find({ receiver: Meteor.userId(), seen: false }).count();
        return (count > 0 ?<div id="notification">{count} </div>: "" );
    }

    logOut(){
        var id = Meteor.userId();
        Accounts.logout(function(err){
            if(err){
                Bert.alert("Error while logout.", "danger", 'growl-top-left')
            }else{
                Meteor.call('inactive', id, function(){
                    window.location.href="/";   
                });
            }
        });
    }

    callModal() {
  	    // console.log($('#ParentModal'))
        $('#ParentModal').modal('show');

        if (screen.width < 768) {
            $('button.navbar-toggle').click();
        }
    }

    render(){
        let renderContent;
        if(Meteor.user()){
            renderContent = <li>
                { Meteor.user().profile.name }
            </li>;
        }else{
            renderContent = <li className="loginsignup"><a data-toggle="modal" onClick={this.callModal}>LogIn/SignUp</a></li>;
        }
        return renderContent;
    }
}

export default createContainer(() => {
    Meteor.subscribe("notification", Meteor.userId());
    return {
        Chat: Conversation.find({receiver: Meteor.userId()}).fetch(),
    };
}, SignInSignUpLink);