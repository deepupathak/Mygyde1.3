/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

/* Import Mongo Collections */

import { Images } from '../api/imageCollection.js';

/*export default class StateHolder extends React.Component {
	constructor(props) {
  	super(props);

  	this.state = {
    	searchValue: "",
  	};
	}

	render(){
  	return(<Container searchvalue={this.state.searchValue} />);
	}
}*/

class MentorsSearch extends React.Component {
	
	getSearchData(){
	  	if(this.props.isReady){
	    	let substringMatcher = function(strs) {
	    		return function findMatches(q, cb) {
	    			let matches, substrRegex;

	    			// an array that will be populated with substring matches
	    			matches = [];

	    			// regex used to determine if a string contains the substring `q`
	    			substrRegex = new RegExp(q, 'i');

	    			// iterate through the pool of strings and for any string that
	    			// contains the substring `q`, add it to the `matches` array
	    			$.each(strs, function(i, str) {
	      			if (substrRegex.test(str)) {
	        			matches.push(str);
	      			}
	    			});
	    			
	    			cb(matches);
	    		};
	  		};	
	  		let mProfiles=_.pluck(this.props.Mentors, 'profile');
	  		// console.log('Pluck',mProfiles)
	  		let name=_.pluck(mProfiles, 'name');
	  		// console.log(name.toUpperCase())
	  		let fullName=_.pluck(mProfiles, 'fullName');
	  		let city=_.pluck(mProfiles, 'city');
	  		let country=_.pluck(mProfiles, 'country');
	  		let industry=_.pluck(mProfiles, 'industry');
	  		let mentorList= _.uniq(_.union( name, fullName, city, country, industry ), false, function(item, key){return item; });
	  		// console.log('Pluck',mentorList)
	  		$('#mentorList .typeahead').typeahead('destroy');

	  		$('#mentorList .typeahead').typeahead({
	    		hint: true,
	    		highlight: true,
	    		minLength: 1
	  		},
	  		{
	    		name: 'mentorList',
	    		source: substringMatcher(mentorList)
	  		});
	  	}
	}
	componentDidMount(){
	  	Meteor.subscribe("MentorsList");

	  	function classReg(className) {
	    	return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	  	}
	  	// classList support for class management
	  	// altho to be fair, the api sucks because it won't accept multiple classes at once
	  
	  	let hasClass, addClass, removeClass;

	  	if ('classList' in document.documentElement) {
	    	hasClass = function(elem, c) {
	      		return elem.classList.contains(c);
	    	};
	    	addClass = function(elem, c) {
	      		elem.classList.add(c);
	    	};
	    	removeClass = function(elem, c) {
	      		elem.classList.remove(c);
	    	};
	  	}else{
	    	hasClass = function(elem, c) {
	      		return classReg(c).test(elem.className);
	    	};
	    	addClass = function(elem, c) {
	      		if (!hasClass(elem, c)) {
	        		elem.className = elem.className + ' ' + c;
	      		}
	    	};	
	    	removeClass = function(elem, c) {
	      		elem.className = elem.className.replace(classReg( c ), ' ');
	    	};			
	  	}
	  	function toggleClass(elem, c) {
	  		let fn = hasClass(elem, c) ? removeClass : addClass;
	  		fn(elem, c);
	  	}

	  	let classie = {
	  		// full names
	  		hasClass: hasClass,
	  		addClass: addClass,
	  		removeClass: removeClass,
	  		toggleClass: toggleClass,
	  		// short names
	  		has: hasClass,
	  		add: addClass,
	  		remove: removeClass,
	  		toggle: toggleClass
	  	};

	  	// transport
	  	if(typeof define === 'function' && define.amd) {
	    	// AMD
	    	define(classie);
	  	}else{
	    	// browser global
	    	window.classie = classie;
	  	}
	  	let morphSearch = document.getElementById( 'morphsearch' ),
	  	input = morphSearch.querySelector( 'input.morphsearch-input' ),
	  	ctrlClose = morphSearch.querySelector( 'span.morphsearch-close' ),
	  	isOpen = isAnimating = false,
	  	// show/hide search area
	  	toggleSearch = function(evt) {
    		// return if open and the input gets focused
    		if(evt.type.toLowerCase() === 'focus' && isOpen) return false;
			let offsets = morphsearch.getBoundingClientRect();
			if(isOpen) {
	  			classie.remove(morphSearch, 'open');
	  			// trick to hide input text once the search overlay closes 
	  			// todo: hardcoded times, should be done after transition ends
	  			if(input.value !== '') {
	  				setTimeout(function() {
	    				classie.add(morphSearch, 'hideInput');
						setTimeout(function() {
	  						classie.remove(morphSearch, 'hideInput');
	  						input.value = '';
						}, 300 );
	  				}, 500);
	  			}
	  			input.blur();
			}else{
  				classie.add(morphSearch, 'open');
			}
	    	isOpen = !isOpen;
	  	};
	  	// events
	  	input.addEventListener('focus', toggleSearch);
	  	ctrlClose.addEventListener('click', toggleSearch);
	  	// esc key closes search overlay
	  	// keyboard navigation events
	  	document.addEventListener('keydown', function(ev){
	    	let keyCode = ev.keyCode || ev.which;
	    	if(keyCode === 27 && isOpen) {
	      		toggleSearch(ev);
	    	}
	  	});

	  	/***** for demo purposes only: don't allow to submit the form *****/

	  	morphSearch.querySelector('button[type="submit"]').addEventListener('click', function(ev) {ev.preventDefault();});
	} //End ComponentDidMount() here

