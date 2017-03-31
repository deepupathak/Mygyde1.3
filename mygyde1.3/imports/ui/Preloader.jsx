/* Import React, Component, render and reactDOM */

import React, { Component } from 'react';
import { render } from 'react-dom';

export default class PreLoader extends React.Component {
	render() {
		return (
			<section className="pre-loader">
				<h3 className="sr-only">Pre loader</h3>
			    <div className="loader-inner ball-scale">
			      	<div></div>
			    </div>
			</section>
		)
	}
}