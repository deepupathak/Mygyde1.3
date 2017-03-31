/* Import React, Component, render and ReactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { Session } from 'meteor/session';

/* Import Mongo Collections */

import { Images } from '../api/imageCollection.js';
import { Conversation } from '../api/collections.js';


class Fetch_conversation extends React.Component{
	componentDidUpdate(){ 
 		//  $("#lastMessage").scrollBottom($("#lastMessage")[0].scrollHeight);
 		//  $('#lastMessage')[0].scrollIntoView();
 		let chatContainer =$('.chat-messages-box');
	  	chatContainer.animate({scrollTop: chatContainer[0].scrollHeight}, 1000);
	  	Meteor.call("messageSeen", Meteor.userId(), this.props.receiverID);
	}
	render(){
	  	// console.log(this.props.receiverID,"*****")
	  	// console.log(this.props,"<<--------------------")
	    Session.set("ReceiverId", this.props.receiverID);
	    that = this;
	  	those = this;
  		return(
      		<div>
      			<div id="lastMessage"></div>
      			<section>
        			<div className="chat-messages-box">
          			{
            			this.props.Chat.map(function(message){
              				date = new Date(message.time)
              				return(
                				<div className="media-dd1" key={message._id}>
                    				<div className={message.sender != that.props.sender._id?"pull-left receiver-body receiverColor chatMessage":" pull-right sender-body senderColor chatMessage"}>
                      					<br/>
                      					<div className="row">
                        					<div className="chat-left pull-left">
                          						<div className="message-header-one">
                            						{	that.props.sender._id==message.sender? 
                              							that.props.sender.profile.image? 
                              							that.props.senderImage.map(function(img){
                                							return (
                                  								<img key={img._id} src={img.url()} className="img-responsive round" id="memImage" alt={those.props.sender.profile.name} />
                                							)
                              							}):<img src={that.props.sender.profile.mtype == "mentee" ? "/mentee.png" : "/default.png" } className="img-responsive round" id="memImage" alt={that.props.sender.profile.name?that.props.sender.profile.name:''} /> 
                              							:that.props.receiver.profile.image? 
                              							that.props.receiverImage.map(function(img){
                                						return(
                                  							<img key={img._id} src={img.url()} className="img-responsive round" id="memImage" alt={those.props.receiver.profile.name} />
                                						)
                              							}):<img src={that.props.receiver.profile.mtype == "mentee" ? "/mentee.png" : "/default.png" } className="img-responsive round" id="memImage" alt={that.props.receiver.profile.name?that.props.receiver.profile.name:''} /> 
                            						}
                          						</div>
                        					</div>
                        					<div className="chat-right">
                          						<div className="message-header">
                            						<h5> {that.props.sender._id==message.sender ? that.props.sender.profile.name:that.props.receiver.profile.name} </h5>
                          						</div>
                          						<div className="message-content msz-break">
                            						{message.message}
                          						</div>
											</div>
                      					</div>
                      					<div className="pull-right messageDate">{date.toString().substring(4,21)}</div>
									</div> 
								</div>
              				)
            			})
          			}
          			</div>
      			</section>
      		</div>
    	);
  	}
}

export default createContainer(() => {
	handle = Meteor.subscribe('conversation', Meteor.userId(), Session.get("ReceiverId"));
	Meteor.subscribe("MyImage");
	let senderUser = Meteor.user();
	let receiverUser = Meteor.users.findOne(Session.get("ReceiverId"));
  	return {
	    isReady: handle.ready(),
	    Chat: Conversation.find({$or: [{sender: Meteor.userId(), receiver: Session.get("ReceiverId")},{sender: Session.get("ReceiverId"), receiver: Meteor.userId()}]},{sort:{time: 1}}).fetch(),
	    senderImage: senderUser?Images.find({_id: senderUser.profile.image}).fetch():[],
	    receiverImage: receiverUser?Images.find({_id: receiverUser.profile.image}).fetch():[],
	    sender: Meteor.user(),
	    receiver: Meteor.users.findOne(Session.get("ReceiverId"))
  	}
}, Fetch_conversation);