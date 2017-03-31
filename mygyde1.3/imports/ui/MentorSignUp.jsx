/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

/* Import Atmosphere Packages */

import { $ } from 'meteor/jquery';
import { Bert } from 'meteor/themeteorchef:bert';

/* Import mongo Collections */

import { Images } from '../api/imageCollection.js';

export default class MentorSignUp extends React.Component {
	confirm(e){
		e.preventDefault();
		let pass = ReactDOM.findDOMNode(this.refs.password).value;
		let confPass = ReactDOM.findDOMNode(this.refs.cpass).value;
		$("#ConfirmPassword").removeClass("alert-warning").addClass("alert-danger");
		if(pass != confPass){
		  	$("#ConfirmPassword").addClass("alert-danger").removeClass("alert-success");
		}else{
		  	$("#ConfirmPassword").removeClass("alert-danger").addClass("alert-success");
		}
	}
	verify(password){
		let pattern = /(?=.*\d)(?=.*[A-Z]).{6,50}/g;
		$("#description").removeClass("alert-warning").addClass("alert-danger");
		if(pattern.test(password)){
			$("#description").removeClass("alert-danger").addClass("alert-success");
			return true;
		}else{
			$("#description").addClass("alert-danger").removeClass("alert-success");
			return false;
		}
	}
	DrawCaptcha() {  
		let a = 49, b = 65;  
		let c = 100;  
		let d = 70;  
		let element = this.refs.txtCaptcha;  
		element.onselectstart = function () { return false; } // ie  
		element.onmousedown = function () { return false; } // mozilla  
		if(a == 49) {  
			a = 57;  
		}  
		let main = ReactDOM.findDOMNode(this.refs.txtCaptcha);  
		main.value ="";       
		let a1 = String.fromCharCode(64+Math.random()*10+1);  
		let b1 =String.fromCharCode(64+(Math.random()*10)+1);  javascript:void(0)
		let c1 = String.fromCharCode(64+(Math.random()*10)+1);  
		let d1 = String.fromCharCode(64+(Math.random()*10)+1);  
		main.value = a1 +" "+ b1 +" "+ c1 + " "+d1+" "+ String.fromCharCode(64+(Math.random()*10)+2)+ " "+String.fromCharCode(64+(Math.random()*10)+1);  
		//alert(main.value)  
	}
	removeSpaces(string){
		return string.split(' ').join(''); 
	}
	check(){
	let str1 = this.removeSpaces(this.refs.txtCaptcha.value);  
	let str2 = this.refs.txtInput.value;  
	if (str1.toLowerCase() != str2.toLowerCase()) {   
		return true; 
	}
		return false;
	}
	captchaReset(){
		this.DrawCaptcha()
	}
  	componentDidMount(){
	    this.DrawCaptcha();

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
  	checkEmail(email){
	    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if(pattern.test(email)){
	      	if(Meteor.users.find({'emails.0.address': email}).count() == 0 ){
	        	// console.log("Email not exists")
	        	$("#emailmessage").text(" ");
	      	}else{
	        	// console.log("Email already exists")
	        	$("#emailmessage").text("Email already exists");
	      	}
	    }else{
	      	$("#emailmessage").text(" ");
	    }
  	}
  	render(){
	    return(
	      	<div>
		        <div id="imageFade">
		          <div id="imageContainer2">
		            <img id="loader" src="/loading.gif" />
		          </div>
		        </div>
		        <div>
		          	{/*<!-- PAGE TITLE STARTS -->*/}
		          	<section className="section-block page-title-block post-page" id="page-title-block"></section>
		          	{/*<!-- PAGE TITLE ENDS -->*/}

		          	<div className="mentor-container">
			            <div className="section-title-block">
			              	<h3 className="section-title">Mentor Sign up Form</h3>
			            </div>
			            <form role="form" id="register-form" onSubmit={this.handleSubmit.bind(this)}>
			              	<div className="form-group">
			                	<p className="REQUIRED_FIELD_TEXT"><span className="REQUIRED_FIELD">*</span>&nbsp;is a required field.</p>
			              	</div>
			              	<div className="form-group">
			                	<label>Name or Nickname:<span className="REQUIRED_FIELD">*</span></label><p>What is displayed on your public profile.</p>
			                	<input type="text" className="form-control" id="name" ref="name" placeholder="Name or Nickname" required maxLength="15"/>
			              	</div>
			              	<div className="form-group">
			                	<label>Full Name:<span className="REQUIRED_FIELD">*</span></label>
			                	<input type="text" className="form-control" id="fullName" ref="fullName" placeholder="Full Name" required maxLength="20"/>
			              	</div>
			              	<div className="form-group">
			                	<label>Email Id :<span className="REQUIRED_FIELD">*</span></label>
			                	<input type="email" className="form-control" id="email" onChange={() =>{this.checkEmail(this.refs.email.value)}} ref="email" placeholder="Email Id" required/>
			                	<p id="emailmessage"></p>
			              	</div>
			              	<div className="form-group">
			                	<label>Password :<span className="REQUIRED_FIELD">*</span></label>  
			                	<input type="password" className="form-control" id="password" ref="password" placeholder="Password" onChange ={()=>{this.verify(this.refs.password.value)}} required/>
			                	<div id="description" className="alert alert-warning text-caption"> 
			                  	<a href="" className="close" aria-label="close"></a>
			                  	Password must be minimum 6 characters long including Numbers and Uppercase letters.
			                	</div>
			              	</div>
			              	<div className="form-group">
			                	<label>Confirm Password :<span className="REQUIRED_FIELD">*</span></label>  
			                	<input type="password" className="form-control" id="cpass" ref="cpass" placeholder="Confirm Password" onChange ={this.confirm.bind(this)} required/>
			                	<div id="ConfirmPassword" className="alert alert-warning text-caption"> 
			                  	<a href="" className="close" aria-label="close"></a>
			                  	Passwords must match.
			                	</div>
			              	</div>         
			              	<div className="form-group" id="countryFld">
			                	<label>Country :<span className="REQUIRED_FIELD">*</span></label>
			                	<input type="text" className="form-control typeahead" id="country" ref="country" placeholder="Country" maxLength="25" required/>
			              	</div>
			              	<div className="form-group">
			                	<label>City :<span className="REQUIRED_FIELD">*</span></label>
			                	<input type="text" className="form-control" id="city" ref="city" placeholder="City" required maxLength="25" />
			              	</div>
			              	<div className="form-group">
			                	<label>Professional Title :<span className="REQUIRED_FIELD">*</span></label>
			                	<input type="text" className="form-control" id="ptitle" ref="ptitle" placeholder="Professional Title" required maxLength="30" />
			              	</div>
			              	<div className="form-group" id="industryFld">
			                	<label>Industry :<span className="REQUIRED_FIELD">*</span></label>
			                	<input type="text" className="form-control typeahead" id="industry" ref="industry" placeholder="Industry" maxLength="25" required/>
			              	</div>
			              	<div className="form-group">
			                	<label>About Me :</label><br />
			                	<textarea className="form-control textAreaContent" id="experience" ref="experience" placeholder="Tell us a little bit about yourself. (Please limit your answer to 300 characters)"  maxLength="300"/>
			              	</div>
			              	<div className="form-group">
			                	<label>Experience Highlights :</label><br />
			                	<textarea className="form-control textAreaContent" id="education" ref="education" placeholder="Please provide highlights of your experiences. Make sure to include topics you expect mentees to ask you about. (Please limit your answer to 300 characters)" maxLength="300"/>
			              	</div>
			              	<div className="form-group">
			                	<label>Upload Image :</label>  
			                	<input type="file" ref="imageFile" id="imageFile" onChange={this.uploadImage.bind(this)}/>
			                	<p id="message"></p>
			              	</div>
			              	<div className="form-group">
			                	<label>Facebook URL :</label>
			                	<input type="text" className="form-control" id="facebook_url" ref="facebook_url" placeholder="Facebook URL" />
			              	</div>
			              	<div className="form-group">
			                	<label>Twitter URL :</label>
			                	<input type="text" className="form-control" id="twitter_url" ref="twitter_url" placeholder="Twitter URL" />
			              	</div>  
			              	<div className="form-group">
			                	<label>Linkedin URL :</label>
			                	<input type="text" className="form-control" id="linkedin_url" ref="linkedin_url" placeholder="Linkedin URL" />
			              	</div>

			              	{/*------------------- Captcha --------------------*/}

			              	<div className="form-group">
			                	<label className="captch-label">Captcha :<span className="REQUIRED_FIELD">*</span></label>
			                	<div className="col-sm-6 no-padding">
			                    	<input type="text" className="form-control" required id="txtInput" ref="txtInput" /> 
			                	</div>
			                	<div className="col-sm-4">   
			                    	<input type="text" className="form-control" id="txtCaptcha" ref="txtCaptcha" size="12" />
			                	</div>
			                	<div className="col-sm-2">  
			                  		<span className="captcha-reset" onClick={this.captchaReset.bind(this)}><i className="fa fa-refresh"></i></span>
			                	</div>
			              	</div>
			              	<div className="mentor-btn">
			                	<div className="form-group">
			                  		<button type="submit" className="btn btn-primary pull-left">Sign up</button>
			                	</div>
			                	<div className="form-group">
			                  		<button type="button" onClick={this.back.bind(this)} className="btn btn-default">Back</button>
			                	</div>
			              	</div>
			            </form>
		          	</div>
		        </div>
	      	</div>
	    );
  	}
	uploadImage(ev){
		ev.preventDefault();
		let ImageFile = document.getElementById('imageFile').files[0];
		// console.log(ImageFile,"<-- File -->", ImageFile.size);
		if(screen.width < 1000){
			if(ImageFile.size > 627092){
				$("#message").text("Image size should not be higher than 600 kb");
				return false;
			}else{
				$("#message").text("");
				return true;
			}
		}else{
			$("#message").text("");
			return true;
		}
	}
	back(ev){
		ev.preventDefault();
		window.location.href = "/";
	}
  	handleSubmit(e){
	    e.preventDefault();
	    let pswd =  ReactDOM.findDOMNode(this.refs.password).value;
	    let cpswd = ReactDOM.findDOMNode(this.refs.cpass).value;
	    let pattern = /(?=.*\d)(?=.*[A-Z]).{6,50}/g;
	    that = this
	    if(pattern.test(pswd) == false){
	      Bert.alert("Please input password in required format.", "warning", "growl-top-left")
	    }else if(pswd != cpswd){
	      Bert.alert("Password Mismatch.", "warning", "growl-top-left")
	    }else if(this.check()){
	      Bert.alert("Wrong Captcha.", "warning", "growl-top-left")
	    }else{
      		let file = document.getElementById('imageFile').files[0];
      		// console.log(file,"**********");
      		let password = ReactDOM.findDOMNode(this.refs.password).value,
     		userData = {
        		email : ReactDOM.findDOMNode(this.refs.email).value,
        		profile: {
          			name : ReactDOM.findDOMNode(this.refs.name).value,
          			fullName : ReactDOM.findDOMNode(this.refs.fullName).value,
          			mtype : "mentor",
          			country : ReactDOM.findDOMNode(this.refs.country).value,
          			city : ReactDOM.findDOMNode(this.refs.city).value,
          			professional_title : ReactDOM.findDOMNode(this.refs.ptitle).value,
          			industry : ReactDOM.findDOMNode(this.refs.industry).value,
          			experience : ReactDOM.findDOMNode(this.refs.experience).value,
          			education : ReactDOM.findDOMNode(this.refs.education).value,
          			facebook : ReactDOM.findDOMNode(this.refs.facebook_url).value,
          			twitter : ReactDOM.findDOMNode(this.refs.twitter_url).value,
          			linkedin : ReactDOM.findDOMNode(this.refs.linkedin_url).value
        		}
      		}

			document.getElementById('imageContainer2').style.display = 'block';
			document.getElementById('imageFade').style.display = 'block';
      
      		if(file){
        		Images.insert(file, function(err, fileObj){
          			if(err){
            			// console.log(err," Error ");
            			Bert.alert("Error while uploading image.", "danger", "growl-top-left");
          			}else{
            			// console.log("Success File Id: ->", fileObj._id, fileObj.size());
            			if(screen.width < 1000){
              				if(fileObj.size() < 627100) {
                				$("#message").text("");
                				Meteor.call("createMentor", userData, password, function(err, id){
                  					if(err){
                    					// console.log(err)
                    					Bert.alert("Error while creating mentor user.", "warning" , "growl-top-left");
                    					document.getElementById('imageContainer2').style.display = 'none';
                    					document.getElementById('imageFade').style.display = 'none';
                  					}else{
                    					MeteorCallFunctionAsync = Meteor.wrapAsync(MeteorCallFunction, {});
                    					function MeteorCallFunction(fileObjId, Id, callback){
                      						// console.log("++++++ ", fileObjId , Id);
                      						Meteor.call("saveImage", fileObjId, Id);
                      						window.alert("Account Created Successfully. Verification Link has been send to your given email Id. Please verify email to activate your account. ");
                      						window.location.href="/";

                      						callback(null, 1);
                    					}
                    					MeteorCallFunctionAsync(fileObj._id, id);
                					}
                				});
              				}else{
                				$("#message").text("Image size should not be higher than 600 kb");
                				// window.alert("Image size should not be higher than 600 kb");
                				document.getElementById('imageContainer2').style.display = 'none';
                				document.getElementById('imageFade').style.display = 'none';
              				}
            			}else{
              				$("#message").text("");
              				Meteor.call("createMentor", userData, password, function(err, id){
                				if(err){
                  					// console.log(err)
                  					Bert.alert("Error while creating mentor user.", "danger", "growl-top-left");
                  					document.getElementById('imageContainer2').style.display = 'none';
                  					document.getElementById('imageFade').style.display = 'none';
                				}else{
                  					MeteorCallFunctionAsync = Meteor.wrapAsync(MeteorCallFunction, {});

                  					function MeteorCallFunction(fileObjId, Id, callback){
                    					// console.log("++++++ ", fileObjId , Id);
                    					Meteor.call("saveImage", fileObjId, Id);
                    					window.alert("Account Created Successfully. Verification Link has been send to your given email Id. Please verify email to activate your account. ");
                    					window.location.href="/";

                    					callback(null, 1);
                  					}

                  					MeteorCallFunctionAsync(fileObj._id, id);
                				}
              				});
            			}
          			}
        		});
      		}else{
        		$("#message").text("");

        		Meteor.call("createMentor", userData, password, function(err, id){
          			if(err){
            			// console.log(err)
            			Bert.alert("Error while creating mentor user.", "warning", "growl-top-left");
            			document.getElementById('imageContainer2').style.display = 'none';
            			document.getElementById('imageFade').style.display = 'none';
          			}else{
            			MeteorFunctionAsync = Meteor.wrapAsync(MeteorCallFunction, {});
            			function MeteorCallFunction(Id, callback){
              				// console.log("++++++ ", fileObjId , Id);
              				Meteor.call("defaultImage", Id);
              				window.alert("Account Created Successfully. Verification Link has been send to your given email Id. Please verify email to activate your account. ");
              				window.location.href="/";

              				callback(null, 1);
            			}
            			MeteorFunctionAsync(id);
          			}
        		});
      		}
    	}
  	}
}