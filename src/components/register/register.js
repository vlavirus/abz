import React, {Component} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';	
import InputMask from "react-input-mask";

import './register.scss';


const PhoneImput = (props) => {
	return <InputMask className="register-form__field" mask="+380 99 999 99 99" 
		placeholder="+380 XX XXX XX XX" 
		// alwaysShowMask 
		onChange={props.onChange} value={props.value} />;
}

export default class Register extends Component {

	state = {
		positions: [],
		value: '',
		token: ''
	}

	componentDidMount = async() => {
		let positions = []
		await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
			.then(response => response.json())
			.then(answer => {
				positions.push(...answer.positions)
				this.setState({
					positions: positions
				});
			});
	}

	getToken = async () => {
		const res = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/token`)

		return await res.json();
	}

	postNewUser = async (formData) => {
		const {token} = this.state;

		const res = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
			method: 'POST',
			body: formData,
			headers: { 'Token': token }
		})
		
		return await res.json();
	}

	getPositionId() {
		fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
			.then(response => response.json())
			.catch(error => console.log(error))
	}

	render() {
		const {positions} = this.state;
		const {toggleModal, resetUsers} = this.props;

		if (positions[0] === undefined) {
			return <React.Fragment></React.Fragment>
		} else {
			return (
				<section id="register" className="register">
					<h2 className="register__title">Register to get a work</h2>
					<div className="register__subtitle">Attention! After successful registration and alert, update the list of users in the block from the top</div>
					<Formik 
						initialValues={{ name: '', email: '', phone: '', position: `${positions[0].id}`, photo: null }}
						validationSchema={Yup.object().shape({
							name: Yup.string()
							.min(2, <span className="register-form__error">Error</span>)
							.max(60, <span className="register-form__error">Error</span>)
							.required(<span className="register-form__error">Error</span>)
							,
							phone: Yup.string()
							.max(20, <span className="register-form__error">Error</span>)
							.required(<span className="register-form__error">Error</span>)
							,
							email: Yup.string()
							.email(<span className="register-form__error">Error</span>)
							.required(<span className="register-form__error">Error</span>)
							,
							position: Yup.string()
							.required(<span className="register-form__error">Error</span>)
							,
							photo: Yup.mixed()
							.required(<span className="register-form__error">Error</span>)
						})}
						onSubmit={(values, { resetForm, setFieldValue }) => {
							let formData = new FormData();
	
							formData.append('photo', values.photo)
							formData.append('position_id', values.position)
							formData.append('name', values.name)
							formData.append('email', values.email)
							formData.append('phone', values.phone.replace(/ /g, ''))
	
							this.getToken()
								.then((res) => {
									this.setState({
										token: res.token
									});
								})
								.then(() => this.postNewUser(formData))
								.then(() => toggleModal())
								.then(() => {
									resetForm();
									document.querySelectorAll('.register-form__field')[2].value = '';
									resetUsers();
								})
								.catch((error) => alert(error))
						}}
					>
	
						{({ setFieldValue }) => (
							<Form className="register-form">
								<div className="register-form__input">
									<label className="register-form__name" htmlFor="name">Name</label>
									<Field className="register-form__field" name="name" type="text" placeholder="Your name"/>
									<ErrorMessage name="name"/>
								</div>
								<div className="register-form__input">
									<label className="register-form__name"htmlFor="email">Email</label>
									<Field className="register-form__field" name="email" type="email" placeholder="Your email"/>
									<ErrorMessage name="email"/>
								</div>
								<div className="register-form__input">
									<label className="register-form__name" htmlFor="phone">Phone number</label>
									<PhoneImput  name="phone" type="phone" onChange={e => {
										const value = e.target.value || '';

										setFieldValue('phone', value);
									}}/>
									<p className="register-form__subtitle">Enter phone number in open format</p>
									<ErrorMessage name="phone" />
								</div>
								<div className="register-form__title">Select your position</div>
								<div className="register-form__radio" role="group" aria-labelledby="my-radio-group">
									{
										positions.map((item, index) => {
											const {id, name} = item;
											return (
												<label className="register-form__lable" key={id}>
													<Field className="register-form__radio-button" type="radio" name="position" value={`${id}`} />
													<span className="register-form__checkmark"></span>
													<div className="register-form__lable-name">{name}</div>
												</label>
											)
										})
									}
								</div>
								<ErrorMessage name="position"/>
								<div className="register-form__input">
									<label className="register-form__name">Photo</label>
									<div className="register-form__file">
									<span className="register-form__placehold">Upload your photo</span>
										<input className="register-form__file-input" id="photo" name="photo" type="file" placeholder="Your email"
											onChange={(event) => {
												setFieldValue("photo", event.currentTarget.files[0]);
											}}
			
										/>
										<label className="register-form__file-label" htmlFor="photo">Browse</label>
									</div>
									<ErrorMessage name="photo" />
								</div>
								<button type="submit" className="register-form__submit">Sing up now</button>
							</Form>
							)}
					</Formik>
				</section>
			)
		}
	}
}