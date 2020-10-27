import React from 'react';

import manLaptop from './man-laptop-v1.svg';
import './acquaint.scss';

const Acquaint = () => {
	return (
		<section className="acquaint">
			<h2 className="acquaint__title">Let's get acquainted</h2>
			<div className="acquaint__content">
				<div className="acquaint__image">
					<img src={manLaptop} alt="acquaint_image"/>
				</div>
				<div className="acquaint__text">
					<h3 className="acquaint__text_title">I am cool frontend developer</h3>
					<div className="acquaint__text_descr">
					<p>We will evaluate how clean your approach to writing CSS and Javascript code is. You can use any CSS and Javascript 3rd party libraries without any restriction.</p>

					<p>If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page P​SD mockup​ into HTML5/CSS3.</p> 
					</div>
					<button className="acquaint__btn"
						onClick={() => {
							window.location='#register'
						}}
					>Sing up now</button>
				</div>
			</div>
		</section>
	)
}

export default Acquaint;