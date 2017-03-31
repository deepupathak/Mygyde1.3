/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Footer extends React.Component {
	componentDidMount(){
  		!function(d,s,id){
			var js;
			var fjs=d.getElementsByTagName(s)[0];
			var p=/^http:/.test(d.location)?'http':'https';
			if(!d.getElementById(id)) {
				js=d.createElement(s);
				js.id=id;
				js.src=p+'://platform.twitter.com/widgets.js';
				fjs.parentNode.insertBefore(js,fjs);
			}
		}(document, 'script', 'twitter-wjs');
  	}

	render(){
		return(
			<footer className="main-footer">
				<div className="container">
					<div className="row footer-content">
						<div className="content-block short-about">
							<h5 className="block-heading">MyGyde Legal Disclaimer</h5>
							<p className="justified">
		            			MyGyde is not held accountable to any advice from any of our mentors. This web site is a general service that connects mentees to mentors over the Internet. We are not an accredited firm and our mentors are acting as independent consultant. Any guarantee on the Site is subject to our Terms and Conditions. For the most part, our Terms and Conditions specify that there is no guarantee or warranty and that we are not responsible for any loss, injury, claim, liability, or damage ("damages") related to your use of this Site, whether from errors or omissions in the messages of our mentors or any information on our site.
		          			</p>

							<ul className="social-links">
								<li>
									<a href="http://www.facebook.com/mygydeorg" target="_blank">
										<div className="icon-block"><span className="fa fa-facebook"></span></div>
										<span className="sr-only">Facebook</span>
									</a>
								</li>

								<li>
									<a href="https://twitter.com/mygydeorg" target="_blank">
										<div className="icon-block"><span className="fa fa-twitter"></span></div>
										<span className="sr-only">Twitter</span>
									</a>
								</li>

								<li>
									<a href="https://www.reddit.com/user/mygyde/" target="_blank">
										<div className="icon-block"><span className="fa fa-reddit"></span></div>
										<span className="sr-only">Reddit</span>
									</a>
								</li>

								<li>
									<a href="https://www.linkedin.com/company/mygyde?trk=biz-companies-cym" target="_blank">
										<div className="icon-block"><span className="fa fa-linkedin"></span></div>
										<span className="sr-only">Linkedin</span>
									</a>
								</li>

								<li>
									<a href="https://www.pinterest.com/mygyde/" target="_blank">
										<div className="icon-block"><span className="fa fa-pinterest"></span></div>
										<span className="sr-only">Pinterest</span>
									</a>
								</li>
							</ul> {/* .social-links ends */}

							<span>
								<a href="https://twitter.com/mygydeorg" className="twitter-follow-button" data-show-count="false">Follow @mygydeorg</a>
							</span>
						</div> {/* .short-about ends */}

						{/* clearfix for not breaking the layout */}
						{/* <div className="clearfix visible-md visible-sm"></div> */}

						{/*<div className="col-lg-2 col-md-2 col-sm-6 content-block useful-links pull-right">
							<h5 className="block-heading">Usefull links</h5>
							<ul>
								<li><a data-scroll href={FlowRouter.getRouteName()=='home'?"#our-story":FlowRouter.path('home')}>Our Story</a></li>
								<li><a data-scroll href={FlowRouter.getRouteName()=='home'?"#become-a-mentor":FlowRouter.path('home')}>Become a Mentor</a></li>
								<li><a data-scroll href={FlowRouter.getRouteName()=='home'?"#our-mentors":FlowRouter.path('home')}>Our Mentors</a></li>
								<li><a data-scroll href={FlowRouter.getRouteName()=='home'?"#contact-us":FlowRouter.path('home')}>Contact Us</a></li>
								<li><a id="login" data-toggle="modal" href="" onClick={this.callModal}>Login/Signup</a></li>
							</ul>
						</div>*/} {/* .useful-links ends */}

						{/*<div className="col-lg-4 col-sm-12 content-block twitter-updates">
							<h5 className="block-heading">Twitter Updates</h5>

							<ul className="tweet-list">
								<li>
									<p className="tweet"><a href="#">@procodr</a> - Checkout our latest template of creative agency you know that - <a href="#">bit.ly/X08ZBsUx9 </a></p>
									<p className="tweet-time"><span className="fa fa-twitter"></span> - 2 hours ago</p>
								</li>
								<li>
									<p className="tweet"><a href="#">@procodr</a> - Checkout our latest template of creative agency that we made - <a href="#">bit.ly/X08ZBsUx9 </a></p>
									<p className="tweet-time"><span className="fa fa-twitter"></span> - 2 hours ago</p>
								</li>
							</ul> {/* .tweet-link ends 
						</div>*/} {/* .twitter-updates ends */}
					</div> {/* .row ends */}
				</div> {/* .container ends */}

				<div className="copyright-info">
				 	<div className="container">
				 		<div className="row">
				 			<div className="col-md-4 col-md-offset-4 col-sm-4 col-sm-offset-4 copyright-block">
				 				<p>Developed by <a href="http://www.sunnyapps.co" target="_blank">SunnyApps</a> Technologies</p>
				 			</div>
				 		</div>
				 	</div>
					<div className="back-to-top">
					 	<a data-scroll="true" href="#main-header" title="Back to Top"><span className="fa fa-angle-double-up"></span></a>
					</div>
				</div>
			</footer>
		)
	}
}