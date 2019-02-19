import { colors } from '../../colorVariables';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import React from 'react';
import { Mutation } from 'react-apollo';
import Invites from '../components/Invites';
import * as mutation from '../../constants/mutations';
import UserList from '../components/UserList';

const TeamOptions = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: ${colors.header};
	text-align: center;
	font-size: 2rem;

	${mediaQueryFor.xsDevice`
        font-size: 1rem;
    `}
`;

const TeamActions = styled.div`
	display: flex;
	align-items: center;
	flex-flow: column;
`;

const StyledButton = styled(Button)`
	background-color: ${colors.button};
	color: ${colors.text};
	margin: 5px;
`;

class TeamInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAdmin: false,
			userListOpen: false,
			showInvite: false,
			email: '',
			number: ''
		};
	}

	componentDidMount = () => {
		this.props.team.users.map(user => {
			if (user.user._id === this.props.currentUser._id) {
				if (user.admin) this.setState({ isAdmin: true });
			}
			return null;
		});
	};

	toggleInviteHandler = e => {
		e.preventDefault();
		this.setState(prevState => ({
			showInvite: !prevState.showInvite
		}));
	};

	toggleUserListHandler = e => {
		e.preventDefault();
		this.setState(prevState => ({
			userListOpen: !prevState.userListOpen
		}));
	};

	inviteChangeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		return (
			<>
				{/* Team Name and action buttons */}
				<TeamOptions>
					<h1>{this.props.team.name}</h1>
					<TeamActions>
						{this.state.isAdmin ? (
							<StyledButton
								variant="contained"
								onClick={e => this.toggleInviteHandler(e)}
							>
								Invite
							</StyledButton>
						) : null}
						<StyledButton
							variant="contained"
							onClick={e => this.toggleUserListHandler(e)}
						>
							Open User List
						</StyledButton>
					</TeamActions>
				</TeamOptions>

				{/* Invite a user Modal */}
				<Mutation mutation={mutation.INVITE_USER}>
					{inviteUser => (
						<Invites
							currentUser={this.props.currentUser}
							team={this.props.team}
							open={this.state.showInvite}
							closeHandler={this.toggleInviteHandler}
							stopProp={e => e.stopPropagation()}
							submitHandler={e => {
								e.preventDefault();
								let input = { id: this.props.team._id };
								if (this.state.email.length) input.email = this.state.email;
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
										this.toggleInviteHandler();
										alert('Invitation sent');
									})
									.catch(err => {
										console.error(err);
									});
							}}
							changeHandler={this.inviteChangeHandler}
							email={this.state.email}
							number={this.state.number}
						/>
					)}
				</Mutation>

				{/* click on the user list and view its contents modal */}
				<UserList
					open={this.state.userListOpen}
					team={this.props.team._id}
					currentUser={this.props.currentUser}
					hideModal={e => this.toggleUserListHandler(e)}
				/>
			</>
		);
	}
}

export default TeamInfo;
