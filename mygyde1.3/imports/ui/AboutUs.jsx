/* Import React, Component and render */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class AboutUs extends React.Component {
	render() {
		return (
			<section className="about-us" id="our-story">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4 no-padding image-block hidden-xs">
							{/* we used this image as background image */}
						</div>

						<div className="col-md-8 col-lg-6 content-block">
							<div className="section-title-block-Story">
								<h3 className="section-title-Story">Our Story</h3>
								<p className="ourStory">
									Today's society offers many venues for people to share their knowledge or experience with others. Most famous people are highly accomplished yet most highly accomplished people aren't famous. As a result, the pool of experiences that our society offers is very narrow. Famous people dominate the social media landscape with their pages on Facebook, Instagram & LinkedIn. Millions of people flock to their sites for knowledge stories. But what about the courageous doctor that has offered free medical help to those in need all over the world? How about the local inventor who's helping to bring clean water to rural towns in Africa? What about the great math teacher in a local school in the Philippines that has inspired many classes of students? Why should the touch of these people be limited geographically? What can't their ideas be shared on a wider scale like those of celebrities and famous people? How can they inspire other doctors, teachers and inventors? This is one of the main driving factors behind launching MyGyde which helps "ordinary" people dissipate their knowledge and inspire others to follow suit.
								</p>
							</div> {/* .block-top-title ends */}
							

							<ul className="row choosing-reasons">
								<li className="col-sm-6 clearfix">
									<div className="icon-block-wrapper">
										<div className="icon-block"><span className="fa fa-dollar"></span></div>
									</div>
									
									<div className="reason-content">
										<h4>FREE</h4>
										<p className="justified">
											Although the experience one gains in life is valuable, we believe that sharing this experience should not be priced.
										</p>
									</div>
								</li> {/* .col-sm-6 ends */}

								<li className="col-sm-6 clearfix">
									<div className="icon-block-wrapper">
										<div className="icon-block"><span className="fa fa-comments-o"></span></div>
									</div>

									<div className="reason-content">
										<h4>NEW CONCEPT</h4>
										<p className="justified">
											MyGyde goes beyond a typical question & answer forum. MyGyde is a forum designed to help you ask the right questions and find the answers for yourself.
										</p>
									</div>
								</li> {/* .col-sm-6 ends */}

								<li className="col-sm-6 clearfix">
									<div className="icon-block-wrapper">
										<div className="icon-block"><span className="fa fa-globe"></span></div>
									</div>

									<div className="reason-content">
										<h4>CONNECT WITH EASE</h4>
										<p className="justified">
											MyGyde's purpose is to ease the flow of experience among individuals. Hence, it is natural that there be no barriers among the MyGyde community.
										</p>
									</div>
								</li> {/* .col-sm-6 ends */}

								<li className="col-sm-6 clearfix">
									<div className="icon-block-wrapper">
										<div className="icon-block"><span className="fa fa-unlock"></span></div>
									</div>

									<div className="reason-content">
										<h4>OPEN</h4>
										<p className="justified">
											Any person from any walk of life can learn and contribute to the MyGyde community. We all have interesting stories our lives can tell and many more can learn.
										</p>
									</div>
								</li> {/* .col-sm-6 ends */}
							</ul> {/* .choosing-reasons ends */}
						</div> {/* .content-block ends */}

						<div className="col-lg-2 no-padding image-block narrow-image visible-lg">
							{/* we used this image as background image */}
						</div>
					</div> {/* .row ends */}
				</div> {/* .container-fluid ends */}
		  	</section>
		)
	}
}