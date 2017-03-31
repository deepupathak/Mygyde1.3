/* Import React, Component, render and ReactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

/* Import Mongo Collections */

import { Images } from '../api/imageCollection.js';
import { Conversation } from '../api/collections.js';

/* Import Modules */

import Fetch_conversation from '../ui/Fetch_conversation.jsx';
import Member from '../ui/Chat_Member.jsx';

class Conversation_page extends React.Component{
  	checkConversation(){
    	that = this;
    	// console.log(this.props,"<<=== this")
    	if(this.props.uid){
      		if(Meteor.users.find({$and: [{_id: this.props.uid},{'profile.mtype': "mentee"}]}).count() != 0){
        		// console.log("mentee-----------")
        		if(Conversation.find({$and: [{receiver: Meteor.userId()},{sender:this.props.uid}]}).count() != 0){
          			// console.log("msz alredy store-----------")
          			return (
            			<div className="chat-input-box">
              				<form role="form" onSubmit={this.submit_chat.bind(this)}>
                				<div className="_chatFooter">
                  					<div className="form-group">
                    					<div className="input-group">
                      						<input type="text" id="messageBox" ref="message" className="form-control" placeholder="Your message here!" required/>
                      						<span className="input-group-btn">
                        						<button className="btn btn-primary" type="submit">Send</button>
                      						</span>
                    					</div>
                  					</div>
                				</div>
              				</form>
            			</div>
          			);
        		}else{
          			return(
            			<div className="chat-input-box">
              				<form role="form" onSubmit={this.submit_chat.bind(this)}>
                				<div className="_chatFooter">
                 	 				<div className="form-group">
                    					<div className="input-group">
                      						<input type="text" id="messageBox" ref="message" className="form-control" placeholder="Can not chat with this Mentee" disabled required />
                      						<span className="input-group-btn">
                        						<button className="btn btn-primary disabled" type="submit">Send</button>
                      						</span>
                    					</div>
                  					</div>
                				</div>
              				</form>
            			</div>
          			);
        		}
      		}else{
        		// console.log(" not mentee-----------")
        		if(Meteor.user().profile.mtype == "mentee"){
          			// console.log(that.data,"========",Meteor.user().profile.mtype)
          			var user = Meteor.users.findOne({_id: this.props.uid});
          			var CountMentee = Conversation.find({receiver: this.props.uid, date: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear()},{sender: 1}).fetch();
          			// console.log("CountMEntee -------->",CountMentee)
          			let mSender =_.pluck(CountMentee, 'sender');
          			// console.log("mSender ------------->",mSender)
          			let count = _.groupBy(mSender);
          			// console.log("count ------------>", count)
          			let countSize = _.size(count)
          			// console.log(user.profile.mentees,"<------- countSize ------>",countSize)

          			var CountMessage = Conversation.find({sender : Meteor.userId(), receiver: this.props.uid, date: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear()},{sender: 0}).fetch();
          			// console.log("CountMessage -------->",CountMessage)
          			let date = _.pluck(CountMessage,'date');
          			// console.log("date ------>",date)
          			let messageSize = _.size(date);
          			// console.log(date,"-----------> REsult -------->",messageSize,"--------->>>")
          			if(messageSize >= user.profile.messages && user.profile.messages != 0){
            			return (
              				<div className="chat-input-box">
                				<form role="form" onSubmit={this.submit_chat.bind(this)}>
                  					<div className="_chatFooter">
                    					<div className="form-group">
                      						<div className="input-group">
                        						<input type="text" id="messageBox" ref="message" className="form-control" placeholder="Your message here!" disabled required/>
                        						<span className="input-group-btn">
                          							<button className="btn btn-primary" type="submit" disabled>Send</button>
                        						</span>
                      						</div>
                      						<p>This mentor has reached the maximum number of messages that he accepts per day. Please send him another message tomorrow. Make sure to include your complete question in the least amount of messages. </p>
                    					</div>
                  					</div>
                				</form>
              				</div>
            			);
          			}else if(countSize >= user.profile.mentees && user.profile.mentees != 0 ){
            			if(messageSize > 0 && messageSize <= user.profile.messages && user.profile.messages != 0){
              				return(
                				<div className="chat-input-box">
                  					<form role="form" onSubmit={this.submit_chat.bind(this)}>
                    					<div className="_chatFooter">
                      						<div className="form-group">
                        						<div className="input-group">
                          							<input type="text" id="messageBox" ref="message" className="form-control" placeholder="Your message here" required/>
                          							<span className="input-group-btn">
                           		 						<button className="btn btn-primary" type="submit">Send</button>
                          							</span>
                        						</div>
                      						</div>
                    					</div>
                  					</form>
                				</div>
              				);
            			}else{
              				return(
                				<div className="chat-input-box">
                  					<form role="form" onSubmit={this.submit_chat.bind(this)}>
                    					<div className="_chatFooter">
                      						<div className="form-group">
                        						<div className="input-group">
                          							<input type="text" id="messageBox" ref="message" className="form-control" placeholder="Mentee limit for this Mentor is finished" disabled required/>
                          							<span className="input-group-btn">
                            							<button className="btn btn-primary" type="submit" disabled>Send</button>
                          							</span>
                        						</div>
                      						</div>
                    					</div>
                  					</form>
                				</div>
              				);
            			}
          			}else{
            			return (
              				<div className="chat-input-box">
                				<form role="form" onSubmit={this.submit_chat.bind(this)}>
                  					<div className="_chatFooter">
                    					<div className="form-group">
                      						<div className="input-group">
                        						<input type="text" id="messageBox" ref="message" className="form-control" placeholder="Your message here" required/>
                        						<span className="input-group-btn">
                          							<button className="btn btn-primary" type="submit">Send</button>
                        						</span>
                      						</div>
                    					</div>
                  					</div>
                				</form>
              				</div>
            			);
         		 	}
        		}else{
          			return(
            			<div className="chat-input-box">
              				<form role="form" onSubmit={this.submit_chat.bind(this)}>
                				<div className="_chatFooter">
                  					<div className="form-group">
                    					<div className="input-group">
                      						<input type="text" id="messageBox" ref="message" className="form-control" placeholder="Your message here" required/>
						                    <span className="input-group-btn">
						                        <button className="btn btn-primary" type="submit">Send</button>
						                    </span>
                    					</div>
                  					</div>
                				</div>
              				</form>
            			</div>
          			);
        		}
      		}
    	}
  	}
  	chatBox(){
    	that = this;
    	if(this.props.receiver){
      		// console.log(this.props.receiver?this.props.receiver.profile.image:[],"====")
      		return(
        		<div>
          			<div className="chat-messages-header">
            			<div className="row">
              				<div className="col-sm-1">
                				{ 	this.props.receiver?this.props.receiver.profile.image? 
                  					this.props.userImage.map(function(img){
                    					return (
                      						<img key={img._id} src={img.url()} className="img-responsive round" id="memImage" alt={that.props.receiver.profile.name} />
                    					)
                  					}):<img src={that.props.receiver.profile.mtype == "mentee" ? "/mentee.png" : "/default.png" } className="img-responsive round" id="memImage" alt={that.props.receiver.profile.name?this.props.receiver.profile.name:''} /> :<img src="/Icon-user.png" className="img-responsive round" id="memImage" alt={this.props.receiver.profile.name?this.props.receiver.profile.name:''} />
                				}
             	 			</div>
              				<div className="col-sm-9">
                				{this.props.receiver?this.props.receiver.profile.name:''} 
                				<p id="receiverName">{this.props.receiver?this.props.receiver.profile.professional_title?this.props.receiver.profile.professional_title +', in '+ this.props.receiver.profile.industry:'':''}</p>
              				</div>
            			</div>
          			</div>
         	 		<Fetch_conversation receiverID={this.props.uid ? this.props.uid : ''}/>
          			{that.checkConversation()}
        		</div>
      		);
    	}else{
      		return <div> No Member Selected </div>
    	}
  	}
  	render() {
	    $(window).scrollTop(0);
	    // console.log(this.props.uid,"<----conversation_page")
	    Session.set("MentorId", this.props.uid);
	    // console.log(Session.get("MentorId"),"<----conversation_page")
	    return (
	      	<div className="container">
	        	<div className="section-title-block-chat">
	          		<h3 className="section-title-chat">Chat With Members</h3>
	        	</div>
	        	<div className="row chat-main-section">
	          		<div className="col-sm-3 no-padding chat-members-section">
	            		<Member activeUser={this.props.uid}/>
	          		</div>
	          		<div className="col-sm-9 no-padding chat-messages-section">
	            		{this.chatBox()}
	          		</div>
	        	</div>
	      	</div>
	    );
  	}
  	submit_chat(event){
	    event.preventDefault();
	    let SenderId = Meteor.userId();
	    let user = Meteor.users.find({_id: SenderId}).fetch();
	    let Message = ReactDOM.findDOMNode(this.refs.message).value.trim();
	    let date = new Date().getDate();
	    let month = new Date().getMonth();
	    let year = new Date().getFullYear();
	    let time = new Date();
	    let ReceiverId = this.props.uid;
	    if(Message != "" ){
      		Meteor.call("send_Message", ReceiverId, Message, date, month, year, time);
      
	      	/*Meteor.call("send_Message", this.props.uid, Message, date, month, year, time,function(err){
	        	if(err){
	          		window.alert(err)
	        	}else{
	          		let v = Conversation.find({sender: SenderId, receiver: ReceiverId, seen: false},{$sort:{time: 1}}).fetch();
	  
	  
	          		// var ReceiverId = this.props.uid;
	          		if(v.length > 1){
	            		// window.alert("hello" + a.emails[0].address + "<-- receiver email" + user[0].profile.name + "<-- user name" + user[0].emails[0].address + "<-- sender email address" + Message + "<-- message");
	            		// console.log(SenderId, ReceiverId, date,"<<------")

	            		// console.log(a.emails[0].address,"<-- receiver email");
	            		// console.log(user[0].profile.name,"<-- user name");
	            		// console.log(user[0].emails[0].address,"<-- sender email address");
	            		// console.log(Message,"<-- message");
	            
	            		// console.log(new Date(v[v.length-1].time).getMinutes()," ------- ", new Date(v[v.length-2].time).getMinutes(),"__________________",new Date(v[v.length-1].time).getHours() -new Date(v[v.length-2].time).getHours())

	            		let diff = new Date(v[v.length-1].time).getHours() -new Date(v[v.length-2].time).getHours();

	            		if(diff == 1){
	              			if(new Date(v[v.length-1].time).getMinutes() >= new Date(v[v.length-2].time).getMinutes()){
	                			// console.log("1st condition true")
	                			Meteor.call("sendEmail", a.emails[0].address, user[0].profile.name, user[0].emails[0].address, Message);
	              			}
	            		}else if(diff > 1){
			              	// console.log("2nd condition true")
			              	Meteor.call("sendEmail", a.emails[0].address, user[0].profile.name, user[0].emails[0].address, Message);
	            		}
	          		}else if(v.length == 1){
	            		Meteor.call("sendEmail", a.emails[0].address, user[0].profile.name, user[0].emails[0].address, Message);   
	         		}
	        	}
	      	});*/
      		ReactDOM.findDOMNode(this.refs.message).value = "";
    	}else{
			ReactDOM.findDOMNode(this.refs.message).value = "";
			document.getElementById('messageBox').focus();
    	}
  	}
}

export default createContainer(() => {
	// console.log(Session.get("MentorId"),"<<>>")
	if(Session.get("MentorId")){
	    handle = Meteor.subscribe("message", Session.get("MentorId"));
	    Meteor.subscribe("MyImage");
	    Meteor.subscribe("Count");
	    let user = Meteor.users.findOne({_id: Session.get("MentorId")});
	    return {
		    isReady: handle.ready(),
		    Chat: Conversation.find().fetch(),
		    userImage: user?Images.find({_id: user.profile.image}).fetch():[],
		    receiver: Meteor.users.find({_id: Session.get("MentorId")}).fetch()[0]
	    }
  	}else{
    	return{
      		isReady:true
    	}
  	}
}, Conversation_page);