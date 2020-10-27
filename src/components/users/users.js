import React, {Component} from 'react';
import Tooltip from '../tooltip';
import './users.scss';

class Users extends Component {
	
	render() {
		const {cards, addUsers} = this.props;

		return (
			<section className="users">
				<h2 className="users__title">
					Our cheerful users
				</h2>
				<div className="users__subtitle">
					Attention! Sorting users by registration date
				</div>
				<div className="users__wrapper">
					{
						cards.map((item, index) => {
							const {name, position, email, phone, photo} = item;
							return(
								<div key={index} className="users__card-container">
									<div className="users-item">
										<div className="users-item__frame">
											<img src={photo} alt="card-photo"/>
										</div>
										<Tooltip position="bottom" content={name}>
											<div className="users-item__title">{name}</div>
										</Tooltip>
										<Tooltip position="bottom" content={position}>
											<div className="users-item__descr">{position}</div>
										</Tooltip>
										<Tooltip position="bottom" content={email}>
											<div className="users-item__mail" >{email}</div>
										</Tooltip>
										<Tooltip position="bottom" content={phone}>
											<div className="users-item__phone">{phone}</div>
										</Tooltip>
									</div>
								</div>
							)
						})
					}
				</div>
				<button id="get-users"
					className="sing-up"
					onClick={
						() => addUsers()
					}
					>Show more</button>
			</section>
		)
	}
}

export default Users;