	handleSubmit(e){
		// console.log("Inside handleSubmit() method")
		let SearchValue = ReactDOM.findDOMNode(this.refs.search).value;
		Session.set("searchValue", SearchValue);
		// this.setState({"searchValue": SearchValue});
		// console.log(Session.get("searchValue"),"<<---- search value initialized! ")
	}
	
	render(){
	  	this.getSearchData();
	  	// console.log(this.props,"<<-------Mentors list")
	  	return(
	  		<div id="morphsearch" className="morphsearch">
	    		<form className="morphsearch-form" role="form" >
	    			<div className="form-group" id="mentorList">
	      				<input className="morphsearch-input typeahead" id="MentorsSearchName" ref="search" type="text" placeholder="Search MyGyde"/>
	    			</div>
	    			<button className="morphsearch-submit" type="submit" onClick={this.handleSubmit.bind(this)}>Search</button>
	    		</form>
	    		<div className="morphsearch-content">
	    			<div className="dummy-column1">
	      				<h2>Mentors</h2>
	      				{
	      					this.props.Mentors.map(function(mentor){
		        				return (
		          					<MemberItemList key={mentor._id} mentor={mentor} />
		        				)  
	      					})
	      				}
	    			</div>                 
	    		</div>
	    		<span className="morphsearch-close"></span>
	  		</div>
	  	)
	}
}

export default createContainer(() => {
  	handle = Meteor.subscribe("MentorsList");
	Meteor.subscribe("ImageFile");
	// console.log(Session.get("searchValue"),"<-- search value")
	let user = Meteor.users.find({'profile.mtype': "mentor"}).fetch();
	return {
		isReady: handle.ready(),
		// Mentors: this.state.searchValue != ""? Meteor.users.find({$and: [{'profile.mtype': "mentor"},{$or: [{'profile.name':{$regex: /^this.state.searchValue/i}},{'profile.fullName':{$regex: /^this.state.searchValue/i}},{'profile.city':{$regex: /^this.state.searchValue/i}},{'profile.country':{$regex: /^this.state.searchValue/i}},{'profile.industry':{$regex: /^this.state.searchValue/i}}]}]}).fetch() : Meteor.users.find({'profile.mtype':'mentor'}).fetch(),
		
		Mentors: Session.get("searchValue") != undefined ? Meteor.users.find({$and: [{'profile.mtype': "mentor"},{$or: [{'profile.name': Session.get("searchValue")},{'profile.fullName': Session.get("searchValue")},{'profile.city': Session.get("searchValue")},{'profile.country': Session.get("searchValue")},{'profile.industry': Session.get("searchValue")}]}]}).fetch() : Meteor.users.find({'profile.mtype':'mentor'}).fetch(),
  		// userImage: Images.find().fetch()
	}
}, MentorsSearch);


class MentorList extends React.Component {
	url_has_protocol(url){
	   	let pattern = /^((http|https):\/\/)/;
	  	if(url && !pattern.test(url)) {
	    	url = "http://" + url;
	 	}
	 	return url;
  	}
	searchClose() {
    	$('span.morphsearch-close').click();
  	}
  	render(){
	  	if(!this.props.isReady){
	    	return <div>Loading...</div>
	  	}else{
	  		that = this;
	  		if(that.props.mentor.emails[0].verified){
	    		return(
	    			<a onClick={this.searchClose.bind(this)} key={that.props.mentor._id} className="dummy-media-object" href={FlowRouter.path('mentor',{_id:that.props.mentor._id})}>
	    			  	{ 	that.props.mentor.profile.image?
	      					this.props.images.map(function(img){
	        					return (
	        						<div key={img._id}>
	          							<img src={that.props.mentor.profile.image != ""?img.url():"default.png"} className="img-responsive" alt="Invalid Image" />
	        						</div>
	        					)
	      					}):<img src="default.png" className="img-responsive" />
	      				}
		      			<p> <h3>{that.props.mentor.profile.name}</h3> <br /> {that.props.mentor.profile.professional_title}  </p>
		      			<p> <b>About Me : </b><span className="Exp">{that.props.mentor.profile.experience}</span><br /><b>Experience Highlights :</b> <span className="Edu">{that.props.mentor.profile.education}</span></p>
	    			</a>
	    		)
	  		}else{
	    		return <div></div>
	  		}
		}
	}
}

MemberItemList = createContainer(({mentor}) => {
  	// console.log(mentor,"<<<<< mentor search")
  	handle = Meteor.subscribe("MyImage");
	let user = Meteor.users.find({_id: mentor._id}).fetch();
	return {
		isReady: handle.ready(),
		images: user?Images.find({_id: mentor.profile.image}).fetch():[]
	}
}, MentorList);