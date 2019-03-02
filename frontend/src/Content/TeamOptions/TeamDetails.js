import React from 'react';
import { Query, Mutation } from 'react-apollo';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import { Close } from '../MessageBoard/MessageDetail';
import * as query from '../../constants/queries';
import * as mutation from '../../constants/mutations';
import { colors, palette } from '../../colorVariables';
import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';

const { button } = colors;

const UserCard = styled(CardHeader)`
	@media (max-width: 400px) {
		display: flex;
		flex-direction: column;
		div {
			margin: 0 auto;
		}
	}
`;

const Overlay = styled(DialogContent)`
	background-color: ${colors.button};
	word-wrap: break-word;
	padding-top: 0;
	margin-top: 0;
	.filepond--wrapper {
		width: 100%;
	}
`;

const StyledDialog = styled(Dialog)`
	max-width: 696px;
	margin: 0 auto;
`;

const Title = styled(DialogTitle)`
	background-color: ${button};
	h2 {
		color: #fff;
	}
`;

const StyledTextField = styled(TextField)`
	color: ${colors.text};
	input,
	textarea {
		color: ${colors.text};
	}
`;

const StyledButton = styled(Button)`
	border-bottom: solid 1px ${palette.yellow};
	color: ${colors.text};
	border-radius: 0px;
	margin: 10px;
	/* ${({ pro }) =>
		pro &&
		`
		margin: 0 auto;
		width: 200px;
		height: 40px;
	`} 
	*/
`;

class TeamDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			something: true,
			number: '',
			email: ''
		};
	}

	changeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		console.log('props from TeamDetails: ', this.props);

		const { open, team, hideModal, currentUser } = this.props;
		return (
			<StyledDialog
				open={open}
				onClose={() => hideModal()}
				scroll="body"
				PaperProps={{
					style: {
						background: `transparent`,
						boxShadow: 'none'
					}
				}}
				// fullScreen={mediaQueryFor.smDevice}
			>
				<Close>
					<IconButton
						aria-label="Close"
						onClick={() => hideModal()}
						style={{ color: colors.text, background: palette.plumTransparent }}
					>
						<CloseIcon />
					</IconButton>
				</Close>
				<Overlay>
					<div>
						<h2 style={{ color: colors.text }}>Team: {team.name}</h2>
						<Mutation mutation={mutation.INVITE_USER}>
							{inviteUser => (
								<div>
									<Title id="form-dialog-title" style={{ color: colors.text }}>
										Invite User
									</Title>
									<form
										onSubmit={e => {
											e.preventDefault();
											let input = { id: this.props.team._id };
											if (this.state.email.length)
												input.email = this.state.email;
											if (this.state.number.length)
												input.phoneNumber = this.state.number;
											inviteUser({ variables: input })
												.then(res => {
													this.setState({
														email: '',
														number: ''
													});
												})
												.then(() => {
													alert('Invitation sent');
												})
												.catch(err => {
													console.error(err);
												});
										}}
										style={{ color: '#fff' }}
									>
										<label htmlFor="email" />
										<StyledTextField
											// id="outlined-bare"
											type="email"
											name="email"
											variant="outlined"
											placeholder="email"
											onChange={this.changeHandler}
											value={this.email}
											fullWidth
										/>
										<label htmlFor="phone number" />
										<StyledTextField
											placeholder="phone number"
											type="text"
											name="number"
											variant="outlined"
											onChange={this.changeHandler}
											value={this.number}
											fullWidth
										/>
										<DialogActions>
											<StyledButton type="submit">Submit</StyledButton>
										</DialogActions>
									</form>
								</div>
							)}
						</Mutation>
						{/* </>
										) : ( */}
						{/* <Paywall>
											<Title>Sorry, free teams can only have up to 5 users.</Title>
											{team.users.find(({ user }) => user._id === currentUser._id).admin ? (
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
										</Paywall> */}
						{team.users.map(user => (
							<UserCard
								key={user.user._id}
								avatar={
									<Avatar
										src={user.user.avatar}
										alt={`${user.user.firstName} ${user.user.lastName}`}
									/>
								}
								title={`${user.user.firstName} ${user.user.lastName}`}
								subheader={`${user.user.email}`}
								subheaderTypographyProps={{
									style: { color: colors.text }
								}}
								titleTypographyProps={{ style: { color: colors.text } }}
								action={
									<Mutation
										mutation={mutation.KICK_USER}
										update={(cache, { data: { kickUser } }) => {
											// This code was throwing an error in the console as findTeam is defined but never used. - Bondor
											cache.writeQuery({
												query: query.FIND_TEAM,
												variables: { id: team },
												data: {
													findTeam: kickUser
												}
											});
										}}
									>
										{/* Make sure the user can be kicked before rendering the kick button, then kick */}
										{kickUser =>
											team.users.find(user => user.user._id === currentUser._id)
												.admin &&
											user.user._id !== currentUser._id && (
												<Button
													color="secondary"
													onClick={e => {
														e.preventDefault();
														kickUser({
															variables: {
																id: team._id,
																user: user.user._id
															}
														});
													}}
												>
													Kick User
												</Button>
											)
										}
									</Mutation>
								}
							/>
						))}
					</div>
				</Overlay>
			</StyledDialog>
		);
	}
}

export default TeamDetails;
