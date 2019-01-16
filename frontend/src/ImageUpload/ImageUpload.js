import React, { Component } from 'react';
// import axios from 'axios';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
const apiKey = process.env.REACT_APP_API_KEY;
const apiSecret = process.env.REACT_APP_API_SECRET;
const cloudName = process.env.REACT_APP_CLOUD_NAME;

class ImageUpload extends Component {
	// handleUpload = images => {
	// 	images.preventDefault();
	// 	console.log(images);
	// 	const uploads = images.map(image => {
	// 		return axios
	// 			.post(
	// 				`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
	// 				formData
	// 			)
	// 			.then(res => console.log(res.data));
	// 	});
	// 	axios.all(uploads).then(console.log('Images have been uploaded'));
	// };

	render() {
		return (
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

						//axios
						//	.post(
						//		`https://${apiKey}:${apiSecret}@api.cloudinary.com/v1_1/${cloudName}/image/upload`,
						//		formData
						//	)
						//	.then(res => console.log(res.data));

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
		);
	}
}

export default ImageUpload;
