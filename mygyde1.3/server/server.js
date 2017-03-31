/*-------------------------- Code for Sending email verification link -----------------------------*/


if (Meteor.isServer) {
  	Meteor.startup(function(){
   		process.env.MAIL_URL='smtp://postmaster%40sandboxd34eeb750945482aa291a99580b63b35.mailgun.org:8982fe8c27c2cfbaf1cbb6c596666adb@smtp.mailgun.org:465';
   		Accounts.config({
     		sendVerificationEmail: true
   		})
 	});

  	/*------------------ Code for sending message on verification email for mentor and mentee ------------------*/
 	
 	Accounts.emailTemplates.siteName = "MyGyde"; 
  	Accounts.emailTemplates.from = "MyGyde <notification@mygyde.org>";
  	Accounts.emailTemplates.verifyEmail.subject = function (user) {
    	return "MyGyde - Account Verification";
  	};
  	Accounts.emailTemplates.verifyEmail.html = function (user, url) {
   		// var site = Site.find().fetch();
   		//  console.log(site[0].siteName);
    	if(user.profile.mtype == "mentor"){
      		return " <p> Thank you for signing up to MyGyde and your interest in helping others fulfill their vision.</p>"
      		+"<p> By joining MyGyde, you are now part of a strong mentorship network whose collective experiences will really make a difference in society. You can also use this opportunity to increase your sphere of influence by sharing the ideas and principles you think were instrumental in helping you achieve your current standing.</p>"
      		+"<p> The MyGyde team welcomes you to the community and looks forward to your valuable contributions.  </p>"
      		+"<p> <i>“The wise man does not lay up his own treasures. The more he gives to others, the more he has for his own”—Lao Tzu </i></p>"
      		+"<p> <b> Validate email link </b></p>" + '<a href="' + url + '">' + url + '</a>';
    	}else if(user.profile.mtype == "mentee"){
      		return "<p> Thank you for signing up to MyGyde! </p>"
      		+ "<p> MyGyde’s mission can be fundamentally reduced to one phrase: Connecting People </p>"
      		+"<p> We hope that you take this opportunity to learn from our dedicated pool of mentors and forge the right connections. No matter what part of the journey you’re on, you’ll find that MyGyde is a worthwhile stop that will help you go further.  Always remember that the knowledge you seek is out there. You just have to look in the right places, and this is a great start.</p>"
      		+"<p> The MyGyde team welcomes you to the community and wishes you the best in your quest for knowledge.  </p>"
      		+"<p> <b> Validate email link </b></p>" + '<a href="' + url + '">' + url + '</a>';
    	}
  	};
}