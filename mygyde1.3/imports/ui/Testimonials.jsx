/* Import React, Component, render */

import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Testimonials extends React.Component {
	render(){
		return(
			<section className="testimonial-carousel" id="testimonial-carousel">
				<div className="container">
					<div id="n-testimonial-carousel" className="carousel slide" data-ride="carousel" data-interval="10000">
						<ol className="carousel-indicators">
							<li data-target="#n-testimonial-carousel" data-slide-to="0" className="active">
								<img className="img-responsive quote-author" src="/ted.png" alt="testimonial author" />
							</li>
						    <li data-target="#n-testimonial-carousel" data-slide-to="1">
						    	<img className="img-responsive quote-author" src="/buddha.jpg" alt="testimonial author" />
						    </li>
						    <li data-target="#n-testimonial-carousel" data-slide-to="2">
						    	<img className="img-responsive quote-author" src="/churchill.jpg" alt="testimonial author" />
						    </li>
						    <li data-target="#n-testimonial-carousel" data-slide-to="3">
						    	<img className="img-responsive quote-author" src="/pepsi.png" alt="testimonial author" />
						    </li>
						    <li data-target="#n-testimonial-carousel" data-slide-to="4">
						    	<img className="img-responsive quote-author" src="/mygyde.png" alt="testimonial author" />
						    </li>
						</ol>

						<div className="carousel-inner" role="listbox">
							<div className="item active">
								<div className="carousel-caption">
									<div className="content-wrapper">
										<div className="testimonial-content">
											<blockquote>
												<img className="img-responsive quote-author" src="/ted.png" alt="testimonial author" />
												<p>
													Imagine for a second. If right now, today, how much more successful would you be if you just started a company with Bill Gates as your business partner and he was using every trick of the trade that he used to build Microsoft into one of the biggest companies in the world? Imagine how much money you’d have in your bank account today if Warren Buffet was teaching you how to invest in the stock market. Imagine how much happier you’d be today if the Dali Lama was your personal guide, showing you how to find fulfillment in life, in the little things that most people overlook.
												</p>
											</blockquote>
											<div className="quote-meta-block">
												<h4>Tai Lopez</h4>
												<h5>Ted Talk</h5>
											</div>
										</div>
									</div>
								</div>
							</div>


							<div className="item">
								<div className="carousel-caption">
									<div className="content-wrapper">
										<div className="testimonial-content">
											<blockquote>
												<img className="img-responsive quote-author" src="/buddha.jpg" alt="testimonial author" />
												<p>
													If you light a lamp to someone, it will also brighten your own path
												</p>
											</blockquote>
											<div className="quote-meta-block">
												<h4>Buddhist Proverb</h4>
												<h5></h5>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="item">
								<div className="carousel-caption">
									<div className="content-wrapper">
										<div className="testimonial-content">
											<blockquote>
												<img className="img-responsive quote-author" src="/churchill.jpg" alt="testimonial author" />
												<p>
													We make a living by what we get, but we make a life by what we give.
												</p>
											</blockquote>
											<div className="quote-meta-block">
												<h4>Winston Churchill</h4>
												<h5></h5>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="item">
								<div className="carousel-caption">
									<div className="content-wrapper">
										<div className="testimonial-content">
											<blockquote>
												<img className="img-responsive quote-author" src="/pepsi.png" alt="testimonial author" />
												<p>
													If I hadn't had mentors, I wouldn't be here today. I'm a product of great mentoring, great coaching... Coaches or mentors are very important. They could be anyone - your husband, other family members, or your boss
												</p>
											</blockquote>
											<div className="quote-meta-block">
												<h4>Indra Nooyi</h4>
												<h5>CEO of PepsiCo</h5>
											</div>
										</div>
									</div>
								</div>
							</div>


							<div className="item">
								<div className="carousel-caption">
									<div className="content-wrapper">
										<div className="testimonial-content">
											<blockquote>
												<img className="img-responsive quote-author" src="/mygyde.png" alt="testimonial author" />
												<p>
													Every Thursday, Albert Einstein would have lunch with a mentor growing up. Jay-Z, the rapper, had a mentor so did Oprah. Gandhi had a mentor. Alexander, the Great, had Aristotle. Bill Gates had Paul Allen. Warren Buffet had Benjamin Graham. There’s something here that eveyrone have missed out on.
												</p>
											</blockquote>
											<div className="quote-meta-block">
												<h4>MyGyde Founders</h4>
												<h5></h5>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						
						<div className="carousel-control-block">
							<a className="left carousel-control" href="#n-testimonial-carousel" role="button" data-slide="prev">
							    <span className="fa fa-angle-left"></span>
							    <span className="sr-only">Previous</span>
							</a>

							<a className="right carousel-control" href="#n-testimonial-carousel" role="button" data-slide="next">
							    <span className="fa fa-angle-right"></span>
							    <span className="sr-only">Next</span>
							</a>
						</div>
					</div>
				</div>
			</section>
		)
	}
}