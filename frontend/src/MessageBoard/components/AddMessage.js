import React from 'react';
import styled from 'styled-components';

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

export default function AddMessage(props) {
	return (
		<Overlay onClick={props.closeHandler}>
			<MessageFormContainer onClick={props.stopProp}>
				<button
					onClick={props.closeHandler}
					style={{ float: 'right', border: 'none' }}
				>
					X
				</button>
				<form onSubmit={props.submitHandler}>
					<label>
						Title:
						<input
							type="text"
							name="title"
							value={props.title}
							onChange={props.changeHandler}
						/>
					</label>
					<label>
						Select Images:
						<input type="file" name="images" onChange={props.changeHandler} />
					</label>
					<label>
						Contents:
						<textarea
							value={props.contents}
							name="contents"
							onChange={props.changeHandler}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</MessageFormContainer>
		</Overlay>
	);
}
