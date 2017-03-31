import { FlowRouter } from 'meteor/kadira:flow-router';
// import { ReactLayout } from 'meteor/kadira:react-layout';

import { mount } from 'react-mount-layout';

import MainLayout from '../imports/ui/MainLayout.jsx';
import HomePage from '../imports/ui/HomePage.jsx';
import MentorSignUp from '../imports/ui/MentorSignUp.jsx';
import MentorHome from '../imports/ui/MentorHome.jsx';
import MenteeLoggedIn from '../imports/ui/MenteeLoggedIn.jsx';
import MentorProfile from '../imports/ui/MentorProfile.jsx';
import Conversation_page from '../imports/ui/Conversation_page.jsx';
// import componentNotFound from '../imports/ui/componentNotFound.jsx';


/*FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()){
  	redirect('home')
	}
}], {except: ["home"]});


FlowRouter.notFound = {
  action() {
  	mount(MainLayout,{content: <componentNotFound />})
  }
};*/

FlowRouter.route('/', {
  	name: 'home',
  	action() {
    	mount(MainLayout,{content: <HomePage />});
  	}
});

FlowRouter.route('/signup', {
	name: 'MentorSignup',
	action() {
		mount(MainLayout, {content: <MentorSignUp />});
	}
});


FlowRouter.route('/MenteeSignIn',{
  	name: 'MenteeSignIn',
  	action() {
    	mount(MainLayout,{content: <MenteeLoggedIn />})
  	}
});

FlowRouter.route('/mentor/:_id', {
	name: 'mentor',
	action(params) {
  		mount(MainLayout, {content: <MentorHome id={params._id} />});
	}
});

FlowRouter.route('/profile', {
  	name: 'profile',
  	action() {
    	mount(MainLayout, {content: <MentorProfile />});
  	}
});


FlowRouter.route('/conversation', {
 	name: 'ConversationLayout',
 	action(params) {
 		mount(MainLayout, {content: <Conversation_page />});
	}
});

FlowRouter.route('/conversation/:id', {
 	name: 'Conversation',
 	action(params) {
 		mount(MainLayout, {content: <Conversation_page uid={params.id} />});
	}
});