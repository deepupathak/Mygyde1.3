/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class WhatWeDo extends React.Component {
	render(){
		return(
			<section className="section-block what-we-do" id="what-we-do">
				<div className="container">
					<div className="section-title-block">
						<h3 className="section-title">The Idea</h3>
					</div>
					<div className="row">
						<div className="content-block col-md-8 col-md-offset-2 videoWrapper">
		          			<iframe src="http://www.youtube.com/embed/YelYKoCr6Ys?playlist=0Ismlsq35k8" 
		          			width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>	
		        		</div>
					</div>
				</div>
			</section>			
		)
	}
}