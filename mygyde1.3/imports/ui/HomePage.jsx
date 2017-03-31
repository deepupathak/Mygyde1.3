/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';

/* Import Atmosphere Packages */

import { $ } from 'meteor/jquery';

/* Import Modules */

import Slider from '../ui/Slider.jsx';
import Introduction from '../ui/Introduction.jsx';
import AboutUs from '../ui/AboutUs.jsx';
import WhatWeDo from '../ui/WhatWeDo.jsx';
import HowWeDo from '../ui/HowWeDo.jsx';
import Members_Component from '../ui/Members.jsx';
import FunFacts from '../ui/FunFacts.jsx';
import Testimonials from '../ui/Testimonials.jsx';
import Contact from '../ui/Contact.jsx';


export default class HomePage extends React.Component {
  	render(){
		return( 
			<div>
				<Slider />
				<Introduction />
				<AboutUs />
				<WhatWeDo />
				<HowWeDo />
				<Members_Component />
				<Testimonials />
				<Contact />
			</div>
		);
	}

	componentDidMount(){
		let windowHeight = $(window).height();	
		let windowWidth = $(window).width();
		
		let headerHeight = $('#main-header').height();
		$('.full-height').css('height', windowHeight - headerHeight);
		$('#n-carousel .item .carousel-image').each(function(){
			let imgSrc = $(this).attr('src');
			$(this).parent().css('background-image', 'url(' + imgSrc + ')');
			$(this).remove();
		});

		let slideNum = $('#n-carousel .item').length;
		for(let i=0; i< slideNum; i++){
			let insertData = '<li data-target="#n-carousel" data-slide-to="' + i + '"';
			if(i== 0){
				insertData += 'class="active"';
			}
			insertData += '></li>';
			$('#n-carousel ol').append(insertData);
		}
		let chooseHieght = $('.about-us').height();
		if($(window).width() > 992){
			$('.about-us .image-block').css('height', chooseHieght);
		}
	}
}