/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { createContainer } from 'meteor/react-meteor-data';
import { $ } from 'meteor/jquery';
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';

/* Import Mongo Collections */

import { Images } from '../api/imageCollection.js';

/* Import Modules */

import Profile from '../ui/MenteeProfile.jsx';

class MentorProfile extends React.Component {
	componentDidMount(){

	  	/*---------- Auto Suggestion ------------*/
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

	  	let industryList = [
	  		"Accommodations",
	  		"Accounting",
	  		"Advertising",
	  		"Aerospace",
	  		"Agriculture & Agribusiness",
	  		"Air Transportation",
	  		"Apparel & Accessories",
	  		"Auto",
	  		"Banking",
	  		"Beauty & Cosmetics",
	  		"Biotechnology",
	  		"Chemical",
	  		"Communications",
	  		"Computer",
	  		"Construction",
	  		"Consulting",
	  		"Consumer Products",
	  		"Education",
	  		"Electronics",
	  		"Employment",
	  		"Energy",
	  		"Entertainment & Recreation",
	  		"Fashion",
	  		"Financial Services",
	  		"Food & Beverage",
	  		"Health",
	  		"Information",
	  		"Information Technology",
	  		"Journalism & News",
	  		"Legal Services",
	  		"Manufacturing",
	  		"Media & Broadcasting",
	  		"Medical Devices & Supplies",
	  		"Motion Pictures & Video",
	  		"Music",
	  		"Pharmaceutical",
	  		"Public Administration",
	  		"Publishing",
	  		"Real Estate",
	  		"Retail",
	  		"Service",
	  		"Sports",
	  		"Technology",
	  		"Telecommunications",
	  		"Transportation",
	  		"Travel",
	  		"Utilities",
	  		"Video Game",
	  		"Web Services"
	  	];

	  	$('#industryFld .typeahead').typeahead({
	    	hint: true,
	    	highlight: true,
	    	minLength: 1
	  	},
	  	{
	  		name: 'industryList',
	  		source: substringMatcher(industryList)
	  	});

	  	let countryList = [ 
	  		/*   A LIST     */
	  		"Afghanistan", 
	  		"Albania", 
	  		"Algeria", 
	  		"Andorra", 
	  		"Angola", 
	  		"Antigua and Barbuda", 
	  		"Argentina", 
	  		"Armenia", 
	  		"Australia", 
	  		"Austria", 
	  		"Azerbaijan",

	  		/*    B LIST     */
	  		"Bahamas",
	  		"Bahrain",
	  		"Bangladesh",
	  		"Barbados",
	  		"Belarus",
	  		"Belgium",
	  		"Belize",
	  		"Benin",
	  		"Bhutan",
	  		"Bolivia",
	  		"Bosnia and Herzegovina",
	  		"Botswana",
	  		"Brazil",
	  		"Brunei",
	  		"Bulgaria",
	  		"Burkina Faso",
	  		"Burundi",

	  		/*    C LIST      */
	  		"Cabo Verde",
	  		"Cambodia",
	  		"Cameroon",
	  		"Canada",
	  		"Central African Republic",
	  		"Chad",
	  		"Chile",
	  		"China",
	  		"Colombia",
	  		"Comoros",
	  		"Congo, Republic of the",
	  		"Congo, Democratic Republic of the",
	  		"Costa Rica",
	  		"Cote d'Ivoire",
	  		"Croatia",
	  		"Cuba",
	  		"Cyprus",
	  		"Czech Republic",

	  		/*      D LIST     */
	  		"Denmark",
	  		"Djibouti",
	  		"Dominica",
	  		"Dominican Republic",

	  		/*       E LIST     */
	  		"Ecuador",
	  		"Egypt",
	  		"El Salvador",
	  		"Equatorial Guinea",
	  		"Eritrea",
	  		"Estonia",
	  		"Ethiopia",

	  		/*      F LIST      */
	  		"Fiji",
	  		"Finland",
	  		"France",

	  		/*      G LIST     */
	  		"Gabon",
	  		"Gambia",
	  		"Georgia",
	  		"Germany",
	  		"Ghana",
	  		"Greece",
	  		"Grenada",
	  		"Guatemala",
	  		"Guinea",
	  		"Guinea-Bissau",
	  		"Guyana",

	  		/*     H LIST     */
	  		"Haiti",
	  		"Honduras",
	  		"Hungary",

	  		/*    I LIST      */
	  		"Iceland",
	  		"India",
	  		"Indonesia",
	  		"Iran",
	  		"Iraq",
	  		"Ireland",
	  		"Israel",
	  		"Italy",

	  		/*    J LIST       */
	  		"Jamaica",
	  		"Japan",
	  		"Jordan",

	  		/*      K LIST     */
	  		"Kazakhstan",
	  		"Kenya",
	  		"Kiribati",
	  		"Kosovo",
	  		"Kuwait",
	  		"Kyrgyzstan",

	  		/*     L LIST      */
	  		"Laos",
	  		"Latvia",
	  		"Lebanon",
	  		"Lesotho",
	  		"Liberia",
	  		"Libya",
	  		"Liechtenstein",
	  		"Lithuania",
	  		"Luxembourg",

	  		/*     M LIST      */
	  		"Macedonia",
	  		"Madagascar",
	  		"Malawi",
	  		"Malaysia",
	  		"Maldives",
	  		"Mali",
	  		"Malta",
	  		"Marshall Islands",
	  		"Mauritania",
	  		"Mauritius",
	  		"Mexico",
	  		"Micronesia",
	  		"Moldova",
	  		"Monaco",
	  		"Mongolia",
	  		"Montenegro",
	  		"Morocco",
	  		"Mozambique",
	  		"Myanmar (Burma)",

	  		/*       N LIST     */
	  		"Namibia",
	  		"Nauru",
	  		"Nepal",
	  		"Netherlands",
	  		"New Zealand",
	  		"Nicaragua",
	  		"Niger",
	  		"Nigeria",
	  		"North Korea",
	  		"Norway",


	  		/*      O LIST      */
	  		"Oman",

	  		/*      P LIST      */
	  		"Pakistan",
	  		"Palau",
	  		"Palestine",
	  		"Panama",
	  		"Papua New Guinea",
	  		"Paraguay",
	  		"Peru",
	  		"Philippines",
	  		"Poland",
	  		"Portugal",

	  		/*      Q LIST      */
	  		"Qatar",

	  		/*      R LIST      */
	  		"Romania",
	  		"Russia",
	  		"Rwanda",

	  		/*      S LIST      */
	  		"St. Kitts and Nevis",
	  		"St. Lucia",
	  		"St. Vincent and The Grenadines",
	  		"Samoa",
	  		"San Marino",
	  		"Sao Tome and Principe",
	  		"Saudi Arabia",
	  		"Senegal",
	  		"Serbia",
	  		"Seychelles",
	  		"Sierra Leone",
	  		"Singapore",
	  		"Slovakia",
	  		"Slovenia",
	  		"Solomon Islands",
	  		"Somalia",
	  		"South Africa",
	  		"South Korea",
	  		"South Sudan",
	  		"Spain",
	  		"Sri Lanka",
	  		"Sudan",
	  		"Suriname",
	  		"Swaziland",
	  		"Sweden",
	  		"Switzerland",
	  		"Syria",

	  		/*      T LIST      */
	  		"Taiwan",
	  		"Tajikistan",
	  		"Tanzania",
	  		"Thailand",
	  		"Timor-Leste",
	  		"Togo",
	  		"Tonga",
	  		"Trinidad and Tobago",
	  		"Tunisia",
	  		"Turkey",
	  		"Turkmenistan",
	  		"Tuvalu",

	  		/*      U LIST      */
	  		"Uganda",
	  		"Ukraine",
	  		"United Arab Emirates",
	  		"United Kingdom (UK)",
	  		"United States of America (USA)",
	  		"Uruguay",
	  		"Uzbekistan",

	  		/*      V LIST      */
	 	 	"Vanuatu",
	  		"Vatican City (Holy See)",
	  		"Venezuela",
	  		"Vietnam",

	  		/*      Y LIST      */
	  		"Yemen",

	  		/*      Z LIST      */
	  		"Zambia",
	  		"Zimbabwe",
	  	];
	  	$('#countryFld .typeahead').typeahead({
	  		hint: true,
	  		highlight: true,
	  		minLength: 1
	  	},
	  	{
	  		name: 'countryList',
	  		source: substringMatcher(countryList)
	  	});
	}
	handleDelete(ev){
	  	ev.preventDefault();
	  	var r = window.confirm("are you sure you want to delete your profile ?");
	  	if(r == true){
	  		Meteor.call("deleteProfile", Meteor.userId());
	  		Bert.alert("Profile deleted successfully.", "info", "growl-top-left");
	  		Meteor.logout();
	  		window.location.href="/";
	  	}
	}
	handleRemove(e){
	  	e.preventDefault();
	  	// console.log(Session.get("imageId"),"<<------image id")
	  	Meteor.call("defaultImage", Meteor.userId());
	  	Meteor.call("deleteImage", Session.get("imageId"));
	  	document.getElementById('imageFile').value = "";
	  	Session.set("imageId", "");
	  	$('#remove').css('display','none');
	  	Bert.alert("Pic Deleted Successfully.", "info", "growl-top-left");
		}
		handleSubmit(event) {
	  	event.preventDefault();
	  	let messages = ReactDOM.findDOMNode(this.refs.noMessages).value;
	  	let mentees = ReactDOM.findDOMNode(this.refs.noMentees).value;
	  	let name = ReactDOM.findDOMNode(this.refs.name).value;
	  	let fullName = ReactDOM.findDOMNode(this.refs.fullName).value;
	  	let country = ReactDOM.findDOMNode(this.refs.country).value;
	  	let city = ReactDOM.findDOMNode(this.refs.city).value;
	  	let ptitle = ReactDOM.findDOMNode(this.refs.ptitle).value;
	  	let industry = ReactDOM.findDOMNode(this.refs.industry).value;
	  	let experience = ReactDOM.findDOMNode(this.refs.experience).value;
	  	let education = ReactDOM.findDOMNode(this.refs.education).value;
	  	let fb_url = ReactDOM.findDOMNode(this.refs.facebook_url).value;
	  	let tw_url = ReactDOM.findDOMNode(this.refs.twitter_url).value;
	  	let linked_url = ReactDOM.findDOMNode(this.refs.linkedin_url).value;
	  	let q1 = ReactDOM.findDOMNode(this.refs.q1).value;
	  	let q2 = ReactDOM.findDOMNode(this.refs.q2).value;
	  	let q3 = ReactDOM.findDOMNode(this.refs.q3).value;
	  	let q4 = ReactDOM.findDOMNode(this.refs.q4).value;
	  	let q5 = ReactDOM.findDOMNode(this.refs.q5).value;
	  	let q6 = ReactDOM.findDOMNode(this.refs.q6).value;
	  	
	  	Meteor.call("updateMentorInfo", Meteor.userId(), messages, mentees, name, fullName, country, city, ptitle, industry, experience, education, fb_url, tw_url, linked_url, q1, q2, q3, q4, q5, q6);
	  	
	  	/*Meteor.call("updateImage",Session.get("imageId"), function(err,res){
	  		if(err){ 
	  			Bert.alert("Error while updating image", "danger", "growl-top-left");
	  		}
	  	});*/

	  	Bert.alert("Information Updated Successfully.", "info", "growl-top-left");
	}
	imageSubmit(event){
	  	event.preventDefault();
	  	FS.Utility.eachFile(event, function(file){
	  		Images.insert(file, function(err, fileObj) {
	    		if(err){
	      			// console.log(err);
	      			Bert.alert("Error while uploading image", "danger", "growl-top-left")
	    		}else{
	      			// console.log("Success --> File Obj", fileObj._id)
	    		}
	    		let user = Meteor.users.find({_id: Meteor.userId()}).fetch();
	    		Session.set("imageId", fileObj._id);
	    		// console.log(Session.get("imageId"),"<<<<<<<<------- image id")
	    		$('#remove').css('display','block');
	    		Meteor.call("updateImage",fileObj._id, function(err,res){
		  		  	if(err){
		  		  		Bert.alert("Error while updating image", "danger", "growl-top-left");
		  		  	}
	    		});
			});
	  	});
	}
	handleSave(ev){
	  	ev.preventDefault();
	  	let current = ReactDOM.findDOMNode(this.refs.current).value.trim();
	  	let newPass = ReactDOM.findDOMNode(this.refs.new).value.trim();
	  	let confirm = ReactDOM.findDOMNode(this.refs.confirm).value.trim();
	  	if(newPass == " "){
	    	Bert.alert("Please input new password again. Blank field or space is not allowed.", "warning", "growl-top-left")
	  	}else if(confirm == ""){
	    	Bert.alert("Please input confirm password again. Blank field or space is not allowed.", "warning", "growl-top-left")
	  	}else if(newPass != confirm){
	    	Bert.alert("Password mismatch.", "warning", "growl-top-left")
	  	}else{
	  		Accounts.changePassword(current, newPass, function(err){
	    		if(err){
	      	  		$("#message").text("Current Password incorrect");
	    		}else{
	    			$("#message").text(" ");
	    			Bert.alert("Password changed successfully.", "info", "growl-top-left")
	    			document.getElementById("current").value = "";
	    			document.getElementById("new").value = "";
	    			document.getElementById("confirm").value = "";
	    		}
	  		});
	  	}
	}
  	render(){
	  	$(window).scrollTop(0);

	  	Session.set("imageId", Meteor.user().profile.image);
	  	// console.log(Meteor.user().profile.mtype,"----------")
	  	// console.log(Meteor.user(),"---------",Meteor.userId(),"---------",Meteor.user().profile.mtype,"---------", this.data)
  		if(Meteor.user().profile.mtype == "mentee") {
	   		return <Profile />
	  	}else{
      		return(
	        	<div className="container">
	          		<div className="section-title-block-profile">
	            		<h3 className="section-title-profile">Edit Profile</h3>
	          		</div>
	          		<ul className="nav nav-tabs">
	            		<li className="active"><a data-toggle="tab" href="#profileView">Profile</a></li>
		        		<li><a data-toggle="tab" href="#interviewquestionsTab">Interview Questions</a></li>
		        		<li><a data-toggle="tab" href="#messageTab">Number of Messages/Mentees Per Day</a></li>
		        		<li><a data-toggle="tab" href="#passwordView">Change Password</a></li>
		        		<li><a data-toggle="tab" href="#deleteProfile">Delete Profile</a></li>
		      		</ul>
	          		<div className="tab-content">
	      				{/*-------------------------------------------------------------------------------------------------------
	                                                Profile Tab
	      		  		----------------------------------------------------------------------------------------------------------*/}

	            		<div id="profileView" className="tab-pane fade in active">
		        			<form role="form" className="edit-profile" method="post" onSubmit={this.handleSubmit.bind(this)}>
			          			<div className="form-group">
			          				<label>Name or Nickname: </label>
			          				<input type="text" className="form-control" ref="name" defaultValue={Meteor.user().profile.name} />
			          			</div>
			          			<div className="form-group">
			          				<label>Full Name: </label>
			          				<input type="text" className="form-control" ref="fullName" defaultValue={Meteor.user().profile.fullName} />
			          			</div>
			          			<div className="form-group" id="countryFld">
			          				<label>Country: </label>
			          				<input type="text" className="form-control typeahead" ref="country" defaultValue={Meteor.user().profile.country} />
			          			</div>
			          			<div className="form-group">
			          				<label>City: </label>
			          				<input type="text" className="form-control" ref="city" defaultValue={Meteor.user().profile.city} />
			          			</div>
			          			<div className="form-group">
			          				<label>Professional Title: </label>
			          				<input type="text" className="form-control" ref="ptitle" defaultValue={Meteor.user().profile.professional_title} />
			          			</div>
			          			<div className="form-group" id="industryFld">
			          				<label>Industry: </label>
			          				<input type="text" className="form-control typeahead" ref="industry" defaultValue={Meteor.user().profile.industry} />
			          			</div>
			          			<div className="form-group">
			          				<label> About Me: </label>
			          				<textarea className="form-control textAreaContent" ref="experience"  maxLength="300" defaultValue={Meteor.user().profile.experience} />
			          			</div>
			          			<div className="form-group">
			          				<label>Experience Highlights: </label>
			          				<textarea className="form-control textAreaContent" ref="education"  maxLength="300" defaultValue={Meteor.user().profile.education} />
			          			</div>
			          			<div className="form-group">
			          				<label>Facebook URL: </label>
			          				<input type="text" className="form-control" ref="facebook_url" defaultValue={Meteor.user().profile.facebook} />
			          			</div>
			          			<div className="form-group">
			          				<label>Twitter URL: </label>
			          				<input type="text" className="form-control" ref="twitter_url" defaultValue={Meteor.user().profile.twitter} />
			          			</div>
			          			<div className="form-group">
			          				<label>Linkedin URL: </label>
			          				<input type="text" className="form-control" ref="linkedin_url" defaultValue={Meteor.user().profile.linkedin} />
			          			</div>
		          				<div className="form-group">
		          					<label>Upload image</label>
		          					<div className="row">
		          						<div className="col-sm-2">
		          							<input type="file" ref="imageFile" id="imageFile" onChange={this.imageSubmit.bind(this)} />
		          						</div>
		          						<div className="col-sm-2">
				        	      		{
			  			          			this.props.images.map(function(img){
				  			            		return(
							              			<div key={img._id}>
							                			<img src={img.url()} className="img-responsive" alt="Invalid Image" />
							              			</div>
				  			            		)
			  			          			})
		  			        	  		}
				      		      		</div>
			    			      		<div className="col-sm-2">
			    			        		<button id="remove" className="btn btn-default" type="button" onClick={this.handleRemove.bind(this)}>
			    			          		<i className="fa fa-times" aria-hidden="true"></i>
			    			        		</button>
			    			      		</div>
			            				{/*<uploadImage />*/}
			            				{/*<button id="remove" className="btn btn-default" type="button" onClick={this.handleRemove}>
			                          		<i className="fa fa-times" aria-hidden="true"></i>
			                          	</button>*/}
		                  			</div>
		          				</div>
		          				<div className="mentor-btn">
		          					<div className="form-group">
		            					<button type="Submit" className="btn btn-primary pull-left">Update</button>
		          					</div>
		          					<div className="form-group">  
		            					<button type="reset" className="btn btn-default">Reset</button>
		          					</div>
		          				</div>
	        				</form>
	      		  		</div>
		             

		            	{/*-------------------------------------------------------------------------------------------------------
		                                                    No of messages/mentees Tab
		            	----------------------------------------------------------------------------------------------------------*/}   

	            		<div id="messageTab" className="tab-pane fade">
	        				<form role="form" onSubmit={this.handleSubmit.bind(this)}>
	          					<div className="form-group">
	          						<label>No. of messages per day: </label>
	          						<select  className="form-control" ref="noMessages">
	                					<optgroup label="Number of Messages">
			            					<option value="0">Unlimited</option>
			            					<option value="1">1</option>
			            					<option value="2">2</option>
			            					<option value="3">3</option>
			            					<option value="4">4</option>
			            					<option value="5">5</option>
			            					<option value="6">6</option>
			            					<option value="7">7</option>
			            					<option value="8">8</option>
			            					<option value="9">9</option>
			            					<option value="10">10</option>
			            				</optgroup>
	          						</select>
	          					</div>
	          					<div className="form-group">
	          						<label>No. of mentees per day: </label>
	          						<select className="form-control" ref="noMentees">
			           					<optgroup label="Number of Mentees">
			            					<option value="0">Unlimited</option>
			            					<option value="1">1</option>
			            					<option value="2">2</option>
			            					<option value="3">3</option>
			            					<option value="4">4</option>
			            					<option value="5">5</option>
			            					<option value="6">6</option>
			            					<option value="7">7</option>
			            					<option value="8">8</option>
			            					<option value="9">9</option>
			            					<option value="10">10</option>
			            				</optgroup>
	          						</select>
	          					</div>
	          					<div className="mentor-btn-only">
	          						<div className="form-group">
	              						<button type="Submit" className="btn btn-primary pull-left">Update</button>
	          						</div>
	        					</div>
	        				</form>
	      		  		</div>


			            {/*-------------------------------------------------------------------------------------------------------
			                                                    Interview Questions Tab
			            ----------------------------------------------------------------------------------------------------------*/}

	            		<div id="interviewquestionsTab" className="tab-pane fade">
		        			<form role="form" onSubmit={this.handleSubmit.bind(this)}>
			          			<div className="form-group">
			            			<div className="InterviewQuestions"><label>Interview Questions: </label></div>
			          			</div>
			          			<div className="form-group">
			            			<label>1. Pick an experience that you’d like to share with everyone. </label>
			          				<textarea className="form-control textAreaContent" ref="q1" defaultValue={Meteor.user().profile.question1} />
			          			</div>
			          			<div className="form-group">
			          				<label>2. What are the biggest lessons you learned in life? </label>
			          				<textarea className="form-control textAreaContent" ref="q2" defaultValue={Meteor.user().profile.question2} />
			          			</div>
			          			<div className="form-group">
			          				<label>3. What do you know now that you didn’t know before? </label>
			          				<textarea className="form-control textAreaContent" ref="q3" defaultValue={Meteor.user().profile.question3} />
			          			</div>
			          			<div className="form-group">
			          				<label>4. What are the biggest challenges that you ran into? </label>
			          				<textarea className="form-control textAreaContent" ref="q4" defaultValue={Meteor.user().profile.question4} />
			          			</div>
			          			<div className="form-group">
			          				<label>5. What steps have you taken that helped you land your present job? </label>
			          				<textarea className="form-control textAreaContent" ref="q5" defaultValue={Meteor.user().profile.question5} />
			          			</div>
			          			<div className="form-group">
			          				<label>6. If you could go back in time, what would you do differently? </label>
			          				<textarea className="form-control textAreaContent" ref="q6" defaultValue={Meteor.user().profile.question6} />
			          			</div>
			          			<div className="mentor-btn">
			          				<div className="form-group">
			              			<button type="Submit" className="btn btn-primary pull-left">Update</button>
			          				</div>
			          				<div className="form-group">  
			            				<button type="reset" className="btn btn-default">Reset</button>
			          				</div>
			          			</div>
		        			</form>
	            		</div>

			            {/*-------------------------------------------------------------------------------------------------------
			                                                     Change Password Tab
			            ----------------------------------------------------------------------------------------------------------*/}

			            <div id="passwordView" className="tab-pane fade">
			        		<form role="form" onSubmit={this.handleSave.bind(this)}>
			          			<div className="form-group">
			          				<label>Current Password :<span className="REQUIRED_FIELD">*</span></label>
			          				<input type="password" id="current" className="form-control" ref="current" />
			          				<p id="message"></p>
			          			</div>
			          			<div className="form-group">
			          				<label>New Password :<span className="REQUIRED_FIELD">*</span></label>
			          				<input type="password" id="new" className="form-control" ref="new" />
			          			</div>
			          			<div className="form-group">
			          				<label>Confirm Password :<span className="REQUIRED_FIELD">*</span></label>
			          				<input type="password" id="confirm" className="form-control" ref="confirm" />
			            		</div>
			          			<div className="mentor-btn">
			          				<div className="form-group">
			            				<button type="Submit" className="btn btn-primary pull-left">Update</button>
			          				</div>
			          				<div className="form-group">  
			            				<button type="reset" className="btn btn-default">Reset</button>
			          				</div>
			          			</div>
			        		</form>
			      		</div>

			            {/*-------------------------------------------------------------------------------------------------------
			                                                        Delete Profile Tab
			            --------------------------------------------------------------------------------------------------------*/}

	            		<div id="deleteProfile" className="tab-pane fade">
	        				<form role="form" onSubmit={this.handleDelete.bind(this)}>
	          					<div className="form-group">
	            					<label>Are you sure you want to delete your profile ?</label><br />
	            					<button className="btn btn-primary" type="submit">Delete</button>
	          					</div>
	        				</form>
	      		  		</div>
	    		  	</div>
	        	</div>
      		);
    	}
	}
}

export default createContainer(() => {
  	handle = Meteor.subscribe("MentorsList");
  	Meteor.subscribe("MyImage")''
	let user = Meteor.user();
	return {
	 	isReady: handle.ready(),
	  	user: Meteor.users.find({_id: Meteor.userId()}).fetch(),
	  	images: Session.get("imageId")? Images.find({_id: Session.get("imageId")}).fetch(): Images.find({_id: user.profile.image}).fetch()
	}
}, MentorProfile);