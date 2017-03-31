/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class componentNotFound extends React.Component {
	
	render(){
		return(				
			<div className="container">
				<div className="section-title-block">
					<h3 className="section-title">Page Not Found</h3>
					<p>
						The page you are looking is not Found.
					</p>
				</div>
			</div>
		)
	}
}