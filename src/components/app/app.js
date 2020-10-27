import React, {Component} from 'react';

import HeaderApp from '../header-app';
import Introduction from '../introduction';
import Acquaint from '../acquaint';
import Users from '../users';
import Register from '../register';
import Footer from '../footer';
import Modal from '../modal';

import './app.scss';

class App extends Component {

	state = {
		showModal: false,
		page: 1,
		cards: []
	}

	componentDidMount() {
		const {page, cards} = this.state;
		
		this.getUsers(page, cards)
	}

	disableBtn() {
		document.getElementById('get-users').disabled = true;
	}
	
	getUsers(page, cards) {
		fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`)
			.then(response => response.json())
			.then(answer => {
				cards.push(...answer.users);
				if (page >= answer.total_pages) {
					this.disableBtn();
				}
				this.setState({
					page: page,
					cards: cards
				});
			})
			.catch(error => console.log(error))
	}
	
	resetUsers = () => {
		this.getUsers(1, []);
	}

	addUsers = () => {
		let {page, cards} = this.state;
			page += 1;

		this.getUsers(page, cards);
	}

	toggleModal = async () => {
		const {showModal} = this.state;

		this.setState({
			showModal: !showModal
		});

		return await true;
	}

	render() {
		const {showModal, page, cards} = this.state;

		return (
			<div className="wrapper">
				<HeaderApp/>
				<Introduction/>
				<Acquaint/>
				<Users page={page} cards={cards} addUsers={this.addUsers}/>
				<Register toggleModal={this.toggleModal}  resetUsers={this.resetUsers}/>
				<Footer/>
				<Modal showModal={showModal} toggleModal={this.toggleModal}/>
			</div>
		)
	}
}

export default App;