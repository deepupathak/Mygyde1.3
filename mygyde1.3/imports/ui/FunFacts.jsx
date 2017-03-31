/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class FunFacts extends React.Component {
	render(){
		return(
			<section className="fun-facts section-block" id="fun-facts">
				<div className="container">
					<div className="row">
						<div className="col-md-4 col-sm-6 content-block">
							<div className="content-wrapper">
								<div className="icon-block"><span className="fa fa-comments-o"></span></div>
									<h4><strong className="counter">256</strong>Messages</h4>
							</div>
						</div> {/*.content-block ends */}
						<div className="col-md-4 col-sm-6 content-block">
							<div className="content-wrapper">
								<div className="icon-block"><span className="fa fa-user"></span></div>
								<h4><strong className="counter">30</strong>Mentors</h4>
							</div>
						</div> {/*.content-block ends */}
						<div className="col-md-4 col-sm-6 content-block">
							<div className="content-wrapper">
								<div className="icon-block"><span className="icon ion-ios-people-outline"></span></div>
								<h4><strong className="counter">345</strong>Mentees</h4>
							</div>
						</div> {/*.content-block ends */}
					</div> {/*.row ends */}
				</div> {/*.container ends */}
			</section>
		)
	}
}