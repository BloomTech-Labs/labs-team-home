import React from 'react';

// ------------- gql Imports ---------------------- //
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import * as query from '../../constants/queries';
import * as mutation from '../../constants/mutations';
import Avatar from '@material-ui/core/Avatar';
import { FULL_TEAM } from '../../constants/fragments';
import { ApolloConsumer } from 'react-apollo';

// ------------- Component Imports ---------------------- //
import StripeCheckout from 'react-stripe-checkout';
import Logo from '../../assets/TH_favicon.png';

// ------------- Style Imports ---------------------- //
import styled from 'styled-components';
import { colors } from '../../colorVariables';
import mediaQueryFor from '../../_global_styles/responsive_querie';

// ------------- MUI Imports ---------------------- //
import CloseIcon from '@material-ui/icons/Close';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

const ModalContents = styled.div`
	height: 700px;
	width: 565px;
	overflow-y: auto;
	padding-right: 1.3em;
	margin-top: 1rem;

	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: white;
	}

	${mediaQueryFor.smDevice`
		height: auto;
		width: auto;
	`}
`;

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

// ---------------- Main Exported Component ---------------------- //

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
			//console.log(' Users from inside component did mount: ', user);
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
		// console.log(' Users from inside props: ', this.props.team.users);
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
					<ModalContents>
						{editingTeamName ? (
							// {/* If the user is the admin on a team, give them a edit button */}
							<CardContent>
								<Mutation mutation={mutation.UPDATE_TEAM}>
									{updateTeam => (
										<StyledModalForm
											onSubmit={e => {
												e.preventDefault();
												updateTeam({
													variables: {
														id: team._id,
														name: this.state.editTeamName
													},
													refetchQueries: [{ query: query.FIND_TEAMS_BY_USER }]
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
															],
															options: {
																awaitRefetchQueries: true
															}
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
										<Mutation mutation={STRIPE_SOURCE}>
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
															},
															refetchQueries: [
																{
																	query: query.FIND_TEAMS_BY_USER
																}
															]
														})
															.then(res => {
																// console.log(res);
																alert('Payment Success');
															})
															.catch(err => {
																// console.log(err);
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
								<ApolloConsumer>
									{client => (
										<StyledModalForm
											onSubmit={e => {
												e.preventDefault();
												let input = { id: team._id };
												if (this.state.email.length)
													input.email = this.state.email;
												if (this.state.number.length)
													input.phoneNumber = this.state.number;
												inviteUser({
													variables: input,
													refetchQueries: [
														{
															query: query.FIND_TEAM,
															variables: { id: team._id }
														},
														{
															query: query.FIND_TEAMS_BY_USER
														}
													]
												}) //This is an unsuccessful attempt to fix the null null null bug... Unfortunately, I am beginning to thing that the error stems from the database being designed improperly. Ie, Users do not have a field for which teams they belong to, but only teams know who their users are. This is a violation of a many to many relationship.
													.then(item => {
														this.resetState();
														// console.log('item from after invite: ', item);
														item.data.inviteUser.users.forEach(u => {
															// console.log('u=> ', u);
															client.query({
																query: query.FIND_USER,
																variables: { id: u.user._id }
															});
														});
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
												<StyledModalButton type="submit">
													Submit
												</StyledModalButton>
											</DialogActions>
										</StyledModalForm>
									)}
								</ApolloConsumer>
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
										<Mutation mutation={mutation.KICK_USER}>
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
																},
																refetchQueries: [
																	{
																		query: query.FIND_TEAM,
																		variables: { id: team._id }
																	}
																]
															});
														}}
													>
														Kick User
													</UserButton>
												) : admin && user.user._id === currentUser._id ? (
													<AdminUserButton>Admin</AdminUserButton>
												) : user.user._id === currentUser._id ? (
													<Mutation mutation={mutation.LEAVE_TEAM}>
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
					</ModalContents>
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
