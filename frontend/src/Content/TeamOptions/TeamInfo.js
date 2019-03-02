import { colors } from '../../colorVariables';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import mediaQueryFor from '../../_global_styles/responsive_querie';
import React from 'react';
import { Mutation } from 'react-apollo';
import Invites from './Invites';
import * as mutation from '../../constants/mutations';
import TeamDetails from './TeamDetails';

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
			teamDetailsOpen: false
			// showInvite: false,
			// email: '',
			// number: ''
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

	// toggleInviteHandler = () => {
	// 	this.setState(prevState => ({
	// 		showInvite: !prevState.showInvite
	// 	}));
	// };

	toggleTeamDetails = () => {
		this.setState(prevState => ({
			teamDetailsOpen: !prevState.teamDetailsOpen
		}));
	};

	render() {
		return (
			<>
				{/* Team Name and action buttons */}
				<TeamOptions>
					<h1>{this.props.team.name}</h1>
					<TeamActions>
						{/* {this.state.isAdmin ? (
							<StyledButton
								variant="contained"
								onClick={e => {
									e.preventDefault();
									this.toggleInviteHandler();
								}}
							>
								Invite
							</StyledButton>
						) : null} */}
						<StyledButton
							variant="contained"
							onClick={e => {
								e.preventDefault();
								this.toggleTeamDetails();
							}}
						>
							Team Details
						</StyledButton>
					</TeamActions>
				</TeamOptions>

				{/* Invite a user Modal */}

				{/* click on the user list and view its contents modal */}
				<TeamDetails
					open={this.state.teamDetailsOpen}
					team={this.props.team}
					currentUser={this.props.currentUser}
					hideModal={this.toggleTeamDetails}
				/>
			</>
		);
	}
}

export default TeamInfo;
