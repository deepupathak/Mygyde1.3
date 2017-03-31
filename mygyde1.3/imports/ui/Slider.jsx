/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Slider extends React.Component {
	render(){
		return(
			<section className="slider" id="slider">
				<div id="n-carousel" className="carousel fade">
					{/* Wrapper for slides */}
		  			<div className="carousel-inner full-height" role="listbox">
		  				<div className="item active">
		  					{/* PUT YOUR IMAGE HERE */}
					    	<img className="img-responsive carousel-image" src="/Main2.jpg" alt="carousel image" />
					    	{/* IMAGE SIZE SHOULD BE 1920x1080 */}
					    	<div className="carousel-caption">
		                        <div className="caption-wrapper">
		                            <h3>Welcome to myGyde</h3>
		                            <h1 className="caption-title"><span>Putting your</span> <strong>Experience</strong> <span>to Work</span></h1>
		                            <p className="caption-content">
		                                MyGyde platform allows you to connect and share your experience with others.
		                            </p>
		                            <div className="caption-btns">
		                                <a className="btn btn-main" data-scroll href="#our-mentors"> Our Mentors </a>
		                                <a className="btn btn-ghost" data-scroll href="#intro"> Read More </a>
		                            </div>
		                        </div>
					    	</div>
					    </div>
					</div>
				</div>
			</section>
		)
	}
}