/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { $ } from 'meteor/jquery';

/* Import Mongo Collections */

import { Images } from '../api/imageCollection.js';

class MenteeLoggedIn extends React.Component {
	render(){
		$(window).scrollTop(0);
  		return (
    		<section className="section-block team-members" id="our-mentors">
	 	  		<div className="container">
		 	  		<div className="section-title-block-meet">
			 	 		<h3 className="section-title-meet">Meet Our Mentors</h3>
			  		</div>
 		 	  		<div className="row members">
 		  	  			{
 		  		  			this.props.Mentors.map(function(mentor){
 		  			  			return(
 		  			    			<ContainerItem key={mentor._id} mentor = {mentor} />
 		  			  			)    
 		  		  			})
 		  	  			}
 		 	  		</div>

		 	  		<div className="process col-md-3 col-md-offset-5">
	     	  			<div className="caption-btns">
	       	 				<a className="btn btn-main" id="load-more-button">Load More</a>
	     	  			</div>
	   	  			</div>
	 	  		</div> {/* .container ends */}
 	  		</section>
  		)
	}
}

export default createContainer(() => {
	handle = Meteor.subscribe("MentorsList");
	return {
 		isReady: handle.ready(),
  		Mentors: Meteor.users.find({'profile.mtype':'mentor'}).fetch()
	};
}, MenteeLoggedIn);


class ListItem extends React.Component {
	url_has_protocol(url){
	  let pattern = /^((http|https):\/\/)/;
  		if(url && !pattern.test(url)) {
    		url = "http://" + url;
 		}	
 		return url;
	}
	render(){
	  	that = this;
	  	if(that.props.mentor.emails[0].verified){
    		return(
      			<div className="col-md-6 member-block">
        			<div className="member-content">
			    		<figure>
		      				{/* PUT YOUR IMAGE HERE */}
		      				<a href={FlowRouter.path('mentor',{_id: that.props.mentor._id})}>
		     	 				{ 	that.props.mentor.profile.image?
									this.props.images.map(function(img){
            							return (
                  							<div key={img._id}>
                      							<img src={that.props.mentor.profile.image != ""?img.url():"default.png"} className="img-responsive" alt="Invalid Image" />
                    						</div>
            							)
          							}):<img src="default.png" className="img-responsive" />
            					}
		      				</a>
		      				{/* IMAGE SIZE SHOULD BE 250x291 */}
		      				<figcaption>
		        				<div className="social-links">
	          						{that.props.mentor.profile.facebook?<div className="icon-block"><a href={that.url_has_protocol(that.props.mentor.profile.facebook)} target="_blank"><span className="icon ion-social-facebook"></span></a></div>:''}
	          						{that.props.mentor.profile.twitter ?<div className="icon-block"><a href={that.url_has_protocol(that.props.mentor.profile.twitter)} target="_blank"><span className="icon ion-social-twitter"></span></a></div>:''}
	          						{that.props.mentor.profile.linkedin ?<div className="icon-block"><a href={that.url_has_protocol(that.props.mentor.profile.linkedin)} target="_blank"><span className="icon ion-social-linkedin"></span></a></div>:''}
		        				</div>
		        				<div className="member-info">
	          						<h4>{that.props.mentor.profile.name}</h4>
	          						<h5>{that.props.mentor.profile.professional_title} in {that.props.mentor.profile.city}, {that.props.mentor.profile.country} </h5>
		        				</div>
		      				</figcaption>
			    		</figure>
			    		<p className="member-ExpEdu">
        					<b>About Me</b> <br/> <span className="Exp">{that.props.mentor.profile.experience}</span><br />
        					<b>Experience Highlights</b> <br /> <span className="Edu">{that.props.mentor.profile.education}</span>
          				</p>
			  		</div>
		  		</div>
    		)
		}
	}
}

ContainerItem = createContainer(({mentor}) => {
	// console.log(mentor,"<<------ Mentors List")
	handle = Meteor.subscribe("MyImage");
  	let user = Meteor.users.find({_id: mentor._id}).fetch();
	return {
  		isReady: handle.ready(),
		images: user?Images.find({_id: mentor.profile.image}).fetch():[]
	};
}, ListItem);