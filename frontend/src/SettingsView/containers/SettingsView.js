import React, { Component } from 'react';
import SettingsTabs from '../components/SettingsTabs';
import '../styles/SettingsStyles.css';
import FormInput from '../components/FormInput';
import FormCheckbox from '../components/FormCheckbox';
import FormButton from '../components/FormButton';
import Checkout from '../BillingView/Checkout';

const buttonStyle = {
	margin: '10px 10px 10px 10px'
};

class SettingsView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newUser: {
				email: '',
				phone: '',
				receiveOptions: [],
				oldPassword: '',
				newPassword: ''
			},

			receiveOptions: ['Emails?', 'Texts?']
		};
		// this.handleEmail = this.handleEmail.bind(this);
		// this.handlephone = this.handlephone.bind(this);
		// this.handleFormSubmit = this.handleFormSubmit.bind(this);
		// this.handleClearForm = this.handleClearForm.bind(this);
		// this.handleCheckBox = this.handleCheckBox.bind(this);
		// this.handleInput = this.handleInput.bind(this);
	}

	render() {
		return (
			<div>
				<h1>Team Name probably</h1>
				<SettingsTabs>
					<div label="Account Settings">
						<form onSubmit={this.somesubmithandlerthing}>
							<FormInput
								inputType={'text'}
								title={'Email'}
								name={'email'}
								// value={this.state.email}
								placeholder={'Enter your email'}
								// handleChange={this.someInputHandler}
							/>{' '}
							<FormInput
								inputType={'text'}
								name={'phone'}
								title={'Phone Number'}
								// value={this.state.phone}
								placeholder={'Enter your phone number'}
								// handleChange={this.probablyAnotherInputHandler}
							/>{' '}
							<FormCheckbox
								title={'Receive these?'}
								name={'receiveOptions'}
								options={this.state.receiveOptions}
								selectedOptions={this.state.newUser.receiveOptions}
								// handleChange={this.someCheckBoxHandler}
							/>{' '}
							<FormInput
								inputType={'password'}
								name={'oldPassword'}
								title={'Old Password'}
								// value={this.state.oldPassword}
								placeholder={'Enter your old password'}
								// handleChange={this.probablyAnotherInputHandler}
							/>{' '}
							<FormInput
								inputType={'password'}
								name={'newPassword'}
								title={'New Password'}
								// value={this.state.newPassword}
								placeholder={'Enter your new password'}
								// handleChange={this.probablyAnotherInputHandler}
							/>{' '}
							<FormButton
								// action={this.someHandleFormSubmit}
								type={'primary'}
								title={'Save'}
								style={buttonStyle}
							/>{' '}
							<FormButton
								// action={this.someLeaveTeamHandler}
								type={'primary'}
								title={'Leave Team'}
								style={buttonStyle}
							/>{' '}
						</form>
					</div>
					<div label="Team Billing">
						<Checkout
							name={'Stripe Test Run'}
							description={'Stripe Billing Section'}
							amount={1}
						/>
					</div>
				</SettingsTabs>
			</div>
		);
	}
}

export default SettingsView;
