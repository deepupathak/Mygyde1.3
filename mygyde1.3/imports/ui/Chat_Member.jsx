/* Import React, Component, render and ReactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

/* Import Mongo Collections */

import { Images } from '../api/imageCollection.js';
import { Conversation } from '../api/collections.js';
import { Online } from '../api/collections.js';

class Member extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			chatListType:"mentor",
		};
	}
	startChat(e){
		//console.log(this)
		FlowRouter.go('Conversation',{id:e.target.attributes['data-id'].nodeValue})
		//console.log('id:',e.target.attributes['data-id'].nodeValue);
		//FlowRouter.setParams({id:e.target.attributes['data-id'].nodeValue});
	}
	getMembers(memberType){
		let members= _.filter(this.props.users, function(user){ return user.profile.mtype == memberType; });
		let userImage = _.filter(this.props.users, function(user){ return Images.find({_id: user.profile.image}).fetch(); });
		return(
		  	<ul className="chat-members-list">
		    {
		      	members.map(function(member){
		        	// console.log(member,'<==== Member')
		        	return(
			          	<div key={member._id}>
			            	<ImageListContainer member = {member} active = {that.props.activeUser}/>
			          	</div>
		        	)
		      	})
		    }
		  	</ul>
		)
	}
	changeMembersList(listType){
		this.setState({ chatListType:listType });
	}
	reach(){
		if(Meteor.user()){
			// console.log("mentee---------",Meteor.user().profile.mtype,"----------mentor")  
			if(Meteor.user().profile.mtype == "mentee"){
			    // console.log("mentee-------------------")
			    return (
			      <div className="chat-list-control row">
			        <p id="btnSize" className={this.state.chatListType=="mentor"?"btn btn-primary col-sm-6":"btn col-sm-6"} >Mentors</p>
			      </div>
			    )
			}else{
			    // console.log("mentor-------------------")
			    return(
				    <div className="chat-list-control row">
				        <button className={this.state.chatListType=="mentor"?"btn btn-primary col-sm-6":"btn col-sm-6"} onClick={()=>this.changeMembersList('mentor')}>Mentors</button>
				        <button className={this.state.chatListType=="mentee"?"btn btn-primary col-sm-6":"btn col-sm-6"} onClick={()=>this.changeMembersList('mentee')}>Mentees</button>
				    </div>
			    )
			}
		}
	}
	render() {
		that=this;
		// console.log(this.props.users,'<-------State');
		// console.log(this.props.users,'<-------Users');
		return(
			<section>
				{this.reach()}
				{this.getMembers(this.state.chatListType)}
			</section>
		)
	}
}

export default createContainer(() => {
	handle = Meteor.subscribe("MentorsList")
	Meteor.subscribe("Chat");
	return{
		isReady: handle.ready(),
		currnetUSer: Meteor.user(),
		users: Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch(),
	}
}, Member);


class ImageList extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
		  	chatListType:"mentor",
		};
	}
	url_has_protocol(url){
		let pattern = /^((http|https):\/\/)/;
		if(url && !pattern.test(url)) {
		  	url = "http://" + url;
		}
		return url;
	}
	startChat(e){
		// console.log('Fire',this)
		// Meteor.call("messageSeen",Meteor.userId(),e.target.attributes['data-id'].nodeValue);
		FlowRouter.go('Conversation',{id: e.target.attributes['data-id'].nodeValue});
		// console.log('id:',e.target.attributes['data-id'].nodeValue);
		//FlowRouter.setParams({id:e.target.attributes['data-id'].nodeValue});
	}
	checkOnline(id){
		// console.log(id,"------------------------member id")
		// console.log(Online.find({user: id}).count(),"----------------------online")
		if(Online.find({user: id}).count() != 0){
			return (
				<span className="" >
					<i id="onlineImage" className="fa fa-circle" aria-hidden="true"></i>
				</span>
			)
		}
	}
	lastMessageDisplay(){
		let lastMessage = Conversation.find({$or: [{sender: Meteor.userId(), receiver: this.props.member._id},{sender: this.props.member._id, receiver: Meteor.userId()}]}).count() != 0  ? Conversation.findOne({$or: [{sender: Meteor.userId(), receiver: this.props.member._id},{sender: this.props.member._id, receiver: Meteor.userId()}]},{sort:{time: -1},limit: 1}) : null;
		let messsageShow = "";
		if(lastMessage){
			if (lastMessage.message.length > 25)
				messsageShow = lastMessage.message.substring(0,25) + '...';
			else
				messsageShow = lastMessage.message;
		}
		if(Conversation.find({$or: [{sender: Meteor.userId(), receiver: this.props.member._id},{sender: this.props.member._id, receiver: Meteor.userId()}]},{sort:{time: -1},limit: 1}).count() != 0){
			let date = new Date(lastMessage.time);
			return(
				<div>
					<p className="lstMsz pull-left" data-id={this.props.member._id} onClick={this.startChat}>{lastMessage.sender == Meteor.userId() ? "YOU:  " + messsageShow : messsageShow} </p>
					<br/>
					<p className="lstMszTime pull-right" data-id={this.props.member._id} onClick={this.startChat}>{ date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear()} </p>
				</div>
			);
		}else{
			return <div></div>
		}
	}
	render(){
		let count = Conversation.find({receiver: Meteor.userId(), sender: this.props.member._id, seen: false}).count();
		that = this
		return(
			<li key={that.props.member._id}>
				<div className="mem" className={that.props.active == that.props.member._id ? "member-span active":"member-span"}>
		  			<div data-id={that.props.member._id} onClick={that.startChat.bind(this)}>
		    			{ 	that.props.member.profile.image ? 
		      				this.props.images.map(function(img){
		        				return (
		          					<img data-id={that.props.member._id} key={img._id} src={img.url()} className=" pull-left round" id="memImage" alt={that.props.member.profile.name} data-id={that.props.member._id} />
		        				)
		      				}):<img src={that.props.member.profile.mtype == "mentee" ? "/mentee.png" : "/default.png" } className=" pull-left img-responsive round" id="memImage" alt={that.props.member.profile.name} data-id={this.props.member._id} />
		    			}
			    		<div className="pull-right">
			      			{count != 0 ?<span className="badge"> {count} </span> :""} {this.checkOnline(that.props.member._id)}
			    		</div>
		  			</div>
			  		<div className="mem" data-id={that.props.member._id} onClick={that.startChat.bind(this)}>
			    		{that.props.member.profile.name}
			  		</div>
		  			{this.lastMessageDisplay()} 
				</div>
			</li>
		)
	}
}

ImageListContainer = createContainer(({member}) => {
	// console.log(member,">>>> chat list member <<<<", member._id)
	handle = Meteor.subscribe("MyImage");
	Meteor.subscribe("OnlineUser");
	Meteor.subscribe('conversation', Meteor.userId(), member._id);
	let user = Meteor.users.find({_id: member._id}).fetch();
	// console.log(user,"<<<<<<")
	return {
		isReady: handle.ready(),
		images: user?Images.find({_id: member.profile.image}).fetch():[],
		online: Online.find().fetch()
	}
}, ImageList);