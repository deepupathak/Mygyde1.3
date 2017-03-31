/* Import React, Component, render */

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

/* Import Atmosphere Packages */

import { $ } from 'meteor/jquery';

/* Import Modules */

import SignInSignUpModal from '../ui/SignInSignUpModal.jsx';
import Header from '../ui/Header.jsx';
import Footer from '../ui/Footer.jsx';
// import PreLoader from '../ui/Preloader.jsx';
import smoothScroll from '../js/smooth-scroll.min.js';

export default class MainLayout extends Component {
	render() {
		return (
			<div id="home-page" className="home-page">
				<SignInSignUpModal />
				{/*<PreLoader />*/}
				<Header />
				{this.props.content}
				<Footer />
			</div>
		);
	}

	componentDidMount(){

		/**
	 	* WINDOW ONLOAD EVENT
	 	*/
		/* REMOVING PRELOADER */
		$(window).on('load', function() {
	    	$('.pre-loader').fadeOut('slow').remove();
		});

		/*** Initializing the main carousel ***/

		$('#n-carousel').carousel({
		    interval: 8000,
		    pause: false
		});


		/*** Initializing the smooth scroll ***/

		smoothScroll.init({
	    	updateURL: false
		});


		if (window.location.hash) {
		    var options = {
		      	speed: 1000
		    }; // Any custom options you want to use would go here
		    smoothScroll.animateScroll(null, window.location.hash, options);
		}


		/*** Initializing the popup js ***/

		/*var options = {
		    type: 'image',
		    height: 500
		};
		$('a.popup').popup(options);*/


		/*** making scroll spy ***/

		$('body').scrollspy({
	    	target: '#n-main-nav'
		});


		/*** initializing the plugins for mixit up ***/

		/*$(function() {
		    $('#n-portfolio').mixitup({
		      	targetSelector: '.portfolio-item',
		      	transitionSpeed: 450
		    });
		});*/

		/*** initializing the counter up plugin ***/

		/*$('.counter').counterUp();*/

		/*** makeing full height carousel !! ***/

		var windowHeight = $(window).height();

		var windowWidth = $(window).width();

		// header height count and removing

		var headerHeight = $('#main-header').height();

		$('.full-height').css('height', windowHeight - headerHeight); // you can disable this full height

		/*** making carousel image to background image ***/

		$('#n-carousel .item .carousel-image').each(function() {
		    var imgSrc = $(this).attr('src');

		    $(this).parent().css('background-image', 'url(' + imgSrc + ')');

		    $(this).remove();
		});

		/*** creating carousel indicators */

		var slideNum = $('#n-carousel .item').length;

		for (var i = 0; i < slideNum; i++) {
	    	var insertData = '<li data-target="#n-carousel" data-slide-to="' + i + '"';

		    if (i == 0) {
		      	insertData += 'className="active"';
		    }

	    	insertData += '></li>';
			$('#n-carousel ol').append(insertData);
		}


		/* control the height of photo block of about us */

		var chooseHeight = $('.about-us').height();

		if ($(window).width() > 992) {
			$('.about-us .image-block').css('height', chooseHeight);
		}


		let navbar = $('#n-main-nav');

		let navbarHeight = navbar.height() - 2; // two comes from border i guess

		let navbarDistance = navbar.offset().top;

		// var needHeight = $('#intro').offset().top - navbarHeight;
		//TODO 
		/*if($('body').hasClass('home-page')){
			var needHeight = $('#intro').offset().top - navbarHeight;
		}else{
			var needHeight = $('#page-title-block').offset().top + $('#page-title-block').outerHeight() - navbarHeight;
		}*/

		$(window).bind('scroll', function() {

	    var scrollVal = $(window).scrollTop();

	    var navbarHeight = navbar.height() - 2;

	  	/* if (scrollVal > navbarHeight + navbarDistance) {*/

	      navbar.css('opacity', 1).css('transition', '0.3s').addClass('navbar-fixed-top');

        /*$('body').css('padding-top', navbarHeight);*/

        // if (scrollVal > needHeight) {
        //     navbar.css('opacity', 1).css('transition', '.3s');
        // }
			/*}else{
        navbar.css('transition', '0s').css('opacity', 1).removeClass('navbar-fixed-top');
        $('body').css('padding-top', 0);
		  }*/
		});
		
		var owl = $('#blog-carousel');
		
		/*owl.owlCarousel({
		    loop: true,
		    items: 1,
		    margin: 30,
		    dots: false,
		    nav: true,
		    navText: ['<span className="fa fa-chevron-left"></span>', '<span className="fa fa-chevron-right"></span>'],
		    responsive: {
		        580: {
		          items: 1
		        },

		        768: {
		          items: 2
		        },

		        992: {
		          items: 3
		        }
		    }
		});


		var owl = $('#clients-carousel');

		owl.owlCarousel({
		    items: 1,
		    margin: 30,

		    responsive: {
		        580: {
		          items: 1
		        },

		        768: {
		          items: 2
		        },

		        992: {
		          items: 4
		        }
		    }
		});*/


		$(window).resize(function() {

		    /* adjust window of .full-height when window resize */

		    windowHeight = $(window).height();
		    windowWidth = $(window).width();


		    $('.full-height').css('height', windowHeight);

		    /* Adjust the height of image on WHY CHOOSE US section */

		    var chooseHeight = $('.about-us .content-block').height();

		    if (windowWidth > 992) {
				$('.about-us .image-block').css('height', chooseHeight + 56 + 58); // 56 + 58 comes from padding ! (im not sure !!)
		    }	
		});
	}
}

/*MainLayout.propTypes = {
	content: PropTypes.object.isRequired,
};*/