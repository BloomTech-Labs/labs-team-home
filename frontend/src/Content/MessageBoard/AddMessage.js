import React from 'react';

// ------------- gql Imports ---------------------- //
import { FIND_TAGS_BY_TEAM } from '../../constants/queries';
import { compose, Query } from 'react-apollo';
import { addMessage, addTag } from '../mutations/messages';

// ------------- FilePond Imports ---------------------- //
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileTypeValidation from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import 'filepond/dist/filepond.min.css';
// image preview not working
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// ------------- Style Imports ---------------------- //
// import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { colors, palette } from '../../colorVariables';
import CloseIcon from '@material-ui/icons/Close';

// ------------- Modal styling imports ---------------------- //
import { StyledModal, ModalOverlay, ModalClose } from '../Modal.styles';
import {
	StyledModalTitle,
	StyledModalButton,
	StyledModalInput
} from '../Modal.styles';

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

function AddMessage(props) {
	//this is their state... but why?

	let team, user, title, content, tag, images;
	team = props.team;
	user = props.user;
	images = [];
	const { addMessage, addTag } = props;

	return (
		<StyledModal
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
			<ModalClose>
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
			</ModalClose>
			{/* Overlay is the dark area that the message and comments fill */}
			<ModalOverlay>
				{/* The header information: name, avatar */}
				<StyledModalTitle>Add a New Message</StyledModalTitle>
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
								<StyledModalInput
									name="title"
									placeholder="title"
									variant="outlined"
									inputRef={node => {
										title = node;
									}}
									fullWidth
								/>
								<StyledModalInput
									name="contents"
									placeholder="content"
									variant="outlined"
									inputRef={node => {
										content = node;
									}}
									multiline
									fullWidth
								/>
								<StyledModalInput
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
								<StyledModalButton type="submit" fullWidth>
									Save
								</StyledModalButton>
							</form>
						);
					}}
				</Query>
			</ModalOverlay>
		</StyledModal>
	);
}

export default compose(
	addTag,
	addMessage
)(AddMessage);
