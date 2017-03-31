/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Introduction extends React.Component {
	render(){
		return(
			<section className="section-block intro" id="intro">
				<div className="container">
					<div className="row">
						<div className="section-title-block">
							<h3 className="section-title">Welcome to myGyde</h3>
						</div> {/* .section-title-block ends */}

						<div className="col-md-4 intro-content">
							<div className="wrap">
								<div className="icon-block"><span className="fa fa-arrows-alt"></span></div>
								<h4>The future in focus</h4>
								<p className="justified">
									Sometimes the future looks blurry. The decisions one has to take through life can be overwhelming. This is especially true in today’s fast-paced and complex environment. By talking to the right people and with the right connections, the future comes into focus.
								</p>
							</div>
						</div> {/* .intro-content ends */}

						<div className="col-md-4 intro-content">
							<div className="wrap">
								<div className="icon-block"><span className="fa fa-globe"></span></div>
								<h4>Global, the new local</h4>
								<p className="justified">
									The level of integration in today’s world is unprecedented. Human capital flows freely across borders and talent is ever more accessible. Better navigating the professional and academic labyrinth requires talking to mentors with international and diverse backgrounds.
								</p>
							</div>
						</div> {/* .intro-content ends */}

						<div className="col-md-4 intro-content">
							<div className="wrap">
								<div className="icon-block"><span className="fa fa-users"></span></div>
								<h4>Collaboration is Key</h4>
								<p className="justified">
									Surrounding yourself with people of high caliber and different outlooks and perspectives is crucial to developing strong sense of what motivates you. Success is achieved from being challenged and critiqued and having the ability to properly explain your ideas.
								</p>
							</div>
						</div> {/* .intro-content ends */}
					</div> {/* .row ends */}
				</div> {/* .container ends */}
			</section>
		)
	}
}