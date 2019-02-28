import React from 'react';
import styled from 'styled-components';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileTypeValidation from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// image preview not working
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import { addMessage, addTag } from '../mutations/messages';
import { colors, palette } from '../../colorVariables';
import { compose, Query } from 'react-apollo';
import { FIND_TAGS_BY_TEAM } from '../../constants/queries';
import { Close } from './MessageDetail';

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

const Overlay = styled(DialogContent)`
	background-color: ${colors.button};
	.filepond--wrapper {
		width: 100%;
	}
`;

const SubmitButton = styled(Button)`
	color: ${colors.text};
	margin: 0 auto;
`;

const Title = styled(DialogTitle)`
	padding-left: 0;
	background-color: ${colors.button};
	h2 {
		color: ${colors.text};
	}
`;

const Input = styled(TextField)`
	input,
	textarea,
	label {
		color: ${colors.text};
	}
	&:nth-child(2) {
		margin: 10px 0;
		textarea {
			min-height: 200px;
		}
	}
	&:nth-child(3) {
		margin-bottom: 10px;
	}
`;

function AddMessage(props) {
	//this is their state... but why?

	let team, user, title, content, tag, images;
	team = props.team;
	user = props.user;
	images = [];
	const { addMessage, addTag } = props;

	return (
		<Dialog
			open={props.open}
			onClose={props.closeHandler}
			scroll="body"
			PaperProps={{
				style: {
					background: `transparent`,
					boxShadow: 'none'
				}
			}}
		>
			{/*Close button*/}
			<Close>
				<IconButton
					aria-label="Close"
					onClick={props.closeHandler}
					style={{
						color: colors.text,
						background: palette.plumTransparent
					}}
				>
					<CloseIcon />
				</IconButton>
			</Close>
			{/* Overlay is the dark area that the message and comments fill */}
			<Overlay>
				{/* The header information: name, avatar */}
				<Title>Add a New Message</Title>
				<Query query={FIND_TAGS_BY_TEAM} variables={{ team }}>
					{({ loading, error, data: { findTagsByTeam } }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error</p>;
						return (
							<form
								onSubmit={e => {
									e.preventDefault();
									//create newMessage object using the variables created in advance
									let newMessage = {
										user: user,
										title: title.value,
										content: content.value,
										team: team,
										images: images
									};
									//check if the tag length is not 0 to do stuff with tags
									if (tag.value.length) {
										const exists = findTagsByTeam.find(
											({ name }) => name === tag.value
										);
										if (exists) {
											newMessage.tag = exists._id;
											addMessage(newMessage)
												.then(() => props.closeHandler())
												.catch(err => {
													console.error(err);
												});
										} else {
											return addTag({ name: tag.value, team })
												.then(async ({ data: { addTag: { _id } } }) => {
													try {
														await (newMessage.tag = _id);
														await addMessage(newMessage);
														await props.closeHandler();
													} catch (err) {
														console.error(err);
													}
												})
												.catch(err => console.error(err));
										}
									}
									//pass newMessage object as a variable to addMessage mutation
									else {
										addMessage(newMessage)
											.then(res => {
												return props.closeHandler();
											})
											.catch(err => {
												console.error(err);
											});
									}
									//reset title, content, tag, and images
									title.value = '';
									content.value = '';
									tag.value = '';
								}}
							>
								<Input
									name="title"
									placeholder="title"
									variant="outlined"
									inputRef={node => {
										title = node;
									}}
									fullWidth
								/>
								<Input
									name="contents"
									placeholder="content"
									variant="outlined"
									inputRef={node => {
										content = node;
									}}
									multiline
									fullWidth
								/>
								<Input
									name="tag"
									placeholder="tag"
									variant="outlined"
									inputRef={node => {
										tag = node;
									}}
									fullWidth
								/>
								<FilePond
									allowMultiple={true}
									acceptedFileTypes="image/jpeg, image/png, image/gif"
									imageResizeTargetWidth={1280}
									imageResizeTargetHeight={800}
									imageResizeMode="contain"
									imageResizeUpscale={false}
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
											request.onload = function() {
												if (request.status >= 200 && request.status < 300) {
													// the load method accepts either a string (id) or an object
													const response = JSON.parse(request.response);
													console.log(response);
													//add new url to the images array in preparation of creating new message
													images.push(response.secure_url);
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
								<SubmitButton type="submit" size="large" fullWidth>
									Save
								</SubmitButton>
							</form>
						);
					}}
				</Query>
			</Overlay>
		</Dialog>
	);
}

export default compose(
	addTag,
	addMessage
)(AddMessage);
