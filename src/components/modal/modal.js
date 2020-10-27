import React from 'react';

import './modal.scss';

const Modal = ({showModal, toggleModal}) => {

	if(showModal) {
		return (
			<div className="overlay">
				<div className="modal">
					<div className="modal__header">Congratulations</div>
					<div className="modal__close" 
						onClick={
							() => toggleModal()
						}>&times;</div>
					<div className="modal__descr">You have successfully passed the registration</div>
					<button className="modal__accept"
						onClick={
							() => toggleModal()
						}>Great</button>
				</div>
			</div>
		)
	} else {
		return (
			<React.Fragment></React.Fragment>
		)
	}
}


export default Modal;