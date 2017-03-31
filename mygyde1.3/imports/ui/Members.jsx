/* Import React, Component, Proptypes, render */

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
// import ReactMixin from 'react-mixin';

/* Import Atmosphere Packages */

import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { $ } from 'meteor/jquery';
import { Meteor } from 'meteor/meteor';
// import {ReactMeteorData} from 'meteor/react-meteor-data';

/* Import Mongo Collections */

import { Images } from '../api/imageCollection.js';


class Members_Component extends React.Component {

	load(e){
		Session.set('limit', Session.get('limit')+6);
    	if(Session.get('limit') >= this.props.Count) {
			e.target.disabled = true;
		}
	}

	render(){
    	return (
      		<section className="section-block team-members" id="our-mentors">
      			<div className="container">
       				<div className="section-title-block">
          				<h3 className="section-title">Meet Our Mentors</h3>
					</div>
        			<div className="row members data">
          			{
              			this.props.Mentors.map(function(mentor){
                			return(
                  				<MemberListContainer key={mentor._id} mentor={mentor} />
               	 			)   
              			})
            		}
        			</div>
					<div className="process col-md-3 col-md-offset-5">
         				<div className="caption-btns">
            				<button className="btn btn-main" id="load-more-button" onClick={this.load.bind(this)}>Load More</button>
         				</div>
     				</div>
      			</div>
      		</section>
    )
	}
}

export default createContainer(() => {
	if(!Session.get('limit')){ 
		Session.set('limit',6); 
	}
	handle = Meteor.subscribe("MentorsList", Session.get("limit"));
  	// handle = Meteor.subscribe("MentorsList");
	return {
		isReady: handle.ready(),
    	Mentors: Meteor.users.find({'profile.mtype':'mentor'},{limit: Session.get("limit")}).fetch(),
		Count: Meteor.users.find({'profile.mtype':'mentor'}).count(),
	};
}, Members_Component);



class List extends React.Component {
	url_has_protocol(url){
	  	let pattern = /^((http|https):\/\/)/;
	  	if(url && !pattern.test(url)) {
	    	url = "http://" + url;
	  	}
	  	return url;
	}

	reach(e){
		e.preventDefault();
		$('#ParentModal').modal('show');
		$('#NotAMember').trigger('click');
	}

	render(){
    	that = this;
		if(that.props.mentor.emails[0].verified){
  			return(
	    		<div className="col-md-6 member-block">
	      			<div className="member-content">
	        			<figure>
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
	        			<button className="btn btn-default ReachToMentorButton" id="reach" type="button" onClick={this.reach.bind(this)}>Reach out to {that.props.mentor.profile.name}</button>
	      			</div>
	    		</div>
  			)
		}else{
      		return(
        		<div></div>
      		)
    	}
  	}
}


MemberListContainer = createContainer(({mentor}) => {
	// console.log(mentor,"<<<<")
	handle = Meteor.subscribe("MyImage");
	let user = Meteor.users.find({_id: mentor._id}).fetch();
	return{
		isReady: handle.ready(),
		images: user?Images.find({_id: mentor.profile.image}).fetch():[],
	}
}, List);
