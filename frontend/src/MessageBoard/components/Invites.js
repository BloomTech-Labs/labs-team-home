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

const FormContainer = styled.div`
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

export default function Invites(props) {
	return (
		<Overlay>
			<FormContainer>
				<h2>Enter email</h2>
				<form onSubmit={props.submitHandler}>
					<label>
						Email:
						<input
							type="email"
							name="email"
							onChange={props.changeHandler}
							value={props.email}
						/>
					</label>
					<button type="submit">Submit</button>
				</form>
			</FormContainer>
		</Overlay>
	);
}
