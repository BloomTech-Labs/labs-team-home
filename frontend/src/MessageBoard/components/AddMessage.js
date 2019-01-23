import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileTypeValidation from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import * as m from '../../constants/mutations';

registerPlugin(FilePondPluginFileTypeValidation);

const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
const apiKey = process.env.REACT_APP_API_KEY;
const apiSecret = process.env.REACT_APP_API_SECRET;
const cloudName = process.env.REACT_APP_CLOUD_NAME;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 1000;
	background-color: rgba(136, 136, 136, 0.65);
`;

const MessageFormContainer = styled.div`
	width: 60%;
	height: 80%;
	margin: auto;
	z-index: 1001;
	background-color: white;
	border: 1px solid black;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	& form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& form input {
		margin: 20px;
	}
`;

const ImageUploadContainer = styled.div`
	width: 80%;
	max-width: 500px;
	margin: 20px;
`;

const ADD_MESSAGE = gql`
	mutation addMessage(
		$team: String!
		$user: String!
		$title: String!
		$content: String!
		$images: [String]!
	) {
		addMessage(
			input: {
				title: $title
				user: $user
				team: $team
				content: $content
				images: $images
			}
		) {
			_id
		}
	}
`;

export default function AddMessage(props) {
	let team, user, title, content, images;
	team = props.team._id;
	user = props.user;
	images = [];
	console.log('uploadPreset ', uploadPreset);

	return (
		<Mutation mutation={m.ADD_MESSAGE}>
			{/* addMessage is the mutation request, the data object is what
				is returned. In this case, just the id of the new message is returned*/}
			{(addMessage, { data }) => (
				<Overlay onClick={props.closeHandler}>
					<MessageFormContainer onClick={props.stopProp}>
						{/*Close button*/}
						<button
							onClick={props.closeHandler}
							style={{ float: 'right', border: 'none' }}
						>
							X
						</button>
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
								//pass newMessage object as a variable to addMessage mutation
								addMessage({ variables: newMessage })
									.then(res => {
										console.log('response', res);
										alert('Message added');
										window.location.reload(true);
									})
									.catch(err => {
										console.error(err);
									});
								//reset title, content, and images
								title.value = '';
								content.value = '';
							}}
						>
							<label>
								Title:
								<input
									type="text"
									name="title"
									ref={node => {
										title = node;
									}}
								/>
							</label>
							<label>
								Contents:
								<textarea
									name="contents"
									ref={node => {
										content = node;
									}}
								/>
							</label>
							<ImageUploadContainer>
							<FilePond
								allowMultiple={true}
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
							</ImageUploadContainer>
							<input type="submit" value="Submit" />
						</form>
					</MessageFormContainer>
				</Overlay>
			)}
		</Mutation>
	);
}
