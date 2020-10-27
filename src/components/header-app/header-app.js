import React, {Component} from 'react';

import headeLogo from './logo.png';

import './header-app.scss';

class HeaderApp extends Component {

	state = {
		links: ['About me', 'Relationships', 'Requirements', 'Users', 'Sign Up'],
		activeItem: null,
		activeRowIndex: null,
		activeItemIndex: null,
		linksHamburger: [['About me', 'Relationships', 'Requirements', 'Users', 'Sign Up'],
						['How it works', 'Partnership', 'Help', 'Leave testimonial', 'Contact us'],
						['Articles', 'Our news', 'Testimonials', 'Licenses', 'Privacy Policy']],
	}

	changeActive(num) {
		this.setState({
			activeItem: num
		})
	}

	changeHamburgerActive(row, item) {
		this.setState({
			activeRowIndex: row,
			activeItemIndex: item
		})
	}

	showMobileNav() {
		let nav =  document.getElementById('mobile')

		if (nav.style.left === '0px') {
			nav.style.left = "-291px";
		} else {
			nav.style.left = 0;
		}
	}

	animatedCross() {
		document.querySelector('.nav__burger').classList.toggle('nav__burger_active');
	}

	render() {
		const {links, activeItem, linksHamburger, activeRowIndex, activeItemIndex} = this.state;
		return (
			<header>
				<div className="header">
					<div className="header__container">
						<img src={headeLogo} alt="header-logo" className="header__logo"/>
						<nav className="header__nav">
							{
								links.map((item, index) => {
									if (index === activeItem) {
										return (
											<div className="header__item" key={index} onClick={
												() => {
													this.changeActive(index)
													this.changeHamburgerActive(0, index)
												}
											}>
												<a className="header__link active" href="#register">{item}</a>
											</div>
										)
									} else {
										return (
											<div className="header__item" key={index} onClick={
												() => {
													this.changeActive(index)
													this.changeHamburgerActive(0, index)
												}
											}>
												<a className="header__link" href="#register">{item}</a>
											</div>
										)
									}
									
								})
							}
						</nav>
						<div  id="mobile" className="nav__mobile">
							<div className="nav__logo">
								<img src={headeLogo} alt="header-logo" className="header__logo"/>
							</div>
							{
								linksHamburger.map((row, rowIndex) => {
									return (
										<div className="nav__section" key={rowIndex}>
											{
												row.map((item, itemIndex) => {
													if (itemIndex === activeItemIndex && rowIndex === activeRowIndex) {
														return (
															<div className="nav__item" key={itemIndex} onClick={
																() => {
																	this.changeHamburgerActive(rowIndex, itemIndex)
																	this.changeActive(itemIndex)
																}}>
																<a href="#register" className="nav__link active">{item}</a>
															</div>
														)
													} else {
														return (
															<div className="nav__item" key={itemIndex} onClick={
																() => {
																	this.changeHamburgerActive(rowIndex, itemIndex)
																	this.changeActive(itemIndex)
																}}>
																<a href="#register" className="nav__link">{item}</a>
															</div>
														)
													}
												})
											}
										</div>
									)
								})
							}
						</div>
						<div className="nav__burger"
							onClick={() => {
								this.showMobileNav()
								this.animatedCross()
							}}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
				</div>
			</header>
		)
	}

}

export default HeaderApp