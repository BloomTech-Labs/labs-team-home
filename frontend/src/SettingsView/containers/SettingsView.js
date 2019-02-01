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
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileTypeValidation from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
// image preview not working
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';

import SettingsContainer, {
	StyledAvatar,
	ImageFigure,
	AvatarUploadContainer
} from '../styles/container.styles';
import Auth0 from '../../Auth/Auth';

registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginFileTypeValidation,
	FilePondPluginImageResize,
	FilePondPluginImageTransform
	//FilePondPluginImagePreview
);

const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
const apiKey = process.env.REACT_APP_API_KEY;
const apiSecret = process.env.REACT_APP_API_SECRET;
const cloudName = process.env.REACT_APP_CLOUD_NAME;

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
			phoneNumber: '',
			selected: [],
			toggles: {}
		};
	}

	componentDidMount() {
		const { currentUser } = this.props;
		const { email, firstName, lastName, avatar, phoneNumber } = currentUser;
		const { receiveEmails, receiveTexts } = currentUser.toggles;
		currentUser
			? this.setState({
					email: email,
					firstName: firstName,
					lastName: lastName,
					avatar: avatar ? avatar : '',
					phoneNumber: phoneNumber ? phoneNumber : '',
					toggles: {
						receiveEmails: receiveEmails ? receiveEmails : false,
						receiveTexts: receiveTexts ? receiveTexts : false
					}
			  })
			: this.state.auth.lock.getUserInfo(
					localStorage.token,
					(
						err,
						{
							given_name,
							family_name,
							picture,
							email,
							phoneNumber,
							receiveEmails,
							receiveTexts
						}
					) =>
						this.setState({
							// populates form with data from auth0
							firstName: given_name ? given_name : '',
							lastName: family_name ? family_name : '',
							avatar: picture ? picture : '',
							email: email ? email : '',
							phoneNumber: phoneNumber ? phoneNumber : '',
							toggles: {
								receiveEmails: receiveEmails ? receiveEmails : false,
								receiveTexts: receiveTexts ? receiveTexts : false
							}
						})
			  );
	}

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSelect = e => {
		this.setState({
			toggles: { ...this.state.toggles, [e.target.name]: e.target.checked }
		});
	};

	handleImageUpload = url => {
		this.setState({ avatar: url });
	};

	render() {
		const { currentUser, history } = this.props;
		return currentUser ? (
			<Mutation
				mutation={mutation.UPDATE_USER}
				update={(cache, { data: { updateUser } }) =>
					cache.writeQuery({ query: query.CURRENT_USER, data: updateUser })
				}
			>
				{(updateUser, { data }) => (
					<SettingsContainer>
						<h1>User Settings</h1>
						<SettingsTabs>
							<div label="Account Settings">
								<form
									onSubmit={e => {
										console.log('submitted');
										e.preventDefault();
										updateUser({
											variables: {
												firstName: this.state.firstName,
												lastName: this.state.lastName,
												email: this.state.email,
												phoneNumber: this.state.phoneNumber,
												toggles: this.state.toggles,
												avatar: this.state.avatar
											}
										});
										this.pond.removeFile();
									}}
								>
									<AvatarUploadContainer>
										<ImageFigure>
											<StyledAvatar
												src={this.props.currentUser.avatar}
												alt="User avatar"
											/>
											<figcaption>User avatar</figcaption>
										</ImageFigure>
										<FilePond
											ref={ref => (this.pond = ref)}
											//files={this.state.image}
											allowMultiple={false}
											acceptedFileTypes="image/jpeg, image/png, image/gif"
											imageResizeTargetWidth={1280}
											imageResizeTargetHeight={800}
											imageResizeMode="contain"
											imageResizeUpscale={false}
											onupdatefiles={fileItems => {
												fileItems.map(fileItem =>
													console.log('FILE ITEM', fileItem)
												);
												// Set current file objects to this.state
												this.setState({
													files: fileItems.map(fileItem => fileItem.file)
												});
											}}
											server={{
												url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
												process: (
													fieldName,
													file,
													metadata,
													load,
													error,
													progress,
													abort
												) => {
													// fieldName is the name of the input field
													// file is the actual file object to send
													const formData = new FormData();
													formData.append(fieldName, file, file.name);
													formData.append('file', file);
													formData.append('upload_preset', uploadPreset);
													formData.append('api_key', apiKey);

													const request = new XMLHttpRequest();
													request.open(
														'POST',
														`https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/image/upload`
													);

													// Should call the progress method to update the progress to 100% before calling load
													// Setting computable to false switches the loading indicator to infinite mode
													request.upload.onprogress = e => {
														progress(e.lengthComputable, e.loaded, e.total);
													};

													// Should call the load method when done and pass the returned server file id
													// this server file id is then used later on when reverting or restoring a file
													// so your server knows which file to return without exposing that info to the client
													request.onload = () => {
														if (request.status >= 200 && request.status < 300) {
															// the load method accepts either a string (id) or an object
															const response = JSON.parse(request.response);
															this.setState({ avatar: response.secure_url });
															console.log('THIS DOT AVATAR', this.avatar);
															//add new url to the images array in preparation of creating new message
															load(request.responseText);
														} else {
															// Can call the error method if something is wrong, should exit after
															error('oh no');
														}
													};

													request.send(formData);

													// Should expose an abort method so the request can be cancelled
													return {
														abort: () => {
															// This function is entered if the user has tapped the cancel button
															request.abort();

															// Let FilePond know the request has been cancelled
															abort();
														}
													};
												}
											}}
										/>
									</AvatarUploadContainer>
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
										name={'phoneNumber'}
										value={this.state.phoneNumber}
										placeholder={
											this.props.currentUser.phoneNumber
												? this.props.currentUser.phoneNumber
												: 'Enter your phone number'
										}
										handleChange={this.handleChange}
									/>
									<FormCheckbox
										title={'Receive emails?'}
										name="receiveEmails"
										handleSelect={this.handleSelect}
										checked={this.state.toggles.receiveEmails}
									/>
									<FormCheckbox
										title={'Receive texts?'}
										name="receiveTexts"
										handleSelect={this.handleSelect}
										checked={this.state.toggles.receiveTexts}
									/>
									<FormButton type="submit" title="save" />

									<FormButton
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
										if (this.state.phoneNumber.length)
											addUser.phoneNumber = this.state.phoneNumber;
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
										name={'phoneNumber'}
										value={this.state.phoneNumber}
										placeholder={'Enter your phone number (US numbers only)'}
										handleChange={this.handleChange}
									/>
									<FormButton title={'Save'} />
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
