import React from 'react';

// ------------- gql Imports ---------------------- //
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import * as query from '../../constants/queries';
import * as mutation from '../../constants/mutations';
import Avatar from '@material-ui/core/Avatar';
import { FULL_TEAM } from '../../constants/fragments';

// ------------- Component Imports ---------------------- //
import StripeCheckout from 'react-stripe-checkout';
import Logo from '../../assets/TH_favicon.png';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { colors } from '../../colorVariables';
import DialogActions from '@material-ui/core/DialogActions';

// ------------- Modal styling imports ---------------------- //
import {
	StyledModal,
	StyledModalOverlay,
	StyledModalClose,
	StyledModalTitle,
	StyledModalPaper,
	StyledModalCardAction,
	StyledModalBody,
	StyledModalButton,
	StyledModalForm,
	StyledModalInput,
	StyledModalIconButton
} from '../Modal.styles';

// ---------------- Styled Components ---------------------- //

const UserCard = styled(CardHeader)`
	@media (max-width: 400px) {
		display: flex;
		flex-direction: column;
		div {
			margin: 0 auto;
		}
	}
`;

const Paywall = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const TeamTitle = styled(StyledModalTitle)`
	h2 {
		font-size: 25px;
		text-align: center;
		margin-left: 30px;
	}
`;

const UserButton = styled(Button)`
	margin-top: 15%;
`;

const AdminUserButton = styled(UserButton)`
	margin-top: 20%;
	color: white;
`;

class TeamDetails extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			number: '',
			email: '',
			admin: false,
			editTeamName: '',
			editingTeamName: false
		};
	}

	//set admin to true, if the currentUser is the admin
	componentDidMount = () => {
		this.props.team.users.map(user => {
			if (user.user._id === this.props.currentUser._id) {
				if (user.admin) this.setState({ admin: true });
			}
			return null;
		});
	};

	resetState = () => {
		this.setState({
			number: '',
			email: '',
			editTeamName: '',
			editingTeamName: false
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
			<StyledModal
				open={open}
				onClose={() => {
					hideModal();
					this.resetState();
				}}
			>
				<StyledModalClose>
					<StyledModalIconButton
						onClick={() => {
							hideModal();
							this.resetState();
						}}
					>
						<CloseIcon />
					</StyledModalIconButton>
				</StyledModalClose>
				<StyledModalOverlay>
					<div>
						{editingTeamName ? (
							// {/* If the user is the admin on a team, give them a edit button */}
							<CardContent>
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
													return team._id === updateTeam._id
														? updateTeam
														: team;
												})
											}
										});
									}}
								>
									{updateTeam => (
										<StyledModalForm
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
											<StyledModalInput
												placeholder="Edit team name..."
												name="editTeamName"
												value={this.state.editTeamName}
												onChange={this.changeHandler}
											/>
											<StyledModalButton type="submit">Save</StyledModalButton>
										</StyledModalForm>
									)}
								</Mutation>
							</CardContent>
						) : (
							<TeamTitle>{team.name}</TeamTitle>
						)}
						{admin ? (
							<>
								{/* If the user is the admin on a team, give them a delete button */}
								{!editingTeamName ? (
									<StyledModalCardAction>
										<Mutation mutation={mutation.DELETE_TEAM}>
											{deleteTeam => (
												<StyledModalButton
													color="secondary"
													onClick={e => {
														e.preventDefault();
														deleteTeam({
															variables: { id: team._id },
															refetchQueries: [
																{
																	query: query.FIND_TEAMS_BY_USER
																}
															]
														}).then(this.props.history.push('/dashboard'));
													}}
												>
													Delete Team
												</StyledModalButton>
											)}
										</Mutation>
										<StyledModalButton
											onClick={e => {
												e.preventDefault();
												this.setState({
													editingTeamName: true,
													editTeamName: team.name
												});
											}}
										>
											Edit
										</StyledModalButton>
									</StyledModalCardAction>
								) : null}
							</>
						) : null}
						{/* Conditionally render info about upgrading the plan */}
						{!team.premium ? (
							<>
								<Paywall>
									<StyledModalBody>
										Free teams can only have up to 5 users.
									</StyledModalBody>
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
										<StyledModalBody>
											Tell your team administrators to upgrade.
										</StyledModalBody>
									)}
								</Paywall>
							</>
						) : null}

						{/* Invite users */}
						<StyledModalTitle>Invite User</StyledModalTitle>
						<Mutation mutation={mutation.INVITE_USER}>
							{inviteUser => (
								<StyledModalForm
									onSubmit={e => {
										e.preventDefault();
										let input = { id: this.props.team._id };
										if (this.state.email.length) input.email = this.state.email;
										if (this.state.number.length)
											input.phoneNumber = this.state.number;
										inviteUser({ variables: input })
											.then(() => {
												this.resetState();
												alert('Invitation sent');
											})
											.catch(err => {
												console.error(err);
											});
									}}
								>
									<StyledModalInput
										type="email"
										name="email"
										placeholder="email"
										onChange={this.changeHandler}
										value={this.state.email}
									/>
									<StyledModalInput
										placeholder="phone number"
										type="text"
										name="number"
										onChange={this.changeHandler}
										value={this.state.number}
									/>
									<DialogActions>
										<StyledModalButton type="submit">Submit</StyledModalButton>
									</DialogActions>
								</StyledModalForm>
							)}
						</Mutation>

						{/* List all the team members */}
						{team.users.map(user => (
							<StyledModalPaper key={user.user._id}>
								<UserCard
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
													<UserButton
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
													</UserButton>
												) : admin && user.user._id === currentUser._id ? (
													<AdminUserButton>Admin</AdminUserButton>
												) : user.user._id === currentUser._id ? (
													<Mutation
														mutation={mutation.LEAVE_TEAM}
														// update={(cache, { data: { leaveTeam } }) => {
														// 	cache.writeQuery({
														// 		query: query.FIND_TEAM,
														// 		variables: { id: team },
														// 		data: {
														// 			findTeam: leaveTeam
														// 		}
														// 	});
														// 	//Cache is BROKE not WOKE
														// 	cache.writeQuery({
														// 		query: query.FIND_TEAMS_BY_USER,
														// 		variables: { id: team },
														// 		data: {
														// 			findTeamsByUser: leaveTeam
														// 		}
														// 	});
														// }}
													>
														{leaveTeam => (
															<Button
																color="secondary"
																onClick={e => {
																	e.preventDefault();
																	leaveTeam({
																		variables: {
																			id: team._id,
																			user: currentUser
																		},
																		refetchQueries: [
																			{
																				query: query.FIND_TEAMS_BY_USER
																			}
																		]
																	});
																	this.props.history.push('/dashboard');
																}}
															>
																Leave Team
															</Button>
														)}
													</Mutation>
												) : null
											}
										</Mutation>
									}
								/>
							</StyledModalPaper>
						))}
					</div>
				</StyledModalOverlay>
			</StyledModal>
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
