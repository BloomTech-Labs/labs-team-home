import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { colors } from '../../colorVariables';

const { button } = colors;

const Container = styled(Dialog)`
	@media (max-width: 696px) {
		div {
			div {
				margin-left: 0;
				margin-right: 0;
			}
		}
	}
`;

const Overlay = styled(DialogContent)`
	background-color: ${button};
	form {
		div {
			input {
				color: #fff;
			}
			label {
				color: #fff;
			}
		}
	}
`;

const SubmitButton = styled(Button)`
	color: #fff;
`;

const Title = styled(DialogTitle)`
	background-color: ${button};
	h2 {
		color: #fff;
	}
`;

// const FormContainer = styled.div`
// 	width: 60%;
// 	height: 80%;
// 	margin: auto;
// 	z-index: 1001;
// 	background-color: white;
// 	border: 1px solid black;
// 	position: fixed;
// 	top: 0;
// 	bottom: 0;
// 	left: 0;
// 	right: 0;

// 	& form {
// 		display: flex;
// 		flex-direction: column;
// 		align-items: center;
// 	}

// 	& form input {
// 		margin: 20px;
// 	}
// `;

export default function Invites({
	open,
	number,
	email,
	changeHandler,
	closeHandler,
	submitHandler
}) {
	return (
		<Container open={open} onClose={closeHandler}>
			<Overlay>
				<Title id="form-dialog-title" style={{ color: '#fff' }}>
					Invite User
				</Title>
				<form onSubmit={submitHandler} style={{ color: '#fff' }}>
					<label htmlFor="email" />
					<TextField
						id="outlined-bare"
						type="email"
						name="email"
						variant="outlined"
						placeholder="email"
						onChange={changeHandler}
						value={email}
						fullWidth
					/>
					<label htmlFor="phone number" />
					<TextField
						placeholder="phone number"
						type="text"
						name="number"
						variant="outlined"
						onChange={changeHandler}
						value={number}
						fullWidth
					/>
					<DialogActions>
						<SubmitButton type="submit">Submit</SubmitButton>
						<Button color="secondary" onClick={closeHandler}>
							Cancel
						</Button>
					</DialogActions>
				</form>
			</Overlay>
		</Container>
	);
}
