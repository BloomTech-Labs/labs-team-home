import React from 'react';
import { Mutation } from 'react-apollo';
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
import StripeCheckout from 'react-stripe-checkout';
import Logo from '../../assets/TH_favicon.png';
import gql from 'graphql-tag';
import { FULL_TEAM } from '../../constants/fragments';

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

const Paywall = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

class TeamDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			something: true,
			number: '',
			email: '',
			admin: false,
			editTeamName: '',
			editingTeamName: false
		};
	}

	//set admin to true, if the user is the admin
	componentDidMount = () => {
		this.props.team.users.map(user => {
			if (user.user._id === this.props.currentUser._id) {
				if (user.admin) this.setState({ admin: true });
			}
			return null;
		});
	};

	changeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		const { open, team, hideModal, currentUser } = this.props;
		const { admin, editingTeamName } = this.state;
		const publishableKey = 'pk_test_GedRIIhEwHrV1xzzkxMsRuUX';

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
						{editingTeamName ? (
							// {/* If the user is the admin on a team, give them a edit button */}
							<Mutation
								mutation={mutation.UPDATE_TEAM}
								update={(cache, { data: { updateTeam } }) => {
									const { findTeamsByUser } = cache.readQuery({
										query: query.FIND_TEAMS_BY_USER
									});
									cache.writeQuery({
										query: query.FIND_TEAMS_BY_USER,
										variables: { team: team },
										data: {
											findTeamsByUser: findTeamsByUser.map(team => {
												return team._id === updateTeam._id ? updateTeam : team;
											})
										}
									});
								}}
							>
								{updateTeam => (
									<form
										onSubmit={e => {
											e.preventDefault();
											updateTeam({
												variables: {
													id: team._id,
													name: this.state.editTeamName
												}
											}).then(
												this.setState({
													editTeamName: '',
													editingTeamName: false
												})
											);
										}}
									>
										<StyledTextField
											placeholder="Edit team name..."
											name="editTeamName"
											value={this.state.editTeamName}
											onChange={this.changeHandler}
										/>
										<StyledButton type="submit">Save</StyledButton>
									</form>
								)}
							</Mutation>
						) : (
							<h2 style={{ color: colors.text }}>{team.name}</h2>
						)}
						{/* Conditionally render info about upgrading the plan */}
						{!team.premium ? (
							<>
								<Paywall>
									<Title>Free teams can only have up to 5 users.</Title>
									{admin ? (
										<Mutation
											mutation={STRIPE_SOURCE}
											update={(cache, { data: { setPremium } }) => {
												const { findTeamsByUser } = cache.readQuery({
													query: query.FIND_TEAMS_BY_USER
												});
												cache.writeQuery({
													query: query.FIND_TEAMS_BY_USER,
													data: {
														findTeamsByUser: findTeamsByUser.map(team =>
															team._id === setPremium._id ? setPremium : team
														)
													}
												});
											}}
										>
											{(setPremium, { data }) => (
												// this stripe component is a button and a modal
												<StripeCheckout
													label="Go Premium" //Component button text
													name="TeamHome" //Modal Header
													description="Upgrade to a premium account today."
													panelLabel="Go Premium" //Submit button in modal
													amount={999} //Amount in cents $9.99
													token={token =>
														setPremium({
															variables: {
																//need to un hard code this later
																team: team._id,
																amount: 999,
																token: token.id
															}
														})
															.then(res => {
																console.log(res);
																alert('Payment Success');
															})
															.catch(err => {
																console.log(err);
																alert('Payment Error');
															})
													}
													stripeKey={publishableKey}
													image={Logo} //Pop-in header image
													billingAddress={false}
												/>
											)}
										</Mutation>
									) : (
										<Title>Tell your team administrators to upgrade.</Title>
									)}
								</Paywall>
							</>
						) : null}
						{admin ? (
							<>
								{/* If the user is the admin on a team, give them a delete button */}
								<Mutation
									mutation={mutation.DELETE_TEAM}
									update={(cache, { data: { deleteTeam } }) => {
										const { findTeamsByUser } = cache.readQuery({
											query: query.FIND_TEAMS_BY_USER
										});
										cache.writeQuery({
											query: query.FIND_TEAMS_BY_USER,
											variables: { team: team },
											data: {
												findTeamsByUser: findTeamsByUser.filter(
													({ _id }) => _id !== deleteTeam._id
												)
											}
										});
									}}
								>
									{deleteTeam => (
										<StyledButton
											color="secondary"
											onClick={e => {
												e.preventDefault();
												deleteTeam({
													variables: { id: team._id }
												}).then(this.props.history.push('/dashboard'));
											}}
										>
											Delete Team
										</StyledButton>
									)}
								</Mutation>
								{!editingTeamName ? (
									<StyledButton
										onClick={e => {
											e.preventDefault();
											this.setState({
												editingTeamName: true,
												editTeamName: team.name
											});
										}}
									>
										Edit
									</StyledButton>
								) : null}
							</>
						) : null}

						{/* Invite users */}
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

						{/* List all the team members */}
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
											admin && user.user._id !== currentUser._id ? (
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
											) : admin && user.user._id === currentUser._id ? (
												<Button>Admin</Button>
											) : user.user._id === currentUser._id ? (
												<Button>You</Button>
											) : null
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

const STRIPE_SOURCE = gql`
	mutation setPremium($team: ID!, $amount: Int!, $token: String!) {
		setPremium(input: { id: $team, charge: $amount, source: $token }) {
			...FullTeam
		}
	}
	${FULL_TEAM}
`;
