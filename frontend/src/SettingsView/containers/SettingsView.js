import React, { Component } from 'react';
import Auth0 from '../../Auth/Auth';

// ------------- gql Imports ---------------------- //
import { Mutation } from 'react-apollo';
import * as mutation from '../../constants/mutations';
import * as query from '../../constants/queries';

// ------------- Filepond Imports ---------------------- //
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileTypeValidation from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import 'filepond/dist/filepond.min.css';
// image preview not working
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// ------------- Component Imports ---------------------- //
import FormInput from '../components/forms/FormInput';
import FormCheckbox from '../components/forms/FormCheckbox';
import FormButton from '../components/forms/FormButton';

// ------------- Styled Imports ---------------------- //
import SettingsContainer, {
	StyledAvatar,
	ImageFigure,
	AvatarUploadContainer,
	StyledForm,
	SettingsTitle
} from '../styles/container.styles';

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
			toggles: {},
			teamId: ''
		};
	}

	componentDidMount() {
		const { currentUser } = this.props;
		console.log('Current User: ', currentUser);
		if (currentUser) {
			const { email, firstName, lastName, avatar, phoneNumber } = currentUser;
			const { receiveEmails, receiveTexts } = currentUser.toggles;
			this.setState({
				email: email,
				firstName: firstName,
				lastName: lastName,
				avatar: avatar ? avatar : '',
				phoneNumber: phoneNumber ? phoneNumber : '',
				toggles: {
					receiveEmails: receiveEmails ? receiveEmails : false,
					receiveTexts: receiveTexts ? receiveTexts : false
				}
			});
		} else {
			this.state.auth.lock.getUserInfo(
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

	handlePickTeam = e => {
		this.setState({ teamId: e.currentTarget.dataset.id });
	};

	render() {
		const { currentUser, history } = this.props;
		return currentUser ? (
			<Mutation mutation={mutation.UPDATE_USER}>
				{updateUser => (
					<SettingsContainer>
						<SettingsTitle>
							<h1>USER SETTINGS</h1>
						</SettingsTitle>
						<StyledForm
							onSubmit={e => {
								e.preventDefault();
								console.log('user toggles: ', this.state.toggles);
								updateUser({
									variables: {
										firstName: this.state.firstName,
										lastName: this.state.lastName,
										email: this.state.email,
										phoneNumber: this.state.phoneNumber,
										toggles: this.state.toggles,
										avatar: this.state.avatar
									},
									refetchQueries: [{ query: query.CURRENT_USER }]
								});
								this.pond.removeFile();
								alert('User settings Saved.');
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
								inputtype="text"
								name={'firstName'}
								title={'First Name'}
								value={this.state.firstName}
								autoComplete="off"
								placeholder={
									this.props.currentUser.firstName
										? this.props.currentUser.firstName
										: 'Enter your first name'
								}
								onChange={this.handleChange}
							/>
							<FormInput
								inputtype="text"
								name={'lastName'}
								title={'Last Name'}
								value={this.state.lastName}
								autoComplete="off"
								placeholder={
									this.props.currentUser.lastName
										? this.props.currentUser.lastName
										: 'Enter your last name'
								}
								onChange={this.handleChange}
							/>
							<FormInput
								inputtype={'email'}
								title={'Email'}
								name={'email'}
								value={this.state.email}
								autoComplete="off"
								placeholder={
									this.props.currentUser.email
										? this.props.currentUser.email
										: 'Enter your email'
								}
								onChange={this.handleChange}
							/>
							<FormInput
								inputtype="tel"
								title={'Phone Number'}
								name={'phoneNumber'}
								value={this.state.phoneNumber}
								autoComplete="off"
								placeholder={
									this.props.currentUser.phoneNumber
										? this.props.currentUser.phoneNumber
										: 'Enter your phone number'
								}
								onChange={this.handleChange}
							/>
							<FormCheckbox
								title={'Receive emails?'}
								name="receiveEmails"
								handleSelect={this.handleSelect}
								checked={currentUser.toggles.receiveEmails}
							/>
							<FormCheckbox
								title={'Receive texts?'}
								name="receiveTexts"
								handleSelect={this.handleSelect}
								checked={currentUser.toggles.receiveTexts}
							/>
							<FormButton type="submit" title="save" />
						</StyledForm>
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
						<StyledForm
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
								inputtype="text"
								title={'First Name'}
								name={'firstName'}
								value={this.state.firstName}
								autoComplete="off"
								placeholder={'Enter your first name'}
								onChange={this.handleChange}
							/>
							<FormInput
								inputtype="text"
								title={'Last Name'}
								name={'lastName'}
								value={this.state.lastName}
								autoComplete="off"
								placeholder={'Enter your last name'}
								onChange={this.handleChange}
							/>
							<FormInput
								inputtype={'email'}
								title={'Email'}
								name={'email'}
								value={this.state.email}
								autoComplete="off"
								placeholder={'Enter your email'}
								onChange={this.handleChange}
							/>
							<FormInput
								inputtype={'text'}
								title={'Avatar'}
								name={'avatar'}
								value={this.state.avatar}
								autoComplete="off"
								placeholder={'Enter an image URL'}
								onChange={this.handleChange}
							/>
							<FormInput
								inputtype="tel"
								title={'Phone Number'}
								name={'phoneNumber'}
								value={this.state.phoneNumber}
								autoComplete="off"
								placeholder={'Enter your phone number (US numbers only)'}
								onChange={this.handleChange}
							/>
							<FormButton title={'Save'} />
						</StyledForm>
					</SettingsContainer>
				)}
			</Mutation>
		);
	}
}

export default SettingsView;
