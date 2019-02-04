import React from 'react';
import styled from 'styled-components';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileTypeValidation from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
// image preview not working
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond/dist/filepond.min.css';
import { addMessage } from './mutations/messages';
import { palette } from '../../colorVariables';

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
  display: flex;
  flex-flow: column;
	width: 60%;
	height: 80%;
  margin: auto;
  padding:1%;
	z-index: 1001;
	background-color: ${palette.plum};
	border: 1px solid black;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
  right: 0;
  color:white;

	& form {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: column;
    -ms-flex-flow: column;
    flex-flow: column;
    margin: 0 auto;
    label {
      display:flex;
      flex-flow:column;
      font-size:1.2rem;
      input {
        height: 50px;
        background: black;
        color: yellow;
        font-size:1.2rem;
      }
      textarea {
        height:233px;
        background: black;
      }
    }
  }
	}
`;

const ImageUploadContainer = styled.div`
	/* width: 84%; */
`;

function AddMessage(props) {
	let team, user, title, content, images;
	team = props.team;
	user = props.user;
	images = [];
	const { addMessage } = props;
	console.log('uploadPreset ', uploadPreset);
	return (
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
						console.log(props);

						//pass newMessage object as a variable to addMessage mutation
						addMessage(newMessage)
							.then(res => {
								return props.closeHandler();
								// alert('Message added');
								// window.location.reload(true);
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
					</ImageUploadContainer>
					<input type="submit" value="Submit" />
				</form>
			</MessageFormContainer>
		</Overlay>
	);
}

export default addMessage(AddMessage);
