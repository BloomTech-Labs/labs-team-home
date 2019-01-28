import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import SettingsTabs from '../components/tabs/SettingsTabs';
// import '../styles/SettingsStyles.css';
import FormInput from '../components/forms/FormInput';
import FormCheckbox from '../components/forms/FormCheckbox';
import FormButton from '../components/forms/FormButton';
import BillingView from '../BillingView/BillingView';
import * as mutation from '../../constants/mutations';
import * as query from '../../constants/queries';

import SettingsContainer from '../styles/container.styles';
import Auth0 from '../../Auth/Auth';

const buttonStyle = {
	margin: '10px 10px 10px 10px'
};

class SettingsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			auth: new Auth0(),
			firstName: '',
			lastName: '',
			email: '',
			avatar: '',
			phone: '',
			selected: [],
			firstName: '',
			lastName: ''
		};
	}

	componentDidMount() {
		const { currentUser } = this.props;
		const { email, firstName, lastName, avatar, phoneNumber } = currentUser;
		currentUser
			? this.setState({
					email: email,
					firstName: firstName,
					lastName: lastName,
					avatar: avatar ? avatar : '',
					phoneNumber: phoneNumber ? phoneNumber : ''
			  })
			: this.state.auth.lock.getUserInfo(
					localStorage.token,
					(err, { given_name, family_name, picture, email }) =>
						this.setState({
							// populates form with data from auth0
							firstName: given_name ? given_name : '',
							lastName: family_name ? family_name : '',
							avatar: picture ? picture : '',
							email: email ? email : ''
						})
			  );
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSelect = e => {
		let { selected } = this.state;
		// if the list of selected options includes the option that was clicked on
		// filter out the option that was clicked
		if (selected.includes(e.target.value)) {
			selected = selected.filter(option => option !== e.target.value);
		} else {
			// else push the selected option onto the array
			selected.push(e.target.value);
		}

		// update state with the new array
		this.setState({ selected });
	};

	render() {
		const { currentUser, history } = this.props;
		return currentUser ? (
			<Mutation mutation={mutation.UPDATE_USER}>
				{(updateUser, { data }) => (
					<SettingsContainer>
						<h1>Team Name probably</h1>
						<SettingsTabs>
							<div label="Account Settings">
								<form
									onSubmit={e => {
										e.preventDefault();
										updateUser({
											variables: {
												email: this.state.email,
												phoneNumber: this.state.phone,
												toggles: this.state.selected
											}
										});
									}}
								>
									<FormInput
										inputType="text"
										name={'firstName'}
										title={'First Name'}
										value={this.state.firstName}
										placeholder={
											this.props.currentUser.firstName
												? this.props.currentUser.firstName
												: 'Enter your first name'
										}
										handleChange={this.handleChange}
									/>
									<FormInput
										inputType="text"
										name={'lastName'}
										title={'Last Name'}
										value={this.state.lastName}
										placeholder={
											this.props.currentUser.lastName
												? this.props.currentUser.lastName
												: 'Enter your last name'
										}
										handleChange={this.handleChange}
									/>
									<FormInput
										inputType={'text'}
										title={'Email'}
										name={'email'}
										value={this.state.email}
										placeholder={
											this.props.currentUser.email
												? this.props.currentUser.email
												: 'Enter your email'
										}
										handleChange={this.handleChange}
									/>
									<FormInput
										inputType="text"
										title={'Phone Number'}
										name={'phone'}
										value={this.state.phone}
										placeholder={
											this.props.currentUser.phoneNumber
												? this.props.currentUser.phoneNumber
												: 'Enter your phone number'
										}
										handleChange={this.handleChange}
									/>
									<FormCheckbox
										title={'Receive these?'}
										options={[
											{ title: 'Emails?', value: 'receiveEmails' },
											{ title: 'Texts?', value: 'receiveTexts' }
										]}
										handleSelect={this.handleSelect}
										selected={this.state.selected}
									/>
									<FormButton
										// action={this.someHandleFormSubmit}
										type={'primary'}
										title={'Save'}
										style={buttonStyle}
									/>
									<FormButton
										// action={this.someLeaveTeamHandler}
										type={'primary'}
										title={'Leave Team'}
										style={buttonStyle}
									/>
								</form>
							</div>
							<div label="Team Billing">
								<BillingView />
							</div>
						</SettingsTabs>
					</SettingsContainer>
				)}
			</Mutation>
		) : (
			<Mutation
				mutation={mutation.ADD_USER}
				refetchQueries={[{ query: query.CURRENT_USER }]}
				awaitRefetchQueries={true}
			>
				{addUser => (
					<SettingsContainer>
						<h1>Create Account</h1>
						<SettingsTabs>
							<div label="Account Settings">
								<form
									onSubmit={e => {
										e.preventDefault();
										if (
											!this.state.firstName.length ||
											!this.state.lastName.length ||
											!this.state.email.length
										) {
											return alert(
												'First name, last name, and email are required.'
											);
										}
										let addedUser = {
											firstName: this.state.firstName,
											lastName: this.state.lastName,
											email: this.state.email
										};
										if (this.state.avatar.length)
											addedUser.avatar = this.state.avatar;
										if (this.state.phone.length)
											addUser.phoneNumber = this.state.phone;
										return addUser({
											variables: addedUser
										}).then(() => history.push('/dashboard'));
									}}
								>
									<FormInput
										inputType="text"
										title={'First Name'}
										name={'firstName'}
										value={this.state.firstName}
										placeholder={'Enter your first name'}
										handleChange={this.handleChange}
									/>
									<FormInput
										inputType="text"
										title={'Phone Number'}
										name={'lastName'}
										value={this.state.lastName}
										placeholder={'Enter your last name'}
										handleChange={this.handleChange}
									/>
									<FormInput
										inputType={'text'}
										title={'Email'}
										name={'email'}
										value={this.state.email}
										placeholder={'Enter your email'}
										handleChange={this.handleChange}
									/>
									<FormInput
										inputType={'text'}
										title={'Avatar'}
										name={'avatar'}
										value={this.state.avatar}
										placeholder={'Enter an image URL'}
										handleChange={this.handleChange}
									/>
									<FormInput
										inputType="text"
										title={'Phone Number'}
										name={'phone'}
										value={this.state.phone}
										placeholder={'Enter your phone number (US numbers only)'}
										handleChange={this.handleChange}
									/>

									<FormButton
										// action={this.someHandleFormSubmit}
										type="submit"
										title={'Save'}
										style={buttonStyle}
									/>
								</form>
							</div>
							<div label="Team Billing">
								<BillingView />
							</div>
						</SettingsTabs>
					</SettingsContainer>
				)}
			</Mutation>
		);
	}
}

export default SettingsView;
