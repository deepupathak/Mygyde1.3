/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class HowWeDo extends React.Component {
	
	handleClick(event){
		event.preventDefault();
		// FlowRouter.path('/signup');
		window.location.href = "/signup";
	}
	
	render(){
		return(
			<section className="section-block how-we-work" id="become-a-mentor">
				<div className="container">
					<div className="row">
						<div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-8 col-sm-offset-2 content-block">
							<div className="section-title-block-become">
								<h3 className="section-title-become">Become a Mentor</h3>
								<p className="become_a_Mentor">
									Mentors are more powerful than you can possibly imagine in their ability to transform a mentee’s life. MyGyde encourages individuals from all walks of life to contribute and give back. If you believe that others can learn from your experience and would like to coach aspiring individuals then go ahead and join. We all have unique experiences that others would like to know more about. How did you learn Russian? What is the best way to plan a backpacking trip through South East Asia? How did you prepare for your interview at Tesla?  How did you start your own bakery business?
								</p>
							</div>
			        		<div className="row process">
								
								<div className="col-md-4 clearfix">
									<div className="icon-block-wrapper">
										<div className="icon-block"><span className="fa fa-microphone"></span></div>
									</div>
									<div className="work-content">
										<h4>Share your experience</h4>
										<p className="justified">
											We do believe that we all have a story to tell or an experience to share. We are inherently in the business of helping others thrive. Leaders grow by developing the talent surrounding them. 
										</p>
									</div>
								</div>

								<div className="col-md-4 clearfix">
									<div className="icon-block-wrapper">
										<div className="icon-block"><span className="fa fa-refresh"></span></div>
									</div>
									<div className="work-content">
										<h4>Flexible Give Back</h4>
										<p className="justified">
											MyGyde allows mentors to rate limit the number of mentees and questions per mentee received per day. Sometimes a minute per day will make a difference in someone’s life.
										</p>
									</div>
								</div>

								<div className="col-md-4 clearfix">
									<div className="icon-block-wrapper">
										<div className="icon-block"><span className="fa fa-user-plus"></span></div>
									</div>
									<div className="work-content">
										<h4>Build your Brand</h4>
										<p className="justified">
											Mentors can build their profile and answer the interview questions on their public page. This will allow mentors to build a good reputation which plays a positive role in today’s globalized societies.
										</p>
									</div>
								</div>
							</div>
						    <div className="process col-md-4 col-md-offset-4 become-btn" >
						      	<div className="caption-btns">
						        	<button className="btn btn-main" onClick={this.handleClick}>Become A Mentor</button>
						      	</div>
						    </div> 
						</div>
					</div>
			  	</div>
			</section>
		)
	}
}