/* Import React, Component, PropTypes, render and reactDOM */

import React, { Component, PropTypes } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { Session } from 'meteor/session';

/* Import Mongo Collections */

import { Online } from '../api/collections.js';
import { Conversation } from '../api/collections.js';
import { Images } from '../api/imageCollection.js';

class MentorHome extends React.Component {
	url_has_protocol(url){
	  	var pattern = /^((http|https):\/\/)/;
	  	if(url && !pattern.test(url)) {
	      	url = "http://" + url;
	  	}
	  	return url;
	}
	getAnswer(event){
	  	event.preventDefault();
	  	let mess = ReactDOM.findDOMNode(this.refs.messageContent).value.trim();
	    // console.log(mess,"<<---------mesage")
	  	if(Meteor.user() == null){
	  		$('#ParentModal').modal('show');
	  		$('#NotAMember').trigger('click');
	  	}else if(mess == ""){
	    	Bert.alert("Please input message.", "warning", 'growl-top-left')
	  	}else{
	  		Meteor.call("send_Message", this.props.id, mess);
	  		FlowRouter.go('Conversation',{id: this.props.id});
  		}
	}
	reach(){
		// console.log("Inside reach() function");
  		if(Meteor.user()){
  			if(Meteor.user().profile.mtype == "mentee"){
    			return (
    				<li id="reachoutTab" role="presentation">
      					<a href="#reachOut" aria-controls="reachOut" role="tab" data-toggle="tab">Reach Out</a>
    				</li>
    			)
  			}else{
    			return(<div></div>)
  			} 
  		}else{
  			return(
    			<li id="reachoutTab" role="presentation">
      				<a href="#reachOut" aria-controls="reachOut" role="tab" data-toggle="tab">Reach Out</a>
    			</li>
  			)
  		}
	}
	checkOnline(id){
	  	if(Online.find({user: id}).count() != 0){
	    	return (
	      		<span>
	      			<i className="fa fa-circle Online" aria-hidden="true">&nbsp;Online</i>
	    		</span>
	    	)
	  	}else{
	    	return (
	    		<span>
	      			<i className="fa fa-circle Offline" aria-hidden="true">&nbsp;Offline</i>
	    		</span>
	    	)
	  	}
	}
	componentDidUpdate(){
  		if(Meteor.user()){
  			if(Meteor.user().profile.mtype == "mentor"){
        		$('#interviewTab').attr('class','active');
    			$('#Interviewquestion').attr('class','active');
    			$('#reachoutTab').css('display','none');
    			$('#reachOut').css('display','none'); 
  			}else if(Meteor.user().profile.mtype == "mentee"){
        		$('#reachoutTab').attr('class','active');
    			$('#reachOut').attr('class','active');

	    		$('#interviewTab').click(function() {
	      		$('#GetAnswer').css('display','none');
	    			$('#answerButton').css('display','none');
	    		});

	    		$('#reachoutTab').click(function() {
	      		$('#GetAnswer').css('display','block');
	    			$('#answerButton').css('display','block');
	    		});
  			}
  		}else{

	  		$('#reachoutTab').attr('class','active');
	  		$('#reachOut').attr('class','active');


	  		$('#interviewTab').click(function() {
	    		$('#GetAnswer').css('display','none');
	    		$('#answerButton').css('display','none');
	  		});

	  		$('#reachoutTab').click(function() {
	    		$('#GetAnswer').css('display','block');
	    		$('#answerButton').css('display','block');
	  		});
	  	}
	}
  	reachOutMentor(){
  		if(Meteor.user()){
			// console.log(this.props.id,"========",Meteor.user().profile.mtype)
			let mentorDetail = Meteor.users.findOne({_id: this.props.id});
			let CountMentee = Conversation.find({receiver: this.props.id, date: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear()},{sender: 1}).fetch();
			let mSender =_.pluck(CountMentee, 'sender');
			let count = _.groupBy(mSender);
			let countSize = _.size(count)

			let CountMessage = Conversation.find({sender : Meteor.userId(), receiver: this.props.id, date: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear()},{sender: 0}).fetch();
			let date = _.pluck(CountMessage,'date');
				
			let messageSize = _.size(date);
				
			if(messageSize >= mentorDetail.profile.messages && mentorDetail.profile.messages != 0){
		  		// console.log("------------------ messages finish")
      			return (
        			<div>
            			<form role="form">
      						<div className="form-group" id="GetAnswer">
        						<label className="customLabel">Ask a question and Initiate the conversation.</label>
        						<div className="pull-right">
            						{this.checkOnline(this.props.id).bind(this)}
        						</div>
        						<textarea rows="6" cols="45" ref="messageContent" className="form-control textAreaContent" placeholder="This mentor has reached the maximum number of messages that he accepts per day. Please send him another message tomorrow. Make sure to include your complete question in the least amount of messages. " disabled required />
      						</div>
      						<div className="form-group">
        						<button type="submit" id="answerButton" className="btn btn-default pull-right" onClick={this.getAnswer.bind(this)} disabled>Get an Answer</button>
      						</div>
    			  		</form>
        			</div>
    	  		);
      		}else if(countSize >= mentorDetail.profile.mentees && mentorDetail.profile.mentees != 0){
      			// console.log("------------------ mentees ")
        		if(messageSize > 0 && messageSize <= mentorDetail.profile.messages && mentorDetail.profile.messages != 0){
          			// console.log("------------------mentee's messages ")
          			return (
            			<div>
              				<form role="form">
          						<div className="form-group" id="GetAnswer">
            						<label className="customLabel">Ask a question and Initiate the conversation.</label>
            						<div className="pull-right">
                						{this.checkOnline(this.props.id).bind(this)}
            						</div>
            						<textarea rows="6" cols="45" ref="messageContent" className="form-control textAreaContent" placeholder="Please write your question here." required />
          						</div>
          						<div className="form-group">
            						<button type="submit" id="answerButton" className="btn btn-default pull-right" onClick={this.getAnswer.bind(this)}>Get an Answer</button>
          						</div>
        					</form>
            			</div>
          			);
        		}else{
          			// console.log("------------------ mentees / messages finish")
          			return(
            			<div>
              				<form role="form">
              					<div className="form-group" id="GetAnswer">
                					<label className="customLabel">Ask a question and Initiate the conversation.</label>
                					<div className="pull-right">
                    					{this.checkOnline(this.props.id)}
                					</div>
                					<textarea rows="6" cols="45" ref="messageContent" className="form-control textAreaContent" placeholder=" Mentee limit for this Mentor is finished " disabled required />
              					</div>
              					<div className="form-group">
                					<button type="submit" id="answerButton" className="btn btn-default pull-right" onClick={this.getAnswer.bind(this)} disabled>Get an Answer</button>
              					</div>
            				</form>
            			</div>
          			);
        		}
      		}else{
        		// console.log("------------------ all ok")
        		return (
          			<div>
            			<form role="form">
            				<div className="form-group" id="GetAnswer">
              					<label className="customLabel">Ask a question and Initiate the conversation.</label>
              					<div className="pull-right">
                  					{this.checkOnline(this.props.id)}
              					</div>
              					<textarea rows="6" cols="45" ref="messageContent" className="form-control textAreaContent" placeholder="Please write your question here." required />
            				</div>
            				<div className="form-group">
              					<button type="submit" id="answerButton" className="btn btn-default pull-right" onClick={this.getAnswer.bind(this)}>Get an Answer</button>
            				</div>
          				</form>
          			</div>
        		); 
      		}
    	}else{
    		return(
        		<div>
          			<form role="form">
          				<div className="form-group" id="GetAnswer">
            				<label className="customLabel">Ask a question and Initiate the conversation.</label>
        					<div className="pull-right">
            					{this.checkOnline(this.props.id)}
        					</div>
        					<textarea rows="6" cols="45" ref="messageContent" className="form-control textAreaContent" placeholder="Please write your question here." required />
          				</div>
          				<div className="form-group">
            				<button type="submit" id="answerButton" className="btn btn-default pull-right" onClick={this.getAnswer.bind(this)}>Get an Answer</button>
          				</div>
        			</form>
        		</div>
      		);
  		}
  	}
	render(){
		that = this;
		$(window).scrollTop(0);
		// console.log(this.props.id,"<-- props id")
		let user = Meteor.users.findOne({_id: this.props.id});
    	Session.set("propsId", this.props.id);
		return(
			<section className="tab-section section-block" id="mentHome">
		    	<div className="container">
			    	<div className="row">
			      		<div className="col-md-12 tab-block tab-style-1">
			        		<div className="tab-wrap">
			          			<div className="section-title-block">
			            			<h3 className="section-title">Mentor Home</h3>
			          			</div>
								<section className="section-block team-members" >
			            			<div className="row members">
			              				<div className="col-md-6 member-block">
			                				<div className="member-content" >
			                  					<figure>
			                    					{ 	user.profile.image?
														this.props.images.map(function(img){
	                  										return (
	                    										<div key={img._id}>
	                      											<img src={user.profile.image != ""?img.url():"/default.png"} className="img-responsive" alt="Invalid Image" />
	                    										</div>
	                  										)
					                  					}):<img src="/default.png" className="img-responsive" />
					                  					/*<img src="/default.png" className="img-responsive" />*/
				                  					}
			                    					<figcaption>
			                      						<div className="social-links">
															{user.profile.facebook?<div className="icon-block"><a href={this.url_has_protocol(user.profile.facebook)} target="_blank"><span className="icon ion-social-facebook"></span></a></div>:''}
						                  					{user.profile.twitter ?<div className="icon-block"><a href={this.url_has_protocol(user.profile.twitter)} target="_blank"><span className="icon ion-social-twitter"></span></a></div>:''}
						                  					{user.profile.linkedin ?<div className="icon-block"><a href={this.url_has_protocol(user.profile.linkedin)} target="_blank"><span className="icon ion-social-linkedin"></span></a></div>:''}
                  										</div>
			                      						<div className="member-info">
			                        						<h4>{user.profile.name}</h4>
			                        						<h5>{user.profile.professional_title} in {user.profile.city}, {user.profile.country} </h5>
			                      						</div>
			                    					</figcaption>
			                  					</figure>
			                  					<p className="member-ExpEdu">
						              				<b>About Me</b> <br/> <span className="Exp">{user.profile.experience}</span><br />
						              				<b>Experience Highlights</b> <br /> <span className="Edu">{user.profile.education}</span>
              									</p>
			                				</div>
			              				</div>
                          				<div className="col-md-6">
			            					<ul className="nav nav-tabs" id="tabs" role="tablist">
			            						{that.reach()}
			              						<li role="presentation" id="interviewTab"><a href="#Interviewquestion" aria-controls="Interviewquestion" role="tab" data-toggle="tab">Interview</a></li>
			            					</ul>
			            					<div className="tab-content">
			              						<div role="tabpanel" className="tab-pane" id="Interviewquestion">
			                						<div className="tab-content-wrap">
									        			<h2>Interview</h2>
								        				<form role="form">
		                  									<div className="form-group">
           														<label>1. Pick an experience that you’d like to share with everyone. </label>
           														<p className="break">{user.profile.question1}</p>
         													</div>
				         									<div className="form-group">
				           										<label>2. What are the biggest lessons you learned in life? </label>
				           										<p className="break">{user.profile.question2}</p>
				         									</div>
				         									<div className="form-group">
				           										<label>3. What do you know now that you didn’t know before? </label>
				           										<p className="break">{user.profile.question3}</p>
				         									</div>
				         									<div className="form-group">
				           										<label>4. What are the biggest challenges that you ran into? </label>
				           										<p className="break">{user.profile.question4}</p>
				         									</div>
				         									<div className="form-group">
				           										<label>5. What steps have you taken that helped you land your present job? </label>
				           										<p className="break">{user.profile.question5}</p>
				         									</div>
				         									<div className="form-group">
				           										<label>6. If you could go back in time, what would you do differently? </label>
				           										<p className="break">{user.profile.question6}</p>
				         									</div>
		                  								</form>
			                						</div>
			              						</div>
			              						<div role="tabpanel" className="tab-pane" id="reachOut">
			              							{that.reachOutMentor()}
			             	 					</div>
			            					</div>
										</div>
                  					</div>
			        			</section>
		        			</div>
						</div>
	    			</div>
				</div>
			</section>
		)
	}
}

export default createContainer(() => {
	handle = Meteor.subscribe("MentorsList");
	handle_image = Meteor.subscribe("ImageFile");
	Meteor.subscribe("OnlineUser");
	Meteor.subscribe("Chat");
	let user = Meteor.users.findOne({_id: Session.get("propsId")});
	return {
		isReady: handle_image.ready(),
		images: user?user.profile?Images.find({_id: user.profile.image}).fetch():[]:[],
		Chat: Conversation.find().fetch(),
		online: Online.find().fetch()
	};
}, MentorHome);