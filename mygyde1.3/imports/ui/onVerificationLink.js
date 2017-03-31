/*

/* Import Atmosphere Packages /

import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';

Accounts.onEmailVerificationLink(function(token,done){
	// console.log(token,"<<-- token")
	Accounts.verifyEmail(token,function(err){
		if(err){
			// window.alert(err.message)
			Bert.alert("Verify email link expired [403]", "danger", "growl-top-left");
		}else{
			Bert.alert("Email verified successfully", "info", "growl-top-left");
		}
	})
});*/