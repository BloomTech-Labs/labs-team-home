import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { colors } from '../../colorVariables';
import { Link } from 'react-router-dom';

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
	${({ pro }) =>
		pro &&
		/* CSS */ `
		margin: 0 auto;
		width: 200px;
		height: 40px;
	`}
`;

const Title = styled(DialogTitle)`
	background-color: ${button};
	h2 {
		color: #fff;
	}
`;

const Paywall = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const GoPro = styled(Link)`
	&:hover {
		text-decoration: none;
	}
`;

export default function Invites({
	open,
	number,
	email,
	changeHandler,
	closeHandler,
	submitHandler,
	team,
	currentUser
}) {
	return (
		<Container open={open} onClose={closeHandler}>
			<Overlay>
				{team.users.length < 5 || team.premium ? (
					<>
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
					</>
				) : (
					<Paywall>
						<Title>Sorry, free teams can only have up to 5 users.</Title>
						{team.users.find(({ user }) => user._id === currentUser._id)
							.admin ? (
							<GoPro to="/settings">
								<SubmitButton
									pro
									size="large"
									variant="contained"
									color="secondary"
								>
									Go Pro
								</SubmitButton>
							</GoPro>
						) : (
							<Title>Tell your team administrators to upgrade.</Title>
						)}
					</Paywall>
				)}
			</Overlay>
		</Container>
	);
}
