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
import SettingsContainer from '../styles/container.styles';

const buttonStyle = {
	margin: '10px 10px 10px 10px'
};

class SettingsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			phone: '',
			selected: [],
			oldPassword: '',
			newPassword: ''
		};
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
		return (
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
										inputType={'text'}
										title={'Email'}
										name={'email'}
										value={this.state.email}
										placeholder={'Enter your email'}
										handleChange={this.handleChange}
									/>
									<FormInput
										inputType="text"
										title={'Phone Number'}
										name={'phone'}
										value={this.state.phone}
										placeholder={'Enter your phone number'}
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
									<FormInput
										inputType={'password'}
										name={'oldPassword'}
										title={'Old Password'}
										// value={this.state.oldPassword}
										placeholder={'Enter your old password'}
										handleChange={this.handleChange}
									/>
									<FormInput
										inputType={'password'}
										name={'newPassword'}
										title={'New Password'}
										// value={this.state.newPassword}
										placeholder={'Enter your new password'}
										handleChange={this.handleChange}
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
		);
	}
}

export default SettingsView;
