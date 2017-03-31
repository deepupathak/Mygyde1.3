import { Mongo } from 'meteor/mongo';
 
export const Conversation = new Mongo.Collection('conversation');
export const Online = new  Mongo.Collection('online');
export const CountMessage = new Mongo.Collection('countMessage');

import { Images } from '../api/imageCollection.js';

if(Meteor.isServer){
  
  	Meteor.publish("MentorsList", function() {
	  	return Meteor.users.find();
	});

	Meteor.publish('message', (userId) => {
    	return Meteor.users.find({_id: userId});
  	});

  	Meteor.publish('conversation', (userId, receiver) => {
 	  	return Conversation.find({$or: [{sender: userId, receiver: receiver},{sender: receiver, receiver: userId}]});
	});

	Meteor.publish("ImageFile", function(){
		return Images.find();
	});

	Meteor.publish('notification', function conversationPublication(userId) {
 		// console.log(Conversation.find({receiver: userId, seen: false}).count())
	  	return Conversation.find({receiver: userId});
	});

	Meteor.publish("OnlineUser", function onlinePublication(){
		return Online.find();
	});
	
	Meteor.publish("Chat", function ConversationPublication(){
		return Conversation.find();
	});

	Meteor.publish("Count", function countPublication(){
		return CountMessage.find();
	});

  	/*--------- Methods --------*/
	
  	Meteor.methods({

	  	/*-------  Update Mentor profile -------------*/

	  	updateMentorInfo:function(id, messages, mentees, name, fullName, country, city, ptitle, industry, experience, education, fb_url, tw_url, linked_url, q1, q2, q3, q4, q5, q6){
	  		Meteor.users.update({_id: id},{
	    		$set:{
	    			'profile.messages': parseInt(messages),
	    			'profile.mentees' : parseInt(mentees),
	    			'profile.name': name,
	    			'profile.fullName': fullName,
	    			'profile.country': country,
	    			'profile.city': city,
	    			'profile.professional_title': ptitle,
	    			'profile.industry': industry,
	    			'profile.experience': experience,
	    			'profile.education': education,
	    			'profile.facebook': fb_url,
	    			'profile.twitter': tw_url,
	    			'profile.linkedin': linked_url,
	    			'profile.question1': q1,
	    			'profile.question2': q2,
	    			'profile.question3': q3,
	    			'profile.question4': q4,
	    			'profile.question5': q5,
	    			'profile.question6': q6,
	    		}
	  		}); 
	  	},

	  	/*----------- Update Mentee Profile Infor ----------*/

	  	updateMenteeInfo: function(id,name,lname){
	  		Meteor.users.update({_id: id},{
	    		$set:{
	    			'profile.name': name,
	    			'profile.lname': lname
	    		}
	  		});
	  	},

	  	/*----------- Send Verification Email ----------------*/

	  	send:function(id,email){
			if(Meteor.isServer){
				Accounts.sendVerificationEmail(id, email);
			}
		},

	    
	  	/*----------- Send Chat Message-------------*/

	  	send_Message: function(receiver, message,date, month, year, time) {
	      	if(Meteor.user().profile.mtype == "mentee"){
	        	Conversation.insert({
	          		sender: Meteor.userId(),
	          		receiver:receiver,
	          		date: date,
	          		month: month,
	          		year: year,
	          		time: time,
	          		message: message,
	          		type: "mentee",
	          		seen: false
	        	})
	      	}else{
	        	Conversation.insert({
	          		sender: Meteor.userId(),
	          		receiver:receiver,
	          		date: date,
	          		month: month,
	          		year: year,
	          		time: time,
	          		message: message,
	          		type: "mentor",
	          		seen: false
	        	})
	      	}
	    },


	  	/*-------------- Update Profile Pic -------------*/

	  	updateImage: function(id){
	  		Meteor.users.update({_id:Meteor.userId()},{
	    		$set: {"profile.image": id}
	  		});
	  	},

	  	/*-------------- Send Email on Chat ----------------*/
		  
	  	sendEmail: function(to, name, from, text){
	 	  	// Let other method calls from the same client start running,
	  		// without waiting for the email sending to complete.
	  		this.unblock();
	  		Email.send({
	    		to: to,
	 	  		from: from,
	 	  		subject: "You have a message from " + from,
	 	  		html:"<p>You have received a new message on MyGyde from " + from + "</p><p>Sender Name - " + name + "</p><p>Email Address - " + from + "</p><p>Message - " + text + "</p>"
	  		});
		  },

	  	/*------------- Create Mentor User -------------*/

	  	createMentor:function(userData, password, file){
	  		var user = Accounts.createUser(userData);
	  		Accounts.setPassword(user, password)
	  		Accounts.sendVerificationEmail(user)
	  		return user;
	  	},

	  	/*------------- Create Mentee User -------------*/

	  	createMentee:function(userData, password){
	  		var user = Accounts.createUser(userData);
	  		Accounts.setPassword(user, password)
	  		Accounts.sendVerificationEmail(user)
	  		return user;
	  	},

	  	/*------------- Save Image -------------*/

	  	saveImage: function(fileId,id){
	  		Meteor.users.update({_id:id},{
	    		$set: {"profile.image": fileId} 
	  		});
	  	},

	  	/*------------- Save Default Image -------------*/

	  	defaultImage: function(id){
	  		Meteor.users.update({_id:id},{
	    		$set:{"profile.image": ""}
	  		});
	  	},

	    /*------------ Delete image from collection -------*/

	    deleteImage: function(id){
	      	Images.remove(id);
	    },

	  	/*------------- Delete profile  -------------*/

	  	deleteProfile: function(id){
	    	Meteor.users.remove({_id:id});
	  	},

	  	/*------------- Show Active User -------------*/

	  	active:function(id){
	    	Online.insert({user: id});
	  	},

	  	/*------------- Show Inactive User -------------*/

	  	inactive:function(id){
	  		// console.log("id---- =",id)
	  		Online.remove({user: id});
	  		// console.log("Online---- =",Online.find().fetch())
	  	},
	    
	  	/*------------- Seen Message  -------------*/

	  	messageSeen:function(receiver,sender){
	  		Conversation.update({$and: [{receiver: receiver},{sender:sender}]},
	    		{
	  			  $set: {
	      				seen: true
	    			}
	    		},
	    		{multi: true}
	  		);
	  	},

	  	/*------------- Contact Mail -------------*/

	  	Feedback_Email: function(name, email, text){
	  		// Let other method calls from the same client start running,
	  		// without waiting for the email sending to complete.
	  		this.unblock();
	  		Email.send({
	    		to: "divyanshu@deligence.com",
	    		from: "feedback@mygyde.org",
	    		subject: "Contact mail" ,
	    		html: "<p> Name:- " + name + "</p><p> email:- " + email + "</p><p> Message:- " + text + "</p>"
	  		});
	  	},


	  	/*---------- Send Verification Email again --------*/

	  	sendVerifcationMail:function(id){
	    	Accounts.sendVerificationEmail(id);
	  	},


	  	/*------- expire verification link --------*/
	  	
	  	expireVerifyLink:function(email){
	  		Meteor.users.update({'emails.address':email},
	    		{$set:{
	      			'services.email.verificationTokens': []
	    		}
	  		});
	  	}
 	})
}